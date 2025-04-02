'use strict'

var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['politics', 'trump', 'president'] },
  { id: 2, url: 'img/2.jpg', keywords: ['puppy', 'funny', 'animals'] },
  { id: 3, url: 'img/3.jpg', keywords: ['puppy', 'funny', 'animals', 'baby', 'sleep'] },
]

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      color: 'red'
    }
  ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImgById(imgId) {
  return gImgs.find(img => img.id === imgId)
}