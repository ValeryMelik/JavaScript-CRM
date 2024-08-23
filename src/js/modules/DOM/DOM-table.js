import { el } from 'redom';
import { getClientList } from '../API/API';
import { addNewRow } from './DOM-row';

export const tbody = document.getElementById('tbody');
const datalist = document.querySelector('.header__datalist');

export function reFreshTable(newTable) {
  clearElem();

  newTable.forEach((row) => {
    tbody.append(row);
  });
}

export async function reCreateTable(clientList = null) {
  if (!clientList)
    clientList = await getClientList(reCreateTable.bind(null, null));

  if (clientList) {
    clearElem();
    clearElem(datalist);

    clientList.forEach((client) => {
      addNewRow(client);
      createOptionList(client);
    });
  }
}

function createOptionList(newclient) {
  const snl =
    newclient.surname + ' ' + newclient.name + ' ' + newclient.lastName;

  const option = el('option', { value: snl });

  datalist.append(option);
}

function clearElem(elem = tbody) {
  const oldTable = elem.children;
  while (oldTable.length > 0) oldTable[0].remove();
}
