/******/ (() => { // webpackBootstrap
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('checklistModal');
  var openBtn = document.querySelector('.checklist-open-btn');
  if (!modal || !openBtn) return;
  var closeBtn = modal.querySelector('.checklist-modal-close');
  var overlay = modal.querySelector('.checklist-modal-overlay');
  function openModal(event) {
    event.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeModal();
  });
});
/******/ })()
;