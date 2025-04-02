'use strict'

let gElCanvas
let gCtx

function onInit() {
  renderGallery()
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.clientWidth - 40
  if (getMeme()) renderMeme()
}

function renderMeme() {
  const meme = getMeme()
  const img = new Image()

  img.src = getImgById(meme.selectedImgId).url

  img.onload = function () {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    const memeLines = gMeme.lines
    memeLines.forEach((memeLine, idx) => {
      renderTxt(memeLine.txt, memeLine.size, memeLine.color, idx)
    })
    highlightSelectedLine()
    setInputText()
    // const memeLine = meme.lines[meme.selectedLineIdx]
    // renderTxt(memeLine.txt, memeLine.size, memeLine.color, meme.selectedLineIdx)
    // renderTxt(memeLine.txt, memeLine.size, memeLine.color, meme.selectedLineIdx)
  }
}

function renderTxt(txt, size, color, idx) {
  console.log('idx(RENDER):',idx)
  const location = getLineLocation(idx)

  gCtx.font = `${size}px arial`
  gCtx.fillStyle = color
  gCtx.fillText(txt, location.x, location.y, gElCanvas.width - 40)
}

function handleTextInput(elInput) {
  setLineTxt(elInput.value)
}

function onDownloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

function onChangeTxtColor(elColorPicker) {
  gMeme.lines[gMeme.selectedLineIdx].color = elColorPicker.value
  renderMeme()
}

function onChangeFontSize(diff) {
  gMeme.lines[gMeme.selectedLineIdx].size += diff
  renderMeme()
}

//TODO: Merge to 1 function
// function onChangeLinePrefs(property, value) {
//   if (property === 'size') value += gMeme.lines[gMeme.selectedLineIdx][property]
//   gMeme.lines[gMeme.selectedLineIdx][property] = value
// }

function onAddLine() {
  addLine()
  renderMeme()
}

function onSwitchLine() {
  switchLine()
  setInputText()
  renderMeme()
}

function setInputText() {
  const elTextInput = getSelectedLine().txt
  document.querySelector('.input-text').value = elTextInput
}

function highlightSelectedLine() {
  const selectedLine = getSelectedLine()
  if(!selectedLine.txt) return 
  const highlightWidth = gCtx.measureText(selectedLine.txt).width
  const highlightHeight = selectedLine.size
  const x = selectedLine.x
  const y = selectedLine.y
  gCtx.strokeRect(x, y - highlightHeight, highlightWidth, highlightHeight)
}

