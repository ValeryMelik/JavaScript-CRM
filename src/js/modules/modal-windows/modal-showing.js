import { MODAL, modalWindow, form, errorwin, wall } from './modal-elements.js';

export function toggleModalWindow(show = true) {
  modalWindow.classList.toggle(MODAL + '_active', show);
  document.body.classList.toggle('stop-scroll', show);
}

export function toggleErorWin(show = true) {
  wall.classList.toggle('modal__wall_active', show);
  setTimeout(() => {
    errorwin.classList.toggle('errorwin' + '_active', show);
  }, 100);
}

export function toggleModalForm(show = true) {
  setTimeout(() => {
    form.classList.toggle(MODAL + '__formwin' + '_active', show);
  }, 100);
}
