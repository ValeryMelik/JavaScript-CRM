export const MODAL = 'modal';
export const ERRORWIN = 'errorwin';

export const modalWindow = document.querySelector('.' + MODAL);
export const form = document.querySelector('.' + MODAL + '__formwin');
export const title = document.querySelector('.' + MODAL + '__title');

export const addClientBtn = document.querySelector('.mbtn');

export const inputSurname = document.querySelector(
  '.' + MODAL + '__input[name="surname"]'
);
export const inputName = document.querySelector(
  '.' + MODAL + '__input[name="name"]'
);
export const inputLastname = document.querySelector(
  '.' + MODAL + '__input[name="lastName"]'
);

export const addContactBlock = document.querySelector('.' + MODAL + '__addbl');
export const addContactBtn = document.querySelector(
  '.' + MODAL + ' .addbl__btn'
);

export const errorbl = document.querySelector('.' + MODAL + '__errorbl');
export const list = document.querySelector('.' + MODAL + ' .addbl__list');

export const saveBtn = document.querySelector('.' + MODAL + ' .prmbl__sbtn');
export const capture = document.querySelector('.' + MODAL + ' .prmbl__capture');
export const closeBtn = document.querySelector('.' + MODAL + '__bclose');
export const cancelBtn = document.querySelector('.' + MODAL + ' .prmbl__cbtn');

export const errorwin = document.querySelector('.' + ERRORWIN);
export const errwinCapture = document.querySelector(
  '.' + ERRORWIN + '__capture'
);
export const wall = document.querySelector('.' + MODAL + '__wall');
export const reloadBtn = errorwin.querySelectorAll('.' + ERRORWIN + '__btn')[0];
export const tryBtn = errorwin.querySelectorAll('.' + ERRORWIN + '__btn')[1];
