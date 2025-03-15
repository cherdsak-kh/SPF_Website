// ------------------------------------------------------------------------------------------------------>

if (document.title === 'หน้าหลัก | SPF : Milsim Community') {

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
    const images = document.querySelectorAll('.fade-image');
    const totalImages = images.length;

    function showNextImage() {
        // ซ่อนรูปภาพปัจจุบัน
        images[currentImageIndex].classList.remove('show');

        // คำนวณตำแหน่งของรูปถัดไป
        currentImageIndex = (currentImageIndex + 1) % totalImages;

        // แสดงรูปภาพถัดไป
        images[currentImageIndex].classList.add('show');
    }

    // เริ่มสไลด์โชว์
    images[currentImageIndex].classList.add('show');
    setInterval(showNextImage, 5*1000); // เปลี่ยนทุก ๆ 5 วินาที

}

// ------------------------------------------------------------------------------------------------------>

function showLargeImage(src) {
    const largeImg = document.getElementById('imgLarge')
    largeImg.classList.remove('d-none')
    largeImg.classList.add('d-flex')
    largeImg.innerHTML = ''; 

    const imgShow = document.createElement('img')
    imgShow.src = src

    const btnClose = document.createElement('button')
    btnClose.innerHTML = '<i class="bi bi-x-lg"></i>'
    btnClose.className = 'largeImgBtnClose btn btn-outline-danger'
    btnClose.onclick = () => {
        largeImg.classList.remove('d-flex')
        largeImg.classList.add('d-none')
    }

    largeImg.appendChild(imgShow)
    largeImg.appendChild(btnClose)
}

// ------------------------------------------------------------------------------------------------------>