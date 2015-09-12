var Item = require('./Item.js');
var List = require('./List.js');
var Utils = require('./Utils.js');

var App = class {
	constructor(lists = []) {
	   this.lists = lists;
  }
  getListById(id) {
  	let list = this.lists.filter(l => l.id === id);
  	return ((list.length)? list[0] : null);
  }
  render() {
  	var html = `<div class="app">
  					<div class="btn" data-action="add-list">[+] Add List</div>
  				`;
  	this.lists.forEach(function (list) {
      html += list.render();
    });
    html += '</div>';
    return html;
  }
  add(list) {
    this.lists.push(list);
  }
  remove(list) {
    this.list = this.lists.filter(l => (l.id !== list.id));
  }
}

module.exports = App;