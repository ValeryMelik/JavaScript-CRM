import { el, setChildren } from 'redom';

import { tbody } from './DOM-table.js';
import {
  parseDatetime,
  parseContacts,
  addSVG,
  addSVG2,
} from './DOM-helpers.js';

import { changeClientInfo } from '../modal-windows/changecl-window/cc-opening.js';
import { removeClientInfo } from '../modal-windows/removecl-window/rc-opening.js';

const TBODY = 'tbody';
const TBODY__ITEM = 'tbody__item'; 
const TD = 'td';
const DIV = 'div';
const SPAN = 'span';

const DATETIME = 'datetime';
const SPINNER = 'spinner';

export function addNewRow(newclient) {
  const row = createRow(newclient);
  tbody.append(row);
}

function createRow({
  id,
  surname,
  name,
  lastName,
  createdAt,
  updatedAt,
  contacts,
}) {
  const row = el('tr', { class: TBODY + '__row', id: id });

  const itemID = createIdItem(id);
  const itemSNL = createSNLItem(surname, name, lastName);
  const itemCreatedAt = createCreatedAtItem(createdAt);
  const itemUpdatedAt = createUpdatedAtItem(updatedAt);
  const itemContacts = createContactsItem(contacts);
  const itemActions = createItemActions();

  setChildren(row, [
    itemID,
    itemSNL,
    itemCreatedAt,
    itemUpdatedAt,
    itemContacts,
    itemActions,
  ]);

  return row;
}

function createIdItem(id) {
  const itemID = el(TD, { class: TBODY__ITEM });
  itemID.dataset.id = id;

  const captureID = el(SPAN, id, {
    class: TBODY + '__id',
  });
  setChildren(itemID, captureID);

  return itemID;
}

function createSNLItem(surname, name, lastName) {
  const SNL = 'SNL';

  const itemSNL = el(TD, { class: TBODY__ITEM });
  itemSNL.dataset.snl = surname + ' ' + name + ' ' + lastName;

  const captureSurname = el(SPAN, surname + ' ', {
    class: TBODY + '__' + SNL,
  });
  const captureName = el(SPAN, name + ' ', {
    class: TBODY + '__' + SNL,
  });
  const captureLastname = el(SPAN, lastName, {
    class: TBODY + '__' + SNL,
  });
  setChildren(itemSNL, [captureSurname, captureName, captureLastname]);

  return itemSNL;
}

function createCreatedAtItem(createdAt) {
  const itemCreatedAt = el(TD, {
    class: `${TBODY__ITEM} ${TBODY}__${DATETIME} ${DATETIME}`,
  });
  itemCreatedAt.dataset.created = createdAt;

  const containerCreatedAt = el(DIV, { class: DATETIME + '__container' });
  const dateCreated = el('time', parseDatetime(createdAt).date, {
    class: DATETIME + '__date',
  });
  const timeCreated = el('time', parseDatetime(createdAt).time, {
    class: DATETIME + '__time',
  });
  setChildren(containerCreatedAt, [dateCreated, timeCreated]);
  setChildren(itemCreatedAt, containerCreatedAt);

  return itemCreatedAt;
}

function createUpdatedAtItem(updatedAt) {
  const itemUpdatedAt = el(TD, {
    class: `${TBODY__ITEM} ${TBODY}__${DATETIME} ${DATETIME}`,
  });
  itemUpdatedAt.dataset.updated = updatedAt;

  const containerUpdatedAt = el(DIV, { class: DATETIME + '__container' });
  const dateUpdated = el('time', parseDatetime(updatedAt).date, {
    class: DATETIME + '__date',
  });
  const timeUpdated = el('time', parseDatetime(updatedAt).time, {
    class: DATETIME + '__time',
  });
  setChildren(containerUpdatedAt, [dateUpdated, timeUpdated]);
  setChildren(itemUpdatedAt, containerUpdatedAt);

  return itemUpdatedAt;
}

function createContactsItem(contacts) {
  const CONTACTS = 'contacts';

  const itemContacts = el(TD, {
    class: `${TBODY__ITEM} ${TBODY}__${CONTACTS} ${CONTACTS}`,
  });
  const containerContacts = el(DIV, {
    class: CONTACTS + '__container',
  });
  setChildren(containerContacts, ...parseContacts(contacts));
  setChildren(itemContacts, containerContacts);

  return itemContacts;
}

function createItemActions() {
  const ACTIONS = 'actions';

  const itemActions = el(TD, {
    class: `${TBODY__ITEM} ${TBODY}__${ACTIONS} ${ACTIONS}`,
  });
  const containerActions = el(DIV, {
    class: ACTIONS + '__container',
  });

  const btnActionChange = createChangeActionsItem(ACTIONS);
  const btnActionRemove = createRemoveActionsItem(ACTIONS);
  setChildren(containerActions, [btnActionChange, btnActionRemove]);

  setChildren(itemActions, containerActions);

  return itemActions;
}

function createChangeActionsItem(ACTIONS) {
  const btnActionChange = el('button', {
    class: `btn-reset ${ACTIONS}__btn ${ACTIONS}__btn_change`,
    onclick: changeClientInfo,
  });

  const captureActionChange = el(SPAN, 'Изменить', {
    class: ACTIONS + '__capture',
  });
  const changeSpinner = el(SPAN, {
    class: ACTIONS + '__' + SPINNER + ' ' + SPINNER,
  });
  changeSpinner.innerHTML = addSVG(SPINNER, 'c-loadsvg');

  setChildren(btnActionChange, [changeSpinner, captureActionChange]);

  btnActionChange.innerHTML =
    addSVG(ACTIONS, 'pensvg') + btnActionChange.innerHTML;

  return btnActionChange;
}

function createRemoveActionsItem(ACTIONS) {
  const btnActionRemove = el('button', {
    class: `btn-reset ${ACTIONS}__btn ${ACTIONS}__btn_remove`,
    onclick: removeClientInfo,
  });

  const captureActionRemove = el(SPAN, 'Удалить', {
    class: ACTIONS + '__capture',
  });
  const removeSpinner = el(SPAN, {
    class: ACTIONS + '__' + SPINNER + ' ' + SPINNER,
  });
  removeSpinner.innerHTML = addSVG(SPINNER, 'r-loadsvg');

  setChildren(btnActionRemove, [removeSpinner, captureActionRemove]);

  btnActionRemove.innerHTML =
    addSVG(ACTIONS, 'removesvg') + btnActionRemove.innerHTML;

  // btnActionRemove.prepend(addSVG2(ACTIONS, 'removesvg'));

  return btnActionRemove;
}
