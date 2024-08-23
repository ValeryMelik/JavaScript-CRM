import { el, setChildren } from 'redom';

const DIV = 'div';

export function parseDatetime(datetime) {
  const dt = new Date(datetime);

  let year = dt.getFullYear();

  let month = dt.getMonth() + 1;
  if (month < 10) month = '0' + month;

  let day = dt.getDate();
  if (day < 10) day = '0' + day;

  let hour = dt.getHours();
  if (hour < 10) hour = '0' + hour;

  let minute = dt.getMinutes();
  if (minute < 10) minute = '0' + minute;

  return {
    date: `${day}.${month}.${year}`,
    time: `${hour}:${minute}`,
  };
}

export function parseContacts(contacts) {
  const TOOLTIP = 'tooltip';

  const arr = [];

  contacts.forEach((contact) => {
    const icon = el(DIV, {
      class: 'contacts__icon ' + TOOLTIP,
    });

    const tooltipText = el(DIV, {
      class: `${TOOLTIP}__text ${TOOLTIP}__text_debug`,
    });
    const tooltipLink = el('a', contact.value, {
      href: defineContactInfo(contact, false),
      ['data-name']: contact.type,
      class: 'link-reset ' + TOOLTIP + '__link',
    });

    setChildren(tooltipText, tooltipLink);

    tooltipText.innerHTML += `<svg class="svg-reset ${TOOLTIP}__rectanglesvg">
        <use xlink:href="img/sprite.svg#rectanglesvg"></use>
      </svg>`;

    setChildren(icon, tooltipText);

    icon.innerHTML += defineContactInfo(contact);

    arr.push(icon);
  });

  hideContacts(arr);

  return arr;
}

function hideContacts(container) {
  let counter = 0;

  if (container.length > 5) {
    container.forEach((contact, index) => {
      if (index >= 4) {
        contact.classList.add('appearance');
        contact.style.display = 'none';

        counter++;
      }
    });

    const btn = el('button', '+' + counter, {
      class: 'contacts__counter',
      onclick() {
        Array.prototype.forEach.call(btn.parentElement.children, (contact) => {
          contact.style.display = 'block';
        });
        btn.style.display = 'none';
      },
    });

    container.push(btn);
  }
}

export function defineContactInfo(contact, flag = true) {
  const key = contact.type;
  const value = contact.value;

  let icon = null;
  let href = null;

  switch (key) {
    case 'phone':
      icon = 'phonesvg';
      href = `tel:${value.replace(/(\s|\-|\(|\))/gim, '')}`;
      break;
    case 'email':
      icon = 'mailsvg';
      href = `mailto:${value}`;
      break;
    case 'vk':
      icon = 'vksvg';
      href = `https://vk.${value}`;
      break;
    case 'fb':
      icon = 'fbsvg';
      href = `https://www.${value}`;
      break;
    case 'other':
      icon = 'personsvg';
      href = '#';
      break;
  }

  return flag ? addSVG('contacts', icon) : href;
}

export function addSVG(className, svgName) {
  return `<svg class="svg-reset ${className}__svg ${svgName}">
            <use xlink:href="img/sprite.svg#${svgName}"></use>
          </svg>`;
}

export function addSVG2(className, svgName) {
  const svg = el('svg', { class: `svg-reset ${className}__svg ${svgName}` });
  const use = el('use', { ['xlink:href']: `img/sprite.svg#${svgName}` });
  setChildren(svg, use);

  return svg;
}
