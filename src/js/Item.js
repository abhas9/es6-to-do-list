var Utils = require('./Utils.js');
var Status = require('./Status.js');

var Item = class {
  constructor(title, date = new Date(), status = Status.PENDING) {
    this.id = Utils.guid();
    this.title = title;
    this.date = date;
    this.status = status;
  }
  render() {
    return `<li class="item" data-id="${this.id}" data-status="${this.status}">
              <div><input type="checkbox" ${(this.status === Status.COMPLETE)? checked : ""} /></div>
              ${this.title}
              <div>${this.date}</div>
              <div class="delete btn">[X]</div>
            </li>`
  }
}

module.exports = Item;