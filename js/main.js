(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Item = require('./Item.js');
var List = require('./List.js');
var Utils = require('./Utils.js');

var App = (function () {
  function App() {
    var lists = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var pastDueList = arguments.length <= 1 || arguments[1] === undefined ? new List("Past Due", [], false) : arguments[1];

    _classCallCheck(this, App);

    this.lists = lists;
    this.pastDueList = pastDueList;
  }

  _createClass(App, [{
    key: 'getListById',
    value: function getListById(id) {
      var list = this.lists.filter(function (l) {
        return l.id === id;
      });
      return list.length ? list[0] : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var html = '<div class="app">\n  \t\t\t\t\t<div class="btn" data-action="add-list">[+] Add List</div>\n  \t\t\t\t';
      this.lists.forEach(function (list) {
        html += list.render();
      });
      html += this.pastDueList.render();
      html += '</div>';
      return html;
    }
  }, {
    key: 'add',
    value: function add(list) {
      this.lists.push(list);
    }
  }, {
    key: 'remove',
    value: function remove(list) {
      this.list = this.lists.filter(function (l) {
        return l.id !== list.id;
      });
    }
  }]);

  return App;
})();

module.exports = App;

},{"./Item.js":2,"./List.js":3,"./Utils.js":5}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Utils = require('./Utils.js');
var Status = require('./Status.js');

var Item = (function () {
  function Item() {
    var title = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var date = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
    var status = arguments.length <= 2 || arguments[2] === undefined ? Status.PENDING : arguments[2];

    _classCallCheck(this, Item);

    this.id = Utils.guid();
    this.title = title;
    this.date = date;
    this.status = status;
  }

  _createClass(Item, [{
    key: 'render',
    value: function render() {
      return '<li class="item" data-id="' + this.id + '" data-status="' + this.status + '">\n              <div><input type="checkbox" class="status-input" ' + (this.status === Status.COMPLETE ? "checked" : "") + ' /></div>\n              <div class="item-title">' + this.title + '</div>\n              <div>' + (this.date ? "<input type='date' class='item-date' value='" + this.date + "' />" : "<div class='btn' data-action='add-date'>[+] Add Date</div></div>") + ' \n              <div class="btn" data-action="delete-item">[X] Delete item</div>\n            </li>';
    }
  }]);

  return Item;
})();

module.exports = Item;

},{"./Status.js":4,"./Utils.js":5}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Utils = require('./Utils.js');
var Status = require('./Status.js');

var List = (function () {
  function List() {
    var title = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var items = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    var isEditable = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

    _classCallCheck(this, List);

    this.id = Utils.guid();
    this.title = title;
    this.items = items;
    this.isEditable = isEditable;
  }

  _createClass(List, [{
    key: 'render',
    value: function render() {
      var html = '<div class="list" data-id="' + this.id + '" data-isEditable="' + this.isEditable + '">\n                  <h2 class="list-title">' + this.title + '</h2>\n                  <ul>';
      this.items.forEach(function (item) {
        html += item.render();
      });
      html += '\n                </ul>\n                ' + (this.isEditable ? "<div class='btn' data-action='add-item'>[+] Add Item</div>" : "") + '\n            </div>';
      return html;
    }
  }, {
    key: 'getItemById',
    value: function getItemById(id) {
      var item = this.items.filter(function (i) {
        return i.id === id;
      });
      return item.length ? item[0] : null;
    }
  }, {
    key: 'add',
    value: function add(item) {
      this.items.push(item);
    }
  }, {
    key: 'remove',
    value: function remove(item) {
      this.items = this.items.filter(function (i) {
        return i.id !== item.id;
      });
    }
  }]);

  return List;
})();

module.exports = List;

},{"./Status.js":4,"./Utils.js":5}],4:[function(require,module,exports){
"use strict";

module.exports = {
	PENDING: 0,
	COMPLETE: 1
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = {
	guid: function guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	},
	getParents: function getParents(elem, selector) {
		var parents = [];
		if (selector) {
			var firstChar = selector.charAt(0);
		}
		for (; elem && elem !== document; elem = elem.parentNode) {
			if (selector) {
				if (firstChar === '.') {
					if (elem.classList.contains(selector.substr(1))) {
						parents.push(elem);
					}
				}
				if (firstChar === '#') {
					if (elem.id === selector.substr(1)) {
						parents.push(elem);
					}
				}
				if (elem.tagName.toLowerCase() === selector) {
					parents.push(elem);
				}
			} else {
				parents.push(elem);
			}
		}
		if (parents.length === 0) {
			return null;
		} else {
			return parents;
		}
	},
	formatDate: function formatDate(date) {
		var dd = date.getDate();
		var mm = date.getMonth() + 1; //January is 0

		var yyyy = date.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		return yyyy + '-' + mm + '-' + dd;
	}

};

},{}],6:[function(require,module,exports){
'use strict';

var Item = require('./Item.js');
var Status = require('./Status.js');
var List = require('./List.js');
var Utils = require('./Utils.js');
var App = require('./App.js');
var Status = require('./Status.js');

var app = new App();

document.addEventListener("DOMContentLoaded", ready, false);

function ready() {
	getAppFromModel();
	drawDom();
}

function buttonClicked(event) {
	var action = event.target.dataset.action;
	switch (action) {
		case "add-list":
			{
				var _list = new List("New Empty List");
				app.add(_list);
				drawDom();
				break;
			}
		case "add-item":
			{
				var listId = Utils.getParents(event.target, ".list")[0].dataset.id;
				var _list2 = app.getListById(listId);
				var item = new Item("New Item");
				_list2.add(item);
				drawDom();
				break;
			}
		case "delete-item":
			{
				var itemId = Utils.getParents(event.target, ".item")[0].dataset.id;
				var listId = Utils.getParents(event.target, ".list")[0].dataset.id;
				var _list3 = app.getListById(listId);
				var item = _list3.getItemById(itemId);
				_list3.remove(item);
				drawDom();
				break;
			}
		case "add-date":
			{
				var itemId = Utils.getParents(event.target, ".item")[0].dataset.id;
				var listId = Utils.getParents(event.target, ".list")[0].dataset.id;
				var _list4 = app.getListById(listId);
				var item = _list4.getItemById(itemId);
				var date = new Date();
				date.setDate(date.getDate() + 1);
				item.date = Utils.formatDate(date);
				drawDom();
				break;
			}

	}
}

function statusChanged(event) {
	var itemId = Utils.getParents(event.target, ".item")[0].dataset.id;
	var item = list.getItemById(itemId);
	item.status = event.target.checked ? Status.COMPLETE : Status.PENDING;
	updateLocalStorage();
}

function listTitleInput(event) {
	var listId = Utils.getParents(event.target, ".list")[0].dataset.id;
	var list = app.getListById(listId);
	list.title = event.target.textContent ? event.target.textContent : 'Enter titile';
	updateLocalStorage();
}

function itemTitleInput(event) {
	var itemId = Utils.getParents(event.target, ".item")[0].dataset.id;
	var listId = Utils.getParents(event.target, ".list")[0].dataset.id;
	var list = app.getListById(listId);
	var item = list.getItemById(itemId);
	item.title = event.target.textContent ? event.target.textContent : 'Enter titile';
	updateLocalStorage();
}

function itemDateChanged(event) {
	var itemId = Utils.getParents(event.target, ".item")[0].dataset.id;
	var listId = Utils.getParents(event.target, ".list")[0].dataset.id;
	var list = app.getListById(listId);
	var item = list.getItemById(itemId);
	if (event.target.value) {
		item.date = event.target.value;
	} else {
		item.date = "";
		drawDom();
	}
	updateLocalStorage();
}

function drawDom() {
	//TO-DO: REFRACTOR
	updateLocalStorage();
	document.body.innerHTML = app.render();
	var buttons = document.getElementsByClassName("btn");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', buttonClicked);
	}
	var statusInputs = document.getElementsByClassName("status-input");
	for (var i = 0; i < statusInputs.length; i++) {
		statusInputs[i].addEventListener('change', statusChanged);
	}
	var listTitles = document.getElementsByClassName("list-title");
	for (var i = 0; i < listTitles.length; i++) {
		listTitles[i].setAttribute("contenteditable", true);
		listTitles[i].addEventListener('input', listTitleInput);
	}
	var itemTitles = document.getElementsByClassName("item-title");
	for (var i = 0; i < itemTitles.length; i++) {
		itemTitles[i].setAttribute("contenteditable", true);
		itemTitles[i].addEventListener('input', itemTitleInput);
	}
	var itemDates = document.getElementsByClassName("item-date");
	for (var i = 0; i < itemDates.length; i++) {
		itemDates[i].addEventListener('change', itemDateChanged);
	}
}

function getAppFromModel() {
	if (localStorage.getItem("appmodel")) {
		var appModel = JSON.parse(localStorage.getItem("appmodel"));
		appModel.lists.forEach(function (list) {
			var items = [];
			list.items.forEach(function (item) {
				items.push(new Item(item.title, item.date, item.status));
			});
			app.add(new List(list.title, items, list.isEditable));
		});
	}
}

function updateLocalStorage() {
	localStorage.setItem("appmodel", JSON.stringify(app));
}

},{"./App.js":1,"./Item.js":2,"./List.js":3,"./Status.js":4,"./Utils.js":5}]},{},[6]);
