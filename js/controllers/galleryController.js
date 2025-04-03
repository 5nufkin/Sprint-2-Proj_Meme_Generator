'use strict'

function renderGallery() {
  const imgs = getImgs()
  var strHTMLs = imgs.map(img => `<article><img onclick="onImgSelect(${img.id})" src="img/${img.id}.jpg"></article>`)
  document.querySelector('.gallery').innerHTML = strHTMLs.join('')
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

function onFilterBy(filter) {
  setFilterBy(filter)
  // const imgsFilteredBy = filterBy(filter)
  renderGallery()
}

function onClearFilter() {
  document.querySelector('#filter-by').value = ''
  setFilterBy('')
  renderGallery()
}