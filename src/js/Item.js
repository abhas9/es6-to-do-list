var Utils = require('./Utils.js');
var Status = require('./Status.js');

var Item = class {
  constructor(title  = "", date = undefined, status = Status.PENDING) {
    this.id = Utils.guid();
    this.title = title;
    this.date = date;
    this.status = status;
  }
  render() {
    return `<li class="item" data-id="${this.id}" data-status="${this.status}">
              <div><input type="checkbox" class="status-input" ${(this.status === Status.COMPLETE)? "checked" : ""} /></div>
              <div class="item-title">${this.title}</div>
              <div>${(this.date)? this.date : "" } <div class="btn" data-action="add-date">[+] Add Date</div></div>
              <div class="btn" data-action="delete-item">[X] Delete item</div>
            </li>`
  }
}

module.exports = Item;