// script.js

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
        const showQuestionListBtn = document.getElementById('showQuestionList');
        const questionListModal = document.getElementById('questionListModal');
        const questionListGrid = document.getElementById('questionListGrid');
        const warningModal = document.getElementById('warningModal');
        const warningMessage = document.getElementById('warningMessage');
        const unansweredList = document.getElementById('unansweredList');
        const returnToQuizBtn = document.getElementById('returnToQuizBtn');
        const quizHeader = document.querySelector('.header');

        function loadQuestion(index) {
            const question = questions[index];
            questionNumber.textContent = `SOAL NOMOR ${index + 1}`;
            questionText.textContent = question.soal;
            
            answerButtons.forEach((button, i) => {
                button.textContent = question.pilihan[i];
                button.classList.remove('selected');
                
                const savedAnswer = answers[index];
                if (savedAnswer && savedAnswer === question.pilihan[i]) {
                    button.classList.add('selected');
                }
            });
            
            updateNavigationButtons(index);
            updateQuestionListGrid();
        }

        function updateNavigationButtons(index) {
            if (index === 0) {
                prevButton.style.display = 'none';
            } else {
                prevButton.style.display = 'inline-block';
            }
            if (index === questions.length - 1) {
                nextButton.textContent = 'SELESAI';
                nextButton.classList.add('finish-button');
            } else {
                nextButton.textContent = 'SOAL SELANJUTNYA';
                nextButton.classList.remove('finish-button');
            }
        }

        function updateQuestionListGrid() {
            if (questionListGrid) {
                questionListGrid.innerHTML = '';
                questions.forEach((q, index) => {
                    const numberBox = document.createElement('div');
                    numberBox.textContent = index + 1;
                    numberBox.classList.add('question-number-box');
                    if (answers[index]) {
                        numberBox.classList.add('answered');
                    }
                    numberBox.addEventListener('click', () => {
                        currentQuestionIndex = index;
                        loadQuestion(currentQuestionIndex);
                        questionListModal.style.display = 'none';
                    });
                    questionListGrid.appendChild(numberBox);
                });
            }
        }

        let timeLimitInMinutes = 120; // Waktu ujian dalam menit
        let endTime = localStorage.getItem('endTime');
        let timerInterval;

        if (!endTime) {
            endTime = new Date().getTime() + timeLimitInMinutes * 60 * 1000;
            localStorage.setItem('endTime', endTime);
        } else {
            endTime = parseInt(endTime);
        }

        function startTimer() {
            timerInterval = setInterval(() => {
                const now = new Date().getTime();
                const timeLeft = endTime - now;

                if (timeLeft < 0) {
                    clearInterval(timerInterval);
                    alert("Waktu ujian telah habis!");
                    // Hitung skor dan alihkan ke halaman hasil
                    const answers = JSON.parse(localStorage.getItem('answers')) || [];
                    let score = 0;
                    answers.forEach((answer, index) => {
                        if (questions[index] && answer === questions[index].jawabanBenar) {
                            score++;
                        }
                    });

                    const resultData = {
                        nama: localStorage.getItem('namaPeserta'),
                        skor: score,
                        answers: answers
                    };

                    let allResults = JSON.parse(localStorage.getItem('allUjianResults')) || [];
                    allResults.push(resultData);
                    localStorage.setItem('allUjianResults', JSON.stringify(allResults));

                    localStorage.setItem('skorPeserta', score);
                    window.location.href = 'hasil.html';
                    return;
                }

                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                timerDisplay.textContent = `SISA WAKTU : ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }, 1000);
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
                const selectedAnswer = button.textContent;
                answers[currentQuestionIndex] = selectedAnswer;
                localStorage.setItem('answers', JSON.stringify(answers));

                answerButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                
                updateQuestionListGrid();
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
                    const answers = JSON.parse(localStorage.getItem('answers')) || [];
                    let score = 0;
                    const resultData = {
                        nama: localStorage.getItem('namaPeserta'),
                        skor: 0,
                        answers: answers,
                        correctAnswers: []
                    };
                    answers.forEach((answer, index) => {
                        if (questions[index] && answer === questions[index].jawabanBenar) {
                            score++;
                            resultData.correctAnswers[index] = true;
                        } else {
                            resultData.correctAnswers[index] = false;
                        }
                    });
                    resultData.skor = score;

                    let allResults = JSON.parse(localStorage.getItem('allUjianResults')) || [];
                    allResults.push(resultData);
                    localStorage.setItem('allUjianResults', JSON.stringify(allResults));

                    localStorage.setItem('skorPeserta', score);
                    
                    clearInterval(timerInterval);
                    window.location.href = 'hasil.html';
                }
            }
        });

        showQuestionListBtn.addEventListener('click', () => {
            questionListModal.style.display = 'flex';
        });

        const closeButton = questionListModal.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                questionListModal.style.display = 'none';
            });
        }
        
        returnToQuizBtn.addEventListener('click', () => {
            warningModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === questionListModal) {
                questionListModal.style.display = 'none';
            }
            if (event.target === warningModal) {
                warningModal.style.display = 'none';
            }
        });

        loadQuestion(currentQuestionIndex);
        startTimer();
    }
    
    const scoreElement = document.getElementById('finalScore');
    if (scoreElement) {
        const finalScore = localStorage.getItem('skorPeserta') || 0;
        const namaPeserta = localStorage.getItem('namaPeserta') || "Nama Tidak Ditemukan";
        const totalSoal = questions.length;
        const nilaiAkhir = totalSoal > 0 ? Math.round((finalScore / totalSoal) * 100) : 0;
        const incorrectAnswers = totalSoal - finalScore;

        scoreElement.textContent = nilaiAkhir;
        document.getElementById('namaPeserta').textContent = `Nama: ${namaPeserta}`;
        document.getElementById('correctCount').textContent = `Jawaban Benar: ${finalScore}`;
        document.getElementById('incorrectCount').textContent = `Jawaban Salah: ${incorrectAnswers}`;

        if (nilaiAkhir > 70) {
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
});

// KODE INI AKAN MENJAGA HASIL DI LOCALSTORAGE AGAR TIDAK HILANG SETELAH REFRESH
// DAN MENCEGAH PENGGUNA KEMBALI KE HALAMAN SEBELUMNYA
if (window.location.pathname.includes('hasil.html') || window.location.pathname.includes('quis.html')) {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', function (event) {
        window.history.pushState(null, null, window.location.href);
    });
}
