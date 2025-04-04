document.addEventListener('DOMContentLoaded', () => {
    let uselessClickCount = 0; // Untuk fitur 10

    // Helper Function: Show temporary feedback
    function showFeedback(element, message) {
        element.textContent = message;
        element.classList.add('visible');
        setTimeout(() => {
            element.classList.remove('visible');
        }, 1500);
    }

    // --- Fitur 1: Tombol Tak Berguna Klasik ---
    const uselessButton = document.getElementById('uselessButton');
    const uselessButtonFeedback = document.getElementById('uselessButtonFeedback');
    if (uselessButton) {
        uselessButton.addEventListener('click', () => {
            const responses = [
                "Oke...", "Terima kasih?", "Apa itu tadi?",
                "Sudah kuduga.", "...", "Tepat sekali!", "Untuk apa?",
                "Terjadi sesuatu? (Tidak)", "Klik yang bagus.",
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            showFeedback(uselessButtonFeedback, randomResponse);
            uselessClickCount++; // Hitung juga klik ini
            updateClickCounter();
        });
    }

    // --- Fitur 2: Tombol Kabur ---
    const runningButton = document.getElementById('runningButton');
    const runnerContainer = runningButton?.parentElement;
    if (runningButton && runnerContainer) {
        runningButton.addEventListener('mouseover', moveRunningButton);
        runningButton.addEventListener('click', () => { // Jika berhasil diklik
             showFeedback(runnerContainer.closest('.feature-card').querySelector('p') || runnerContainer, "Hah! Kena juga!");
             uselessClickCount++;
             updateClickCounter();
        });

        function moveRunningButton() {
            const containerRect = runnerContainer.getBoundingClientRect();
            const buttonRect = runningButton.getBoundingClientRect();

            const maxX = containerRect.width - buttonRect.width - 10; // Kurangi padding/border
            const maxY = containerRect.height - buttonRect.height - 10;

            const newX = Math.random() * maxX;
            const newY = Math.random() * maxY;

            runningButton.style.left = `${newX}px`;
            runningButton.style.top = `${newY}px`;
        }
         // Pindahkan sekali di awal
        setTimeout(moveRunningButton, 100);
    }

    // --- Fitur 3: Pengubah Warna Latar Acak ---
    const colorChangeButton = document.getElementById('colorChangeButton');
    const colorFrenzyCard = document.getElementById('color-frenzy-card');
    const mainBody = document.getElementById('main-body');
    let colorChangeInterval = null;

    function changeBackgroundColor() {
         const randomColor = `hsl(${Math.random() * 360}, 70%, 7%)`; // Warna gelap random
         mainBody.style.backgroundColor = randomColor;
    }

    if (colorChangeButton) {
        colorChangeButton.addEventListener('click', changeBackgroundColor);
    }
    if(colorFrenzyCard) {
        // Juga ganti saat mouse masuk area kartu
        colorFrenzyCard.addEventListener('mouseenter', changeBackgroundColor);
        // Bisa juga pakai interval saat hover (tapi bisa bikin pusing)
        // colorFrenzyCard.addEventListener('mouseenter', () => {
        //     if(!colorChangeInterval) {
        //          colorChangeInterval = setInterval(changeBackgroundColor, 500);
        //     }
        // });
        // colorFrenzyCard.addEventListener('mouseleave', () => {
        //     clearInterval(colorChangeInterval);
        //     colorChangeInterval = null;
        // });
    }


    // --- Fitur 4: Pengikut Kursor Aneh ---
    const follower = document.getElementById('cursorFollower');
    if (follower) {
        window.addEventListener('mousemove', (e) => {
            // Gunakan requestAnimationFrame untuk performa lebih baik
             requestAnimationFrame(() => {
                follower.style.left = `${e.clientX - follower.offsetWidth / 2}px`;
                follower.style.top = `${e.clientY - follower.offsetHeight / 2}px`;
            });
        });
         // Sembunyikan saat mouse keluar window (opsional)
         document.addEventListener('mouseleave', () => {
            follower.style.transform = 'scale(0)';
        });
         document.addEventListener('mouseenter', () => {
            follower.style.transform = 'scale(1)';
        });
    }

    // --- Fitur 5: Teks Mengetik Sendiri ---
    const typingTextElement = document.getElementById('typingText');
    if (typingTextElement) {
        const messages = [
            "Memuat ketidakbergunaan...",
            "Apakah kamu melihat ini?",
            "Ini hanya teks.",
            "Piksel sedang bekerja keras.",
            "Jangan terlalu dipikirkan.",
            "System.out.println(\"Hello, void!\");",
            "Menunggu instruksi... atau tidak.",
            "Error 404: Kegunaan not found.",
            "...",
        ];
        let messageIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentMessage = messages[messageIndex];
            let displayText = '';

            if (isDeleting) {
                displayText = currentMessage.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayText = currentMessage.substring(0, charIndex + 1);
                charIndex++;
            }

            typingTextElement.textContent = displayText;

            let typeSpeed = isDeleting ? 50 : 100; // Kecepatan hapus/ketik

            if (!isDeleting && charIndex === currentMessage.length) {
                typeSpeed = 1500; // Jeda sebelum menghapus
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % messages.length; // Pindah ke pesan berikutnya
                typeSpeed = 500; // Jeda sebelum mulai ketik pesan baru
            }

            setTimeout(type, typeSpeed);
        }
        setTimeout(type, 500); // Mulai setelah jeda singkat
    }


    // --- Fitur 6: Switch Absurd ---
    const uselessSwitch = document.getElementById('uselessSwitch');
    const switchLabel = document.getElementById('switchLabel');
    if (uselessSwitch && switchLabel) {
        uselessSwitch.addEventListener('change', () => {
            if (uselessSwitch.checked) {
                switchLabel.textContent = "Mode Berguna (Tetap Bohong)";
                // Efek samping tidak berguna saat ON? Misal: footer bergoyang?
                 document.querySelector('.main-footer').style.animation = 'shake 0.5s ease-in-out';
                 setTimeout(() => document.querySelector('.main-footer').style.animation = '', 500);
            } else {
                switchLabel.textContent = "Mode Bohong (Lebih Jujur)";
                 // Efek samping tidak berguna saat OFF?
            }
             uselessClickCount++;
             updateClickCounter();
        });
    }

    // --- Fitur 7: Area Klik Penghasil Konfeti ---
    const confettiArea = document.getElementById('confettiArea');
    if (confettiArea && typeof confetti === 'function') { // Pastikan library confetti ada
        confettiArea.addEventListener('click', (event) => {
            const rect = confettiArea.getBoundingClientRect();
            // Koordinat klik relatif terhadap viewport
            const clickX = event.clientX;
            const clickY = event.clientY;

            // Konversi ke rasio 0-1 untuk origin confetti
            const originX = (clickX - rect.left) / rect.width;
            const originY = (clickY - rect.top) / rect.height;

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { x: originX, y: originY }
            });
             uselessClickCount++;
             updateClickCounter();
        });
    }

    // --- Fitur 8: Scroll Tak Terhingga Palsu ---
    const fakeInfiniteScroll = document.getElementById('fakeInfiniteScroll');
    if(fakeInfiniteScroll) {
        let scrollCounter = 0;
        function addMoreUselessContent() {
            for(let i = 0; i < 10; i++) {
                const p = document.createElement('p');
                p.textContent = `Baris tidak penting ke-${++scrollCounter}...`;
                fakeInfiniteScroll.appendChild(p);
            }
        }
        // Tambah konten awal
        addMoreUselessContent();

        // Tambah lagi saat scroll mendekati bawah
        fakeInfiniteScroll.addEventListener('scroll', () => {
            // Jika jarak scroll ke bawah kurang dari 2x tinggi elemen
            if (fakeInfiniteScroll.scrollHeight - fakeInfiniteScroll.scrollTop - fakeInfiniteScroll.clientHeight < fakeInfiniteScroll.clientHeight * 2) {
                addMoreUselessContent();
            }
        });
    }

    // --- Fitur 9: Gambar yang Bergetar ---
    const shakyImage = document.getElementById('shakyImage');
    if(shakyImage) {
        shakyImage.addEventListener('mouseenter', () => {
            shakyImage.classList.add('shake');
        });
         shakyImage.addEventListener('animationend', () => {
            shakyImage.classList.remove('shake');
        });
         // Juga goyang saat diklik
         shakyImage.addEventListener('click', () => {
            if (!shakyImage.classList.contains('shake')) { // Hindari spam animasi
                 shakyImage.classList.add('shake');
            }
             uselessClickCount++;
             updateClickCounter();
         });
    }

    // --- Fitur 10: Penghitung Klik Nggak Penting ---
    const clickCountSpan = document.getElementById('clickCount');
    const incrementButton = document.getElementById('incrementUselessClicks');

    function updateClickCounter() {
        if(clickCountSpan) {
            clickCountSpan.textContent = uselessClickCount;
        }
    }

    if(incrementButton) {
         incrementButton.addEventListener('click', () => {
            uselessClickCount++;
            updateClickCounter();
            // Efek visual kecil di tombol
            incrementButton.style.transform = 'scale(0.95)';
            setTimeout(() => incrementButton.style.transform = 'scale(1)', 100);
         });
    }

    // Inisialisasi awal
    updateClickCounter();

    // --- Pesan Footer Acak ---
    const footerMessage = document.getElementById('footerMessage');
    if(footerMessage) {
        const footerMessages = [
            "Semoga harimu... ada.", "Gulir terus, mungkin ada sesuatu di bawah.",
            "Jangan lupa istirahat dari ketidakbergunaan ini.",
            "Piksel ini disponsori oleh kebosanan.", "Refresh halaman untuk dosis baru."
        ];
        footerMessage.textContent = footerMessages[Math.floor(Math.random() * footerMessages.length)];
    }

}); // Akhir DOMContentLoaded