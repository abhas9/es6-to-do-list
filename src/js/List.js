var Utils = require('./Utils.js');
var Status = require('./Status.js');

var List = class {
  constructor(title = "", items = [], isEditable = true, id = "") {
    this.id = (id) ? id : Utils.guid() ;
    this.title = title;
    this.items = items;
    this.isEditable = isEditable;
  }
  render() {
    var html = `<div class="list" data-id="${this.id}" data-isEditable="${this.isEditable}">
                  <h2 class="list-title">${this.title}</h2>
                  <ul>`;
    this.items.forEach(function (item) {
      html += item.render();
    });
    html += `
                </ul>
                ${(this.isEditable)? "<div class='btn' data-action='add-item'>[+] Add Item</div>" : ""}
            </div>`;
    return html;
  }
  getItemById(id) {
    let item = this.items.filter(i => i.id === id);
    return ((item.length)? item[0] : null);
  }
  add(item) {
    this.items.push(item);
  }
  remove(item) {
    this.items = this.items.filter(i => (i.id !== item.id));
  }
}

module.exports = List;