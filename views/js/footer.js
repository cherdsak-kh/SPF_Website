// ------------------------------------------------------------------------------------------------------>

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// ------------------------------------------------------------------------------------------------------>

function imgPreview(src) {
    const imgPreviewBox = document.getElementById('image-preview-box');
    imgPreviewBox.classList.remove('d-none');
    imgPreviewBox.classList.add('d-flex');
    imgPreviewBox.innerHTML = '';

    // Disable scroll bar
    document.body.style.overflow = 'hidden';

    imgPreviewBox.innerHTML = `
    
        <div class="col-lg-10 rounded overflow-hidden">
            <div class="show-image position-relative">
                <img src="${src}" class="w-100 image-preview" alt="image-preview">
                <button id="image-preview-close" type="button" class="btn-close position-absolute top-0 end-0 m-2" aria-label="Close"></button>
            </div>
        </div>
    `;

    const imagePreviewClose = document.getElementById('image-preview-close');
    imagePreviewClose.onclick = closeImagePreview;

    imgPreviewBox.onclick = (event) => {
        if (event.target === imgPreviewBox) {
            closeImagePreview();
        }
    };

    function closeImagePreview() {
        imgPreviewBox.classList.remove('d-flex');
        imgPreviewBox.classList.add('d-none');
        imgPreviewBox.innerHTML = '';
        // Enable scroll bar
        document.body.style.overflow = 'auto';
    }
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