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