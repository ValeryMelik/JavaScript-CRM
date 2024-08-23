import { findInput } from './table-elements';
import { getClientList } from '../API/API.js';
import { reCreateTable } from '../DOM/DOM-table.js';
import { parseDatetime } from '../DOM/DOM-helpers.js';
import { tbody } from '../DOM/DOM-table.js';
import { el, setChildren } from 'redom';

findInput.addEventListener('input', findRow);

let findTimer;
async function findRow() {
  clearTimeout(findTimer);

  const arr = await getClientList();

  const value = findInput.value.toLowerCase().trim();

  const filterFn = (client) => {
    let rawString = '';

    const orderedKeyArray = [
      'id',
      'surname',
      'name',
      'lastName',
      'createdAt',
      'updatedAt',
      'contacts',
    ];

    orderedKeyArray.forEach((key) => {
      const prop = client[key];

      if (key === 'updatedAt' || key === 'createdAt') {
        const datetime = parseDatetime(prop);
        rawString += datetime.date + ' ' + datetime.time;
        rawString = rawString.trim() + ' ';
      } else if (typeof prop === 'object') {
        rawString +=
          prop.map((contact) => contact.type + ' ' + contact.value).join(' ') +
          ' ';
        rawString = rawString.trim() + ' ';
      } else rawString += prop.toLowerCase().trim() + ' ';
    });

    return rawString.trim().includes(value);
  };

  const filteredClientList = arr.filter(filterFn);

  findTimer = setTimeout(() => {
    if (filteredClientList.length === 0) {
      const row = el('tr', { class: 'tbody__row' });
      const td = el(
        'td',
        'По вашему запросу клиентов не найдено. Проверьте правильность введённых данных.',
        {
          class: 'tbody__item',
          colspan: 6,
        }
      );
      setChildren(row, td);
      setChildren(tbody, row);
    } else reCreateTable(filteredClientList);
  }, 300);
}
