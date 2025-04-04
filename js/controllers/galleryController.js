'use strict'

function renderGallery() {
  const imgs = getImgs()

  const uploadImgHTML = `<article><input class="input-img-upload" type="file" onchange="onImgInput(event)" accept=".jpg, .jpeg, .png, .webp" hidden></input><button onclick="onUploadClick()" class="btn btn-upload-img flex-column justify-space-evenly"><span class="upload-icon"><i class="fa-solid fa-upload"></span></i>Upload your own</button></article>`

  var strHTMLs = imgs.map(img => `<article><img onclick="onImgSelect(${img.id})" src="img/${img.id}.jpg"></article>`)
  
  document.querySelector('.gallery').innerHTML = uploadImgHTML + strHTMLs.join('')
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

function onFilterBy(filter) {
  setFilterBy(filter)
  // const imgsFilteredBy = filterBy(filter)
  renderGallery()
}

function onClearFilter() {
  document.querySelector('#filter-by').value = ''
  setFilterBy('')
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
