import { tbody, reFreshTable } from '../DOM/DOM-table.js';

import { thArr } from './table-elements.js';

thArr.forEach((btn) => btn.addEventListener('click', sort));

function sort() {
  resetSorting(this);

  const arr = [...tbody.children];

  const id = this.id;

  const compareFn = {
    asc: (a, b) => (defineProperty(a, id) > defineProperty(b, id) ? 1 : -1),
    desc: (a, b) => (defineProperty(a, id) < defineProperty(b, id) ? 1 : -1),
  };

  if (this.dataset.order === 'asc') {
    this.dataset.order = 'desc';
    arr.sort(compareFn.desc);
  } else {
    this.dataset.order = 'asc';
    arr.sort(compareFn.asc);
  }

  reFreshTable(arr);
}

function resetSorting(elem) {
  thArr.forEach((btn) => {
    if (btn !== elem) btn.dataset.order = 'none';
  });
}

function defineProperty(row, id) {
  return row.querySelector(`[data-${id}]`).dataset[id];
}
