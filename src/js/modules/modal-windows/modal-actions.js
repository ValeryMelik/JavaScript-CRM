import {
  modalWindow,
  form,
  closeBtn,
  errorwin,
  reloadBtn,
} from './modal-elements.js';
import { clearForm } from './modal-clearing.js';
import { toggleErorWin } from './modal-showing.js';
import { removeActiveCls } from '../DOM/DOM-contact.js';

errorwin.addEventListener('click', (event) => {
  event._isModalClick = true;
});

form.addEventListener('click', (event) => {
  if (!errorwin.classList.contains('errorwin_active'))
    event._isModalClick = true;
});

closeBtn.addEventListener('click', clearForm);

document.addEventListener('keydown', (event) => {
  if (!event._isClick) removeActiveCls();
  if (event.code == 'Escape') clearForm();
});

reloadBtn.addEventListener('click', () => {
  location.reload();
});

modalWindow.addEventListener('click', (event) => {
  if (!event._isModalClick) {
    clearForm();
    toggleErorWin(false);
  }
});
