'use strict'

var gFilterBy = ''

function setFilterBy(filter) {
  gFilterBy = filter
}

function getFilterBy() {
  return gFilterBy
}

function getImgs() {
  if (!gFilterBy) return gImgs
  return gImgs.filter(img => img.keywords.join('').toLowerCase().includes(gFilterBy.toLowerCase()))
}