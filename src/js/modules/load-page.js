import { reCreateTable } from './DOM/DOM-table.js';
import { animateLabels } from './animation/move-labels.js';

window.addEventListener('load', () => {
  document.body.style = '';
});

animateLabels();

reCreateTable();
