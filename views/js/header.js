// ------------------------------------------------------------------------------------------------------>

if (document.title === 'SPF : Milsim Community') {
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

if (document.documentElement.getAttribute('data-bs-theme') === 'light') {
    document.getElementById('header').classList.add('bg-body-tertiary');
} else {
    document.getElementById('header').classList.remove('bg-body-tertiary');
}

// ------------------------------------------------------------------------------------------------------>