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

function renderMeme() {
  const meme = getMeme()
  const img = new Image()
  
  img.src = getImgById(meme.selectedImgId).url

  img.onload = function () {
    const memeLine = meme.lines[meme.selectedLineIdx]
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderTxt(memeLine.txt, memeLine.size, memeLine.color)
  }
}

function renderTxt(txt, size, color) {
  gCtx.font = `${size}px arial`
  gCtx.fillStyle = color
  gCtx.fillText(txt, 20, 20, gElCanvas.width - 20)
}

function handleTextInput(elInput) {
  setLineTxt(elInput.value)
}
