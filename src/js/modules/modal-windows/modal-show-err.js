import { errwinCapture, tryBtn, form, MODAL } from './modal-elements.js';
import { toggleErorWin, toggleModalWindow } from './modal-showing.js';

export function showError({ status, name, message }, fn) {
  const isFormOpened = form.classList.contains(MODAL + '__formwin_active');

  if (!isFormOpened) toggleModalWindow();

  toggleErorWin();

  errwinCapture.textContent = status
    ? `Код ошибки: ${status}`
    : `Тип ошибки: "${name}" (${message})`;

  tryBtn.addEventListener(
    'click',
    () => {
      toggleErorWin(false);
      if (!isFormOpened) toggleModalWindow(false);
      setTimeout(fn.bind(null, event), 300);
    },
    { once: true }
  );

  return false;
}
