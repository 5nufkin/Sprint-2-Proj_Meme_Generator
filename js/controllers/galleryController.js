'use strict'

function renderGallery() {
  const imgs = gImgs
  var strHTMLs = imgs.map(img => `<article><img src="img/${img.id}.jpg"></article>`)
  document.querySelector('.gallery').innerHTML = strHTMLs.join('')
}