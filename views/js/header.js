// ------------------------------------------------------------------------------------------------------>

if (document.title === 'หน้าหลัก | SPF : Milsim Community') {
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        let scrollPosition = window.pageYOffset;

        if (scrollPosition > 0) {
            // ถ้าเลื่อนลง, แสดง header
            header.classList.add('visible');
        } else {
            // ถ้าอยู่ที่ตำแหน่งบนสุด, ซ่อน header
            header.classList.remove('visible');
        }
    });

} else {
    document.getElementById('header').classList.add('visible');
}

// ------------------------------------------------------------------------------------------------------>

document.addEventListener('DOMContentLoaded', function () {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// ------------------------------------------------------------------------------------------------------>