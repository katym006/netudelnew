document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('checklistModal');
    const openBtn = document.querySelector('.checklist-open-btn');

    if (!modal || !openBtn) return;

    const closeBtn = modal.querySelector('.checklist-modal-close');
    const overlay = modal.querySelector('.checklist-modal-overlay');

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

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeModal();
    });
});