var Utils = require('./Utils.js');
var Status = require('./Status.js');

var List = class {
  constructor(title = "", items = [], isDeletable = false) {
    this.id = Utils.guid();
    this.title = title;
    this.items = items;
    this.isDeletable = isDeletable;
  }
  render() {
    var html = `<div class="list" data-id="${this.id}" data-isDeletable="${this.isDeletable}">
                  <h2>${this.title}</h2>
                  <ul>`;
    this.items.forEach(function (item) {
      html += item.render();
    });
    html += `
                </ul>
                <div class="btn" data-action="add-item">[+] Add Item</div>
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