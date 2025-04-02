'use strict'

function renderGallery() {
  const imgs = gImgs
  var buttonHTML = `<button class="btn btn-randomize" onclick="onRandomizeMeme()">I'm flexible</button>`
  var strHTMLs = imgs.map(img => `<article><img onclick="onImgSelect(${img.id})" src="img/${img.id}.jpg"></article>`)
  document.querySelector('.gallery').innerHTML = buttonHTML + strHTMLs.join('')
}

function onImgSelect(imgId) {
  setImg(imgId)
  resetMeme()
  renderMeme()
}

function onRandomizeMeme() {
  RandomizeMeme()
  renderMeme()
}