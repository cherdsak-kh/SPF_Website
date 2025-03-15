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