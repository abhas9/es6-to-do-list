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
    var html = `<div class="list" data-id="${this.id}" data-iseditable="${this.isEditable}">
                  <h2 class="list-title">${this.title}</h2>
                  ${(this.isEditable)? '<div class="btn delete-list danger" data-action="delete-list">X</div>' : ''}
                  <ul class="items">`;
    this.items.forEach(function (item) {
      html += item.render();
    });
    html += `
                </ul>
                ${(this.isEditable)? '<div class="btn add-item success" data-action="add-item">Add Item</div>' : ""}
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