// ------------------------------------------------------------------------------------------------------>

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// ------------------------------------------------------------------------------------------------------>

function showLargeImage(src) {
    const largeImg = document.getElementById('imgLarge');
    largeImg.classList.remove('d-none');
    largeImg.classList.add('d-flex');
    largeImg.innerHTML = '';

    // Disable scroll bar
    document.body.style.overflow = 'hidden';

    const imgShow = document.createElement('img');
    imgShow.src = src;
    imgShow.style.animationName = 'zoom';
    imgShow.style.animationDuration = '0.6s';
    imgShow.style.maxWidth = '90%'; // Ensure responsiveness
    imgShow.style.maxHeight = '90%'; // Ensure responsiveness
    imgShow.style.objectFit = 'contain'; // Maintain aspect ratio

    const btnClose = document.createElement('button');
    btnClose.innerHTML = '<i class="bi bi-x-lg"></i>';
    btnClose.className = 'largeImgBtnClose btn btn-outline-danger';
    btnClose.onclick = closeLargeImage;

    largeImg.onclick = (event) => {
        if (event.target === largeImg) {
            closeLargeImage();
        }
    };

    function closeLargeImage() {
        largeImg.classList.remove('d-flex');
        largeImg.classList.add('d-none');
        // Enable scroll bar
        document.body.style.overflow = 'auto';
    }

    largeImg.appendChild(imgShow);
    largeImg.appendChild(btnClose);
}

// ------------------------------------------------------------------------------------------------------>

const scrollToTop = document.getElementById('scrollToTop');
scrollToTop.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// ------------------------------------------------------------------------------------------------------>

// ตรวจสอบสถานะการยอมรับคุกกี้เมื่อเชื่อมต่อ
socket.on('cookieAccepted', (accepted) => {
    if (accepted) {
        document.getElementById("cookie-banner").style.display = "none"; // ซ่อนแถบคุกกี้
    } else {
        document.getElementById("cookie-banner").style.display = "block"; // แสดงแถบคุกกี้
    }
});

// ฟังก์ชันเมื่อผู้ใช้กดยอมรับคุกกี้
function acceptCookie() {
    document.cookie = "cookieConsent=accepted; max-age=" + (30 * 24 * 60 * 60) + "; path=/"; // ตั้งค่าคุกกี้
    socket.emit('acceptCookie'); // แจ้งเซิร์ฟเวอร์ว่าผู้ใช้ยอมรับคุกกี้
    document.getElementById("cookie-banner").style.display = "none"; // ซ่อนแถบคุกกี้
}

// ------------------------------------------------------------------------------------------------------>