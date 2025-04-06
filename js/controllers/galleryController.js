'use strict'

function renderGallery() {
  const imgs = getImgs()

  const uploadImgHTML = `<article><input class="input-img-upload" type="file" onchange="onImgInput(event)" accept=".jpg, .jpeg, .png, .webp" hidden></input><button onclick="onUploadClick()" class="btn btn-upload-img flex-column justify-space-evenly"><span class="upload-icon"><i class="fa-solid fa-upload"></span></i>Upload your own</button></article>`
  renderKeywords()

  var strHTMLs = imgs.map(img => `<article><img onclick="onImgSelect(${img.id})" src="img/${img.id}.jpg"></article>`)

  document.querySelector('.gallery').innerHTML = uploadImgHTML + strHTMLs.join('')
}

function renderKeywords() {
  const keywords = getKeywords()
  const keys = Object.keys(keywords)
  const values = Object.values(keywords)

  var strHTML = '<button onclick="onClearFilter()" class="keyword-btn keyword-all">All</button>'

  for (var i = 0; i < keys.length; i++) {
    strHTML += `<button class="keyword-btn keyword-${keys[i]}" onclick="onSearchKeyword('${keys[i]}')" style="font-size:${limitFontSize(values[i])}px">${keys[i]}</button>`
  }

  document.querySelector('.keywords-search-bar').innerHTML = strHTML
}

function limitFontSize(searchCount) {
  return searchCount >= 13 ? 40 : 14 + (searchCount * 2)
}

function onSearchKeyword(keyword) {
  const searchCount = increaseKeywordCount(keyword)
  console.log('searchCount:', searchCount)
  document.querySelector(`.keyword-${keyword}`).style.fontSize = limitFontSize(searchCount) + 'px'
  onFilterBy(keyword)
}

function onImgSelect(imgId) {
  setImg(imgId)
  resetMeme()
  handleSectionChange('editor')
}

function onRandomizeMeme() {
  randomizeMeme()
  handleSectionChange('editor')
}

function onFilterBy(filterBy) {
  console.log('filterBy:', filterBy)
  const searchBar = document.querySelector('.search-container input')
  const clearBtn = document.querySelector('.search-container .btn')
  if (searchBar.value) {
    clearBtn.classList.remove('hidden')
  } else {
    clearBtn.classList.add('hidden')
  }
  setFilterBy(filterBy)

  const filter = getFilterBy().toLowerCase()
  const keywords = getKeywords()

  if (keywords[filter]) {
    increaseKeywordCount(filter)
    renderKeywords()
  }
  renderGallery()
}

function onClearFilter() {
  document.querySelector('#filter-by').value = ''
  onFilterBy('')
  renderGallery()
}

function onUploadClick() {
  document.querySelector('.input-img-upload').click()
}

function onImgInput(ev) {
  // loadImageFromInput(ev, renderImg)
  loadImageFromInput(ev, addUserImg)
}

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()
  // TODO: move to right place
  gMeme.selectedImgId = null

  reader.onload = (event) => {
    const img = new Image()
    img.src = event.target.result

    img.onload = () => {
      onImageReady(img.src)
      // onImageReady(img)

    }
  }
  reader.readAsDataURL(ev.target.files[0])
}

// function renderImg(img) {
//   gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
//   gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
//   renderMeme()
// }
