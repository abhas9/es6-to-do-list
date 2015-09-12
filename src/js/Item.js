var Utils = require('./Utils.js');
var Status = require('./Status.js');

var Item = class {
  constructor(title, date = new Date(), status = Status.PENDING) {
    this.id = Utils.guid();
    this.title = title;
    this.date = date;
    this.status = status;
  }
}

module.exports = Item;