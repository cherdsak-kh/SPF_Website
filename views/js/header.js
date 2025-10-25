// ------------------------------------------------------------------------------------------------------>

if (document.title === 'SPF : Milsim Community') {
    const navBox = document.getElementById('nav_box');

    window.addEventListener('scroll', function () {
        let scrollPosition = window.pageYOffset;

        if (scrollPosition > 0) {
            // ถ้าเลื่อนลง, แสดง nav_box
            navBox.classList.add('visible');
        } else {
            // ถ้าอยู่ที่ตำแหน่งบนสุด, ซ่อน nav_box
            navBox.classList.remove('visible');
        }
    });

} else {
    document.getElementById('nav_box').classList.add('visible');
}

// ------------------------------------------------------------------------------------------------------>

// if (document.documentElement.getAttribute('data-bs-theme') === 'light') {
//     document.getElementById('header').classList.add('bg-body-tertiary');
// } else {
//     document.getElementById('header').classList.remove('bg-body-tertiary');
// }

// ------------------------------------------------------------------------------------------------------>

if (document.title === 'SPF : Milsim Community') {

    function scrollToView() {
        const element = document.getElementById('what-is-spf');
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });
    }

    let currentImageIndex = 0;
    const images = Array.from(document.querySelectorAll('.fade-img'));
    const totalImages = images.length;

    // สุ่มเรียงลำดับรูปภาพใหม่
    const shuffledImages = images.sort(() => Math.random() - 0.5);

    // ซ่อนรูปทั้งหมดก่อนเริ่ม (เพิ่ม 'fade-img-close' ที่หน้า html แล้ว)
    // images.forEach(img => img.classList.add('fade-img-close'));

    // แสดงรูปแรกที่ถูกสุ่มมา
    shuffledImages[currentImageIndex].classList.remove('fade-img-close');

    function showNextImage() {
        // ซ่อนรูปปัจจุบัน
        shuffledImages[currentImageIndex].classList.add('fade-img-close');

        // คำนวณตำแหน่งรูปถัดไป
        currentImageIndex = (currentImageIndex + 1) % totalImages;

        // แสดงรูปถัดไป
        shuffledImages[currentImageIndex].classList.remove('fade-img-close');
    }

    // เริ่มสไลด์โชว์
    setInterval(showNextImage, 5000); // เปลี่ยนทุก 5 วินาที


}

// ------------------------------------------------------------------------------------------------------>