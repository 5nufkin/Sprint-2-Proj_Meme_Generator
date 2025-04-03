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

  img.src = getImgById(meme.selectedImgId).url //TODO maybe change condition to fix slow rendering

  img.onload = function () {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    const memeLines = meme.lines
    if (!memeLines.length) return

    memeLines.forEach((memeLine, idx) => {
      renderTxt(memeLine.txt, memeLine.size, memeLine.color, idx)
    })

    highlightSelectedLine()
    setInputText()
  }
}

function renderTxt(txt, size, color, idx) {
  const location = getLineLocation(idx)
  const fontFamily = getFontFamily()
  gCtx.font = `${size}px ${fontFamily}`
  gCtx.fillStyle = color
  gCtx.textAlign = getTxtAlignment()
  gCtx.fillText(txt, location.x, location.y, gElCanvas.width - 40)
}

function handleTextInput(elInput) {
  setLineTxt(elInput.value)
}

function onDownloadImg(elLink) {
  elLink.href = canvasToDataUrl()
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
  if (!selectedLine.txt || !selectedLine) return
  const highlightWidth = gCtx.measureText(selectedLine.txt).width
  const highlightHeight = selectedLine.size
  const x = selectedLine.x
  const y = selectedLine.y
  setLineWidth(highlightWidth)
  gCtx.strokeRect(x, y - highlightHeight, highlightWidth, highlightHeight)
}

function onSelectLine(ev) {
  const pos = getEvPos(ev)
  const lineIdx = isLineClicked(pos)
  if (lineIdx === -1) return
  selectLine(lineIdx)
  renderMeme()
}

function onChangeFont(newFont) {
  changeFont(newFont)
  renderMeme()
}

function onChangeTxtAlign(newVal) {
  changeTxtAlign(newVal)
  renderMeme()
}

function onMoveVertically(diff) {
  moveVertically(diff)
  renderMeme()
}

function onRemoveLine() {
  removeLine()
  renderMeme()
}

function onAddEmoji(emoji) {
  addLine(emoji.innerText)
  renderMeme()
}

function onDown(ev) {
  const pos = getEvPos(ev)
  const lineIdx = isLineClicked(pos)
  if (lineIdx === -1) return
  selectLine(lineIdx)
  gIsDrag = true
  gLastPos = pos
  document.body.style.cursor = 'move'
  renderMeme()
}

function onUp() {
  gIsDrag = false
  document.body.style.cursor = 'default'
}

function onMove(ev) {
  if (!gIsDrag) return
  const pos = getEvPos(ev)
  const dx = pos.x - gLastPos.x
  const dy = pos.y - gLastPos.y
  moveLine(dx, dy)
  gLastPos = pos
  renderMeme()
}

function moveLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].x += dx
  gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function getEvPos(ev) {
  const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,

    }
  }
  return pos
}

function onUploadToFB(url) {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}

function onUploadImg(ev) {
  ev.preventDefault()
  const canvasData = gElCanvas.toDataURL('image/jpeg')

  function onSuccess(uploadedImgUrl) {
    console.log('uploadedImgUrl:', uploadedImgUrl)
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
    document.querySelector('.share-container').innerHTML = `
          <a target="_blank" href="${uploadedImgUrl}">Image Url</a>
         
          <button class="btn-facebook" target="_blank" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
              Share on Facebook  
          </button>
      `
  }
  uploadImg(canvasData, onSuccess)
}
