'use strict'

const STORAGE_KEY = 'memesDB'

var gSavedMemes = loadFromStorage(STORAGE_KEY) || []

function getSavedMemes() {
  return loadFromStorage(STORAGE_KEY)
}

function _saveMemesToStorage() {
  saveToStorage(STORAGE_KEY, gSavedMemes)
}

function addMeme(url) {
  const memeData = getMeme()
  const memeToSave = {
    url,
    selectedImgId: memeData.selectedImgId,
    selectedLineIdx: memeData.selectedLineIdx,
    lines: memeData.lines,
    fontFamily: memeData.fontFamily,
    textAlign: memeData.textAlign
  }
  
  gSavedMemes.unshift(memeToSave)
}

function removeMeme(memeIdx) {
  gSavedMemes.splice(memeIdx, 1)
  _saveMemesToStorage()
}

function updateSavedMemes() {
  _saveMemesToStorage()
}
