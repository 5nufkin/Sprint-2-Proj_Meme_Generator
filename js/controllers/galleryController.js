'use strict'

function renderGallery() {
  const imgs = gImgs
  var strHTMLs = imgs.map(img => `<article><img onclick="onImgSelect(${img.id})" src="img/${img.id}.jpg"></article>`)
  document.querySelector('.gallery').innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
  setImg(imgId)
  renderMeme()
}