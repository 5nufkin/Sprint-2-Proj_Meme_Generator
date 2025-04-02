'use strict'

function onSaveMeme() {
  const memeUrl = gElCanvas.toDataURL()
  addMeme(memeUrl)
  _saveMemesToStorage()
  // TODO: For now - change rendering later on
  renderSavedMemes()
}

function renderSavedMemes() {
  const savedMemes = getSavedMemes()
  var strHTMLs = savedMemes.map((meme,idx) => `<article><img onclick="coverCanvasWithMeme(${idx})" src="${meme.url}"><button onclick="onDeleteSavedMeme(${idx})">X</button></article>`)
  document.querySelector('.saved-memes').innerHTML = strHTMLs.join('')
}

// function onSelectSaved() {
//   coverCanvasWithMeme
// }

function coverCanvasWithMeme(memeIdx) {
  gMeme = {...gSavedMemes[memeIdx]}
  renderMeme()
  // console.log('elMeme:',elMeme)
  // gElCanvas.height = (elMeme.naturalHeight / elMeme.naturalWidth) * gElCanvas.width
  //   gCtx.drawImage(elMeme, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onDeleteSavedMeme(memeIdx) {
  removeMeme(memeIdx)
  renderSavedMemes()
}