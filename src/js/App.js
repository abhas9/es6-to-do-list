var Item = require('./Item.js');
var List = require('./List.js');
var Utils = require('./Utils.js');

var App = class {
	constructor(lists = []) {
	   this.lists = lists;
  }
  getDueItems() {
    let dueItems = [];
    this.lists.forEach(function(list){
      let items = [];
      list.items.forEach(function(item) {
        if (item.date && Utils.dateDiffInDays(new Date(item.date), new Date()) > 0) {
          dueItems.push(item);
        }
      });
    });
    return dueItems;
  }
  getItemById(id) {
    let tmpItem = null;
    this.lists.forEach(function(list){
      let items = [];
      tmpItem = list.items.filter(i => i.id === id);
      if (tmpItem.length) {
        tmpItem = tmpItem[0];
        return;
      } else {
        tmpItem = null;
      }
    });
    return tmpItem;
  }
  getListById(id) {
  	let list = this.lists.filter(l => l.id === id);
  	return ((list.length)? list[0] : null);
  }
  render() {
    let pastDueList = new List("Past Due", this.getDueItems(), false);
  	let html = `<div class="app">
  					<div class="btn" data-action="add-list">[+] Add List</div>
  				`;
  	this.lists.forEach(function (list) {
      html += list.render();
    });
    html += pastDueList.render();
    html += '</div>';
    return html;
  }
  add(list) {
    this.lists.push(list);
  }
  remove(list) {
    this.lists = this.lists.filter(l => (l.id !== list.id));
  }
}

module.exports = App;