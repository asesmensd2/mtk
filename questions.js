const questions = [
    {
        soal: "Sinta punya 24 permen. Ia ingin membagikannya sama rata ke 6 temannya. Berapa permen yang diterima setiap teman?",
        pilihan: ["3 permen", "4 permen", "5 permen", "6 permen"],
        jawabanBenar: "4 permen"
    },
    {
        soal: "Ayah membeli 3 bungkus kue, setiap bungkus berisi 12 kue. Jika 15 kue dimakan, berapa kue yang tersisa?",
        pilihan: ["18 kue", "21 kue", "24 kue", "27 kue"],
        jawabanBenar: "21 kue"
    },
    {
        soal: "Dalam sebuah kotak ada 56 kelereng. Riko mengambil 23 kelereng. Berapa kelereng yang masih ada di kotak?",
        pilihan: ["30 kelereng", "31 kelereng", "32 kelereng", "33 kelereng"],
        jawabanBenar: "33 kelereng"
    },
    {
        soal: "Dina membaca 8 halaman buku setiap hari. Jika bukunya ada 96 halaman, berapa hari ia selesai membaca?",
        pilihan: ["10 hari", "11 hari", "12 hari", "13 hari"],
        jawabanBenar: "12 hari"
    },
    {
        soal: "Seekor ayam menghasilkan 5 butir telur per hari. Berapa banyak telur dalam 12 hari?",
        pilihan: ["50 telur", "60 telur", "70 telur", "80 telur"],
        jawabanBenar: "60 telur"
    },
    {
        soal: "Harga 1 pensil Rp2.000. Jika Budi membeli 7 pensil, berapa ia harus membayar?",
        pilihan: ["Rp12.000", "Rp13.000", "Rp14.000", "Rp15.000"],
        jawabanBenar: "Rp14.000"
    },
    {
        soal: "Sebuah bus membawa 45 penumpang. Di halte pertama turun 18 orang, lalu naik lagi 12 orang. Berapa jumlah penumpang sekarang?",
        pilihan: ["39 orang", "40 orang", "41 orang", "42 orang"],
        jawabanBenar: "39 orang"
    },
    {
        soal: "Udin membeli 3 buah apel dengan harga Rp5.000 per buah, lalu 2 jeruk dengan harga Rp4.000 per buah. Berapa total uang yang harus ia bayar?",
        pilihan: ["Rp20.000", "Rp22.000", "Rp23.000", "Rp24.000"],
        jawabanBenar: "Rp23.000"
    },
    {
        soal: "Lani punya 64 kue, ia ingin menaruhnya dalam kotak dengan isi 8 kue per kotak. Berapa kotak yang dibutuhkan?",
        pilihan: ["6 kotak", "7 kotak", "8 kotak", "9 kotak"],
        jawabanBenar: "8 kotak"
    },
    {
        soal: "Sebuah kebun ditanami 5 baris pohon, setiap baris ada 9 pohon. Berapa banyak pohon seluruhnya?",
        pilihan: ["40 pohon", "45 pohon", "50 pohon", "55 pohon"],
        jawabanBenar: "45 pohon"
    },
    {
        soal: "Jumlah umur Rani dan adiknya adalah 24 tahun. Jika umur Rani 4 tahun lebih tua dari adiknya, berapa umur masing-masing?",
        pilihan: ["Rani 14 tahun, adik 10 tahun", "Rani 15 tahun, adik 9 tahun", "Rani 16 tahun, adik 8 tahun", "Rani 17 tahun, adik 7 tahun"],
        jawabanBenar: "Rani 14 tahun, adik 10 tahun"
    },
    {
        soal: "Sebuah toko menjual buku tulis 5 buah seharga Rp25.000. Jika Ani membeli 12 buku, berapa uang yang harus ia bayar?",
        pilihan: ["Rp55.000", "Rp60.000", "Rp65.000", "Rp70.000"],
        jawabanBenar: "Rp60.000"
    },
    {
        soal: "Dalam lomba lari, 120 peserta dibagi menjadi 8 kelompok sama banyak. Jika 3 kelompok sudah berlari, berapa peserta yang belum berlari?",
        pilihan: ["75 peserta", "80 peserta", "85 peserta", "90 peserta"],
        jawabanBenar: "75 peserta"
    },
    {
        soal: "Sebuah kotak berisi 240 kelereng. Jika dibagi ke dalam kantong, setiap kantong berisi 15 kelereng, berapa banyak kantong yang bisa dibuat?",
        pilihan: ["14 kantong", "15 kantong", "16 kantong", "17 kantong"],
        jawabanBenar: "16 kantong"
    },
    {
        soal: "Ayah membeli 3 karung beras, masing-masing beratnya 25 kg. Jika keluarga makan 5 kg beras setiap minggu, berapa minggu persediaan beras cukup?",
        pilihan: ["13 minggu", "14 minggu", "15 minggu", "16 minggu"],
        jawabanBenar: "15 minggu"
    },
    {
        soal: "Jumlah 3 bilangan adalah 150. Bilangan pertama 2 kali lebih besar dari bilangan kedua, dan bilangan ketiga lebih kecil 10 dari bilangan kedua. Berapa ketiga bilangan itu?",
        pilihan: ["Bilangan 1: 80, Bilangan 2: 40, Bilangan 3: 30", "Bilangan 1: 75, Bilangan 2: 35, Bilangan 3: 40", "Bilangan 1: 65, Bilangan 2: 30, Bilangan 3: 55", "Bilangan 1: 80, Bilangan 2: 35, Bilangan 3: 35"],
        jawabanBenar: "Bilangan 1: 80, Bilangan 2: 40, Bilangan 3: 30"
    },
    {
        soal: "Sebuah kereta memiliki 12 gerbong, setiap gerbong bisa menampung 48 orang. Jika 392 orang sudah naik, berapa kursi yang masih kosong?",
        pilihan: ["152 kursi", "164 kursi", "184 kursi", "192 kursi"],
        jawabanBenar: "184 kursi"
    },
    {
        soal: "Harga 1 roti Rp4.500. Jika Dita membeli 8 roti dan membayar dengan Rp50.000, berapa kembalian yang ia terima?",
        pilihan: ["Rp10.000", "Rp14.000", "Rp16.000", "Rp18.000"],
        jawabanBenar: "Rp14.000"
    },
    {
        soal: "Sebuah kebun berbentuk persegi panjang berukuran 25 m × 18 m. Berapa luas seluruh kebun itu? Jika 1 m² ditanami 4 tanaman, berapa banyak tanaman yang bisa ditanam?",
        pilihan: ["450 m² dan 1.600 tanaman", "450 m² dan 1.800 tanaman", "420 m² dan 1.680 tanaman", "420 m² dan 1.800 tanaman"],
        jawabanBenar: "450 m² dan 1.800 tanaman"
    },
    {
        soal: "Seorang pedagang membawa 360 telur. Dalam perjalanan 48 telur pecah. Jika telur yang masih bagus dimasukkan ke dalam wadah berisi 24 telur per wadah, berapa banyak wadah yang penuh?",
        pilihan: ["12 wadah", "13 wadah", "14 wadah", "15 wadah"],
        jawabanBenar: "13 wadah"
    }
];
