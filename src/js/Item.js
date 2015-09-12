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
    return `<li data-id="${this.id}" data-status="${this.status}">
              ${this.title}
              <span>${this.date}</span>
            </li>`
  }
}

module.exports = Item;