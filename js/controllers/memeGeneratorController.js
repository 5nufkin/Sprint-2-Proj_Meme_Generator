'use strict'

let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.clientWidth - 40
}

function renderMeme(imgId, txt = 'Enter txt') {
  const img = new Image()
  img.src = getImgById(imgId).url
  img.onload = function () {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderTxt(txt)
  }
}

function renderTxt(txt = 'Enter text') {
  gCtx.font = "25px arial"
  gCtx.fillStyle = 'white'
  gCtx.fillText(txt, 20, 20, gElCanvas.width - 20)
}
