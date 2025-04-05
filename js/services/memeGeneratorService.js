'use strict'

var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['politics', 'trump', 'president', 'angry'] },
  { id: 2, url: 'img/2.jpg', keywords: ['puppy', 'funny', 'animals'] },
  { id: 3, url: 'img/3.jpg', keywords: ['puppy', 'funny', 'animals', 'baby', 'sleep'] },
  { id: 4, url: 'img/4.jpg', keywords: ['cat', 'laptop', 'animals', 'sleep'] },
  { id: 5, url: 'img/5.jpg', keywords: ['success', 'baby', 'yes'] },
  { id: 6, url: 'img/6.jpg', keywords: ['explain', 'funny', 'history', 'professor', 'crazy'] },
  { id: 7, url: 'img/7.jpg', keywords: ['surprise', 'funny', 'baby', 'shocked'] },
  { id: 8, url: 'img/8.jpg', keywords: ['magic', 'funny', 'purple', 'bowtie', 'smile'] },
  { id: 9, url: 'img/9.jpg', keywords: ['smile', 'funny', 'asian', 'baby', 'little'] },
  { id: 10, url: 'img/10.jpg', keywords: ['politics', 'funny', 'laugh', 'obama', 'president'] },
  { id: 11, url: 'img/11.jpg', keywords: ['sports', 'funny', 'kiss', 'angry', 'nba', 'basketball'] },
  { id: 12, url: 'img/12.jpg', keywords: ['israeli', 'funny', 'pointing', 'glasses', 'crime', 'law'] },
  { id: 13, url: 'img/13.jpg', keywords: ['dicaprio', 'leonardo', 'viral', 'toast', 'funny', 'smile', 'movie'] },
  { id: 14, url: 'img/14.jpg', keywords: ['matrix', 'funny', 'glasses', 'viral', 'movie'] },
  { id: 15, url: 'img/15.jpg', keywords: ['zero', 'funny', 'movie', 'actor', 'viral'] },
  { id: 16, url: 'img/16.jpg', keywords: ['movie', 'funny', 'viral', 'laugh', 'actor'] },
  { id: 17, url: 'img/17.jpg', keywords: ['putin', 'funny', 'russia', 'president', 'politics'] },
  { id: 18, url: 'img/18.jpg', keywords: ['movie', 'funny', 'cartoon', 'buzz', 'woody', 'toys'] },
  { id: 19, url: 'img/19.jpg', keywords: ['movie', 'funny', 'cartoon', 'mean', 'sad', 'angry'] },
  { id: 20, url: 'img/20.jpg', keywords: ['israeli', 'shahar', 'viral', 'angry', 'scream', 'what', 'old'] },
  { id: 21, url: 'img/21.jpg', keywords: ['oprah', 'winfrey', 'success', 'famous', 'funny', 'scream'] },
  { id: 22, url: 'img/22.jpg', keywords: ['politics', 'trump', 'president', 'angry', 'pointing'] },
  { id: 23, url: 'img/23.jpg', keywords: ['dress', 'dance', 'mountain', 'girl', 'happy', 'smile', 'nature'] },
  { id: 24, url: 'img/24.jpg', keywords: ['funny', 'dance', 'africa', 'kids', 'happy', 'smile',] },
  { id: 25, url: 'img/25.jpg', keywords: ['dog', 'weird', 'animals', 'nature'] },
]

var gMeme = {
  selectedImgId: null,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      color: 'steelblue',
      outline: 'black',
      x: null,
      y: null
    }
  ],
  fontFamily: 'Arial',
  textAlign: 'left',
}

var gKeywordSearchCountMap = { 'funny': 5, 'baby': 2, 'politics': 0, 'cat': 8, 'animals': 1, 'viral': 2 }

var gLastPos
var gIsDrag = false

function resetMeme() {
  gMeme.selectedLineIdx = 0
  gMeme.lines = [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      color: 'steelblue',
      outline: 'black',
      x: null,
      y: null
    }
  ]
  gMeme.fontFamily = 'Arial'
  gMeme.textAlign = 'left'
}

function getImgById(imgId) {
  var img = gImgs.find(img => img.id === imgId)
  return img
}

function getMeme() {
  if (gMeme.selectedImgId) return gMeme
  return null
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function addLine(txt = '') {
  gMeme.lines.push(_createLine(txt))
  switchLine()
}

function _createLine(txt) {
  if (!txt) txt = 'Enter text'
  return {
    txt,
    size: 20,
    color: 'steelblue',
    outline: 'black',
    x: null,
    y: null
  }
}

function switchLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function getSelectedLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function getLineLocation(lineIdx) {
  if (gMeme.lines[lineIdx].x === null) {
    var location
    switch (lineIdx) {
      case 0:
        location = { x: 20, y: 40 }
        break
      case 1:
        location = { x: 20, y: gElCanvas.height - 20 }
        break
      default:
        location = { x: 20, y: gElCanvas.height / 2 }
    }
    _setLineLocation(location)
    return location

  } else {

    const line = gMeme.lines[lineIdx]
    return { x: line.x, y: line.y }
  }
}

function _setLineLocation({ x, y }) {
  const currLine = gMeme.lines[gMeme.selectedLineIdx]
  currLine.x = x
  currLine.y = y
}

function setLineWidth(width) {
  gMeme.lines[gMeme.selectedLineIdx].width = width
}

function isLineClicked(pos) {
  const { x, y } = pos
  const clickedLineIdx = gMeme.lines.findIndex((line) => {
    return (
      line.txt && (x >= line.x && x <= line.x + line.width && y >= line.y - line.size && y <= line.y)
    )
  })
  return clickedLineIdx
}

function selectLine(lineIdx) {
  gMeme.selectedLineIdx = lineIdx
}

function changeFontFamily(newFontFamily) {
  gMeme.fontFamily = newFontFamily
}

function getFontFamily() {
  return gMeme.fontFamily
}

function changeTxtAlign(alignDir) {
  gMeme.textAlign = alignDir
}

function getTxtAlignment() {
  return gMeme.textAlign
}

function moveVertically(diff) {
  gMeme.lines[gMeme.selectedLineIdx].y += diff
}

function removeLine() {
  gMeme.lines.splice([gMeme.selectedLineIdx], 1)
  gMeme.selectedLineIdx = 0
}

function randomizeMeme() {
  setImg(getRandomIntInclusive(0, gImgs.length - 1))
  resetMeme()
  gMeme.lines[gMeme.selectedLineIdx].txt = generateSentence(4)
}

function getCanvasAsDataUrl() {
  return gElCanvas.toDataURL('image/jpeg')
}

function addUserImg(url) {
  const newImg = _createImg(url)
  gImgs.push(newImg)

  setImg(newImg.id)
  // renderMeme() //TODO just for testing - move to a controller
  handleSectionChange('editor')
  updateSavedMemes()
}

function _createImg(url) {
  return {
    id: gImgs.length + 1,
    url,
  }
}

function moveLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].x += dx
  gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function changeTxtColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeOutlineColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].outline = color
}

function changeFontSize(diff) {
  const currFontSize = gMeme.lines[gMeme.selectedLineIdx].size
  gMeme.lines[gMeme.selectedLineIdx].size = currFontSize + diff <= 0 ? currFontSize : currFontSize + diff
}

function getKeywords() {
  return gKeywordSearchCountMap
}

function increaseKeywordCount(keyword) {
  return gKeywordSearchCountMap[keyword] += 1
}