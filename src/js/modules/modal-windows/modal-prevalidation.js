export function preCorrectValue() {
  let name = this.value.trim();
  name = name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
  name = hyphenAndSpaceUpper('-', name);
  name = hyphenAndSpaceUpper(' ', name);
  this.value = name;
}

function hyphenAndSpaceUpper(whatToUp, name) {
  if (!name.includes(whatToUp)) return name;
  return name
    .split(whatToUp)
    .map(
      (elem) => elem.substr(0, 1).toUpperCase() + elem.substr(1).toLowerCase()
    )
    .join(whatToUp);
}