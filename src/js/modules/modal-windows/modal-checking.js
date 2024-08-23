import {
  inputSurname,
  inputName,
  inputLastname,
  saveBtn,
} from './modal-elements.js';

import { checkForm } from './modal-validation.js';
import { preCorrectValue } from './modal-prevalidation.js';

[inputSurname, inputName, inputLastname].forEach((input) => {
  input.addEventListener('blur', preCorrectValue);
  input.addEventListener('input', checkForm);
});
