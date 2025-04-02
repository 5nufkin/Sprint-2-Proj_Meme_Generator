'use strict'

var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['politics', 'trump', 'president','angry'] },
  { id: 2, url: 'img/2.jpg', keywords: ['puppy', 'funny', 'animals'] },
  { id: 3, url: 'img/3.jpg', keywords: ['puppy', 'funny', 'animals', 'baby', 'sleep'] },
  { id: 4, url: 'img/4.jpg', keywords: ['cat', 'laptop', 'animals', 'sleep'] },
  { id: 5, url: 'img/5.jpg', keywords: ['success', 'baby', 'yes'] },
  { id: 6, url: 'img/6.jpg', keywords: ['explain', 'funny', 'history', 'professor', 'crazy'] },
  { id: 7, url: 'img/7.jpg', keywords: ['surprise', 'funny', 'baby', 'shocked'] },
  { id: 8, url: 'img/8.jpg', keywords: ['magic', 'funny', 'purple', 'bowtie', 'smile'] },
  { id: 9, url: 'img/9.jpg', keywords: ['smile', 'funny', 'asian', 'baby', 'little'] },
  { id: 10, url: 'img/10.jpg', keywords: ['politics', 'funny', 'laugh', 'obama', 'president'] },
  { id: 11, url: 'img/11.jpg', keywords: ['sports', 'funny', 'kiss', 'angry', 'nba','basketball'] },
  { id: 12, url: 'img/12.jpg', keywords: ['israeli', 'funny', 'pointing', 'glasses', 'crime','law'] },
  { id: 13, url: 'img/13.jpg', keywords: ['dicaprio', 'leonardo', 'viral', 'toast', 'funny','smile','movie'] },
  { id: 14, url: 'img/14.jpg', keywords: ['matrix', 'funny', 'glasses', 'viral', 'movie'] },
  { id: 15, url: 'img/15.jpg', keywords: ['zero', 'funny', 'movie', 'actor','viral'] },
  { id: 16, url: 'img/16.jpg', keywords: ['movie', 'funny', 'viral', 'laugh', 'actor'] },
  { id: 17, url: 'img/17.jpg', keywords: ['putin', 'funny', 'russia', 'president', 'politics'] },
  { id: 18, url: 'img/18.jpg', keywords: ['movie', 'funny', 'cartoon', 'buzz', 'woody','toys'] },
]

var gMeme = {
  selectedImgId: 3,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      color: 'steelblue'
    }
  ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImgById(imgId) {
  var img = gImgs.find(img => img.id === imgId)
  return img
}

function getMeme() {
  return gMeme
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
  renderMeme()
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}