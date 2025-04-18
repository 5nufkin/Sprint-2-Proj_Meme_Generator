'use strict'

function onSaveMeme() {
  const memeUrl = gElCanvas.toDataURL()
  addMeme(memeUrl)
  // TODO: For now - change rendering later on (singlePageApp)
  renderSavedMemes()
}

function renderSavedMemes() {
  const savedMemes = getSavedMemes()
  var strHTMLs = savedMemes.map((meme,idx) => `<article><img onclick="coverCanvasWithMeme(${idx})" src="${meme.url}"><button onclick="onDeleteSavedMeme(${idx})">X</button></article>`)
  document.querySelector('.saved-memes').innerHTML = strHTMLs.join('')
}

function coverCanvasWithMeme(memeIdx) {
  updateGMeme(gSavedMemes[memeIdx])
  handleSectionChange('editor')
  renderMeme()
}

function onDeleteSavedMeme(memeIdx) {
  removeMeme(memeIdx)
  renderSavedMemes()
}