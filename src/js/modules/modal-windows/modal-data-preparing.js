import { inputSurname, inputName, inputLastname } from './modal-elements.js';

export class ClientForPost {
  surname = inputSurname.value;
  name = inputName.value;
  lastName = inputLastname.value;
  contacts = [...document.querySelectorAll('.addbl__list input')].map(
    (input) => ({
      type: input.parentElement.querySelector('.select__item_selected').dataset
        .name,
      value: input.value,
    })
  );
}
