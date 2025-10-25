if (document.title === '404 Not Found') {
    // ตั้งค่าเวลาถอยหลัง (10 วินาที)
    let countdown = 4;

    // ฟังก์ชันแสดงเวลาที่เหลือ
    function updateCountdown() {
        document.getElementById('countdown').textContent = countdown;
        countdown--;

        // เมื่อ countdown เหลือ 0 จะเปลี่ยนเส้นทางไปยังหน้าแรก
        if (countdown < 0) {
            window.location.href = '/';
        }
    }

    // อัพเดตทุก 1 วินาที
    setInterval(updateCountdown, 1000);
}