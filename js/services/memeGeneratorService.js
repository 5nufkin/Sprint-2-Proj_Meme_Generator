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
]

var gMeme = {
  selectedImgId: null,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      color: 'steelblue',
      x: null,
      y: null
    }
  ],
  fontFamily: 'Arial',
  textAlign: 'left'
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

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
  renderMeme()
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function addLine() {
  gMeme.lines.push(_createLine())
  switchLine()
}

function _createLine() {
  return {
    txt: 'Enter Text',
    size: 20,
    color: 'steelblue',
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
    // debugger
    switch (lineIdx) {
      case 0:
        location = { x: 20, y: 20 }
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
  // debugger
  const currLine = gMeme.lines[gMeme.selectedLineIdx]
  currLine.x = x
  currLine.y = y
}

function setLineWidth(width) {
  gMeme.lines[gMeme.selectedLineIdx].width = width
}

function isLineClicked(ev) {
  const { offsetX, offsetY } = ev

  const clickedLineIdx = gMeme.lines.findIndex((line) => {
    return (
      line.txt && (offsetX >= line.x && offsetX <= line.x + line.width && offsetY >= line.y - line.size && offsetY <= line.y)
    )
  })
  return clickedLineIdx
}

function selectLine(lineIdx) {
  gMeme.selectedLineIdx = lineIdx
}

function changeFont(newFont) {
  gMeme.fontFamily = newFont
}

function getFontFamily() {
  return gMeme.fontFamily
}

function changeTxtAlign(newVal) {
  gMeme.textAlign = newVal
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