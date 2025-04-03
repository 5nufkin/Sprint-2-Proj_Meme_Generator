'use strict'

function handleSectionChange(toReveal) {
  document.querySelectorAll('.app-section').forEach(elSection => elSection.classList.add('hidden'))
  document.querySelector(`.${toReveal}`).classList.remove('hidden')
  // if (toReveal === 'saved-memes') renderSavedMemes()
  switch (toReveal) {
    case 'saved-memes':
      renderSavedMemes()
      break
    case 'editor':
      resizeCanvas()
      renderMeme()
      break
    case 'gallery-container':
      renderGallery()
  }
}