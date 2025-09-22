// script.js (Kode Lengkap)

document.addEventListener('DOMContentLoaded', () => {
    const namaLengkapInput = document.getElementById('namaLengkap');
    if (namaLengkapInput) {
        namaLengkapInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });
    }

    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', (e) => {
            const namaLengkap = document.getElementById('namaLengkap').value;
            if (namaLengkap) {
                localStorage.setItem('namaPeserta', namaLengkap);
                window.location.href = 'quis.html';
            } else {
                e.preventDefault();
                alert('Mohon isi nama lengkap Anda!');
            }
        });
    }

    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        let currentQuestionIndex = 0;
        let answers = JSON.parse(localStorage.getItem('answers')) || [];

        const questionNumber = document.querySelector('.question-number');
        const questionText = document.querySelector('.question-text');
        const answerButtons = document.querySelectorAll('.answer-button');
        const navButtons = document.querySelector('.navigation-buttons');
        const prevButton = document.querySelector('.nav-button-prev');
        const nextButton = document.querySelector('.nav-button-next');
        const timerDisplay = document.getElementById('timer');
        let totalTime = 90 * 60;
        let timerInterval;

        const modal = document.getElementById('questionListModal');
        const showQuestionListBtn = document.getElementById('showQuestionList');
        const closeModalBtn = document.querySelector('.close-button');
        const questionListGrid = document.getElementById('questionListGrid');

        const warningModal = document.getElementById('warningModal');
        const warningMessage = document.getElementById('warningMessage');
        const returnToQuizBtn = document.getElementById('returnToQuizBtn');
        const unansweredList = document.getElementById('unansweredList');

        showQuestionListBtn.onclick = function() {
            modal.style.display = "flex";
            generateQuestionList();
        };

        closeModalBtn.onclick = function() {
            modal.style.display = "none";
        };

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };

        if (returnToQuizBtn) {
            returnToQuizBtn.onclick = function() {
                warningModal.style.display = 'none';
            };
        }

        function startTimer() {
            timerInterval = setInterval(() => {
                const minutes = Math.floor(totalTime / 60);
                const seconds = totalTime % 60;
                timerDisplay.textContent = `SISA WAKTU : ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                totalTime--;
                if (totalTime < 0) {
                    clearInterval(timerInterval);
                    calculateScore();
                    alert('Waktu habis! Kuis selesai.');
                    window.location.href = 'hasil.html';
                }
            }, 1000);
        }

        function loadQuestion(index) {
            currentQuestionIndex = index;
            if (questions.length === 0) {
                questionText.textContent = "Tidak ada soal yang tersedia.";
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
                return;
            }

            const currentQuestion = questions[currentQuestionIndex];
            questionNumber.textContent = `SOAL NOMOR ${currentQuestionIndex + 1}`;
            questionText.textContent = currentQuestion.soal;

            const choices = ['A. ', 'B. ', 'C. ', 'D. '];
            answerButtons.forEach((button, i) => {
                button.innerHTML = `<span>${choices[i]}</span>${currentQuestion.pilihan[i]}`;
                button.classList.remove('selected');
            });

            if (answers[currentQuestionIndex]) {
                answerButtons.forEach(button => {
                    if (button.textContent.substring(3) === answers[currentQuestionIndex]) {
                        button.classList.add('selected');
                    }
                });
            }

            if (currentQuestionIndex === 0) {
                prevButton.style.display = 'none';
                navButtons.style.justifyContent = 'flex-end';
            } else {
                prevButton.style.display = 'block';
                navButtons.style.justifyContent = 'space-between';
            }

            nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'SELESAI' : 'SOAL SELANJUTNYA';
        }

        function generateQuestionList() {
            questionListGrid.innerHTML = '';
            questions.forEach((q, index) => {
                const questionItem = document.createElement('div');
                questionItem.textContent = index + 1;
                questionItem.classList.add('question-item');

                if (answers[index]) {
                    questionItem.classList.add('answered');
                }

                if (index === currentQuestionIndex) {
                    questionItem.classList.add('current');
                }

                questionItem.addEventListener('click', () => {
                    loadQuestion(index);
                    modal.style.display = "none";
                });
                questionListGrid.appendChild(questionItem);
            });
        }

        function checkUnansweredQuestions() {
            const unanswered = [];
            for (let i = 0; i < questions.length; i++) {
                if (!answers[i]) {
                    unanswered.push(i + 1);
                }
            }
            return unanswered;
        }

        answerButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedAnswer = button.textContent.substring(3);
                answers[currentQuestionIndex] = selectedAnswer;
                answerButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                localStorage.setItem('answers', JSON.stringify(answers));
            });
        });

        prevButton.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                loadQuestion(currentQuestionIndex);
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                loadQuestion(currentQuestionIndex);
            } else {
                const unanswered = checkUnansweredQuestions();
                if (unanswered.length > 0) {
                    warningMessage.innerHTML = `
                        <p class="warning-text">BEBERAPA SOAL BELUM DIJAWAB.</p>
                        <p class="warning-text">ANDA WAJIB MENJAWAB SEMUA PERTANYAAN.</p>
                        <p>Soal yang belum dijawab:</p>
                    `;
                    unansweredList.innerHTML = '';
                    unanswered.forEach(num => {
                        const item = document.createElement('span');
                        item.textContent = num;
                        item.classList.add('unanswered-item');
                        unansweredList.appendChild(item);
                        item.addEventListener('click', () => {
                            loadQuestion(num - 1);
                            warningModal.style.display = 'none';
                        });
                    });
                    warningModal.style.display = 'flex';
                } else {
                    calculateScore();
                    clearInterval(timerInterval);
                    window.location.href = 'hasil.html';
                }
            }
        });

        loadQuestion(currentQuestionIndex);
        startTimer();
    }

    const scoreElement = document.getElementById('finalScore');
    const namaPesertaElement = document.getElementById('namaPeserta');
    const correctCountElement = document.getElementById('correctCount');
    const incorrectCountElement = document.getElementById('incorrectCount');

    if (scoreElement) {
        const finalScore = localStorage.getItem('skorPeserta') || 0;
        const namaPeserta = localStorage.getItem('namaPeserta') || "Nama Tidak Ditemukan";
        const totalSoal = questions.length;
        const nilaiAkhir = totalSoal > 0 ? Math.round((finalScore / totalSoal) * 100) : 0;
        const incorrectAnswers = totalSoal - finalScore;

        scoreElement.textContent = nilaiAkhir;
        namaPesertaElement.textContent = `Nama: ${namaPeserta}`;
        correctCountElement.textContent = `Jawaban Benar: ${finalScore}`;
        incorrectCountElement.textContent = `Jawaban Salah: ${incorrectAnswers}`;

        localStorage.removeItem('answers');
        localStorage.removeItem('skorPeserta');

        if (typeof confetti !== 'undefined') {
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }
            function fireConfetti() {
                const particleCount = randomInRange(50, 100);
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.7, 0.9) }
                }));
            }
            const fireInterval = setInterval(fireConfetti, 250);
            setTimeout(() => {
                clearInterval(fireInterval);
            }, 3000);
            setTimeout(() => {
                confetti({
                    particleCount: 200,
                    startVelocity: 60,
                    spread: 360,
                    origin: { y: 0.6 }
                });
            }, 1000);
        }
    }

    function calculateScore() {
        const answers = JSON.parse(localStorage.getItem('answers')) || [];
        let score = 0;
        answers.forEach((answer, index) => {
            if (questions[index] && answer === questions[index].jawabanBenar) {
                score++;
            }
        });
        localStorage.setItem('skorPeserta', score);
    }
});

if (window.location.pathname.includes('hasil.html')) {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', function (event) {
        window.history.pushState(null, null, window.location.href);
    });
}