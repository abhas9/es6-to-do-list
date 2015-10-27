(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ListJs = require("./List.js");

var _ListJs2 = _interopRequireDefault(_ListJs);

var _UtilsJs = require("./Utils.js");

var _UtilsJs2 = _interopRequireDefault(_UtilsJs);

var _StatusJs = require("./Status.js");

var _StatusJs2 = _interopRequireDefault(_StatusJs);

var App = (function () {
    function App() {
        var lists = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        _classCallCheck(this, App);

        this.lists = lists;
    }

    _createClass(App, [{
        key: "getDueItems",
        value: function getDueItems() {
            var dueItems = [];
            this.lists.forEach(function (list) {
                list.items.forEach(function (item) {
                    if (item.date && item.status === _StatusJs2["default"].PENDING && _UtilsJs2["default"].dateDiffInDays(new Date(item.date), new Date()) > 0) {
                        dueItems.push(item);
                    }
                });
            });
            return dueItems;
        }
    }, {
        key: "getItemById",
        value: function getItemById(id) {
            var filterById = (function filterById(id1) {
                return function (listItem) {
                    return listItem.id === id1;
                };
            })(id);
            for (var i = 0; i < this.lists.length; i++) {
                var item = this.lists[i].items.filter(filterById);
                if (item.length) {
                    return item[0];
                }
            }
            return null;
        }
    }, {
        key: "getListById",
        value: function getListById(id) {
            var list = this.lists.filter(function (l) {
                return l.id === id;
            });
            return list.length ? list[0] : null;
        }
    }, {
        key: "render",
        value: function render() {
            var pastDueList = new _ListJs2["default"]("Past Due Date", this.getDueItems(), false);
            var html = "<div class=\"app\">\n            <div class=\"btn add-list success\" data-action=\"add-list\">[+] Add List</div>\n          ";
            this.lists.forEach(function (list) {
                html += list.render();
            });
            html += pastDueList.render();
            html += "</div>";
            return html;
        }
    }, {
        key: "add",
        value: function add(list) {
            this.lists.push(list);
        }
    }, {
        key: "remove",
        value: function remove(list) {
            this.lists = this.lists.filter(function (l) {
                return l.id !== list.id;
            });
        }
    }]);

    return App;
})();

exports["default"] = App;
module.exports = exports["default"];

},{"./List.js":3,"./Status.js":4,"./Utils.js":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _UtilsJs = require("./Utils.js");

var _UtilsJs2 = _interopRequireDefault(_UtilsJs);

var _StatusJs = require("./Status.js");

var _StatusJs2 = _interopRequireDefault(_StatusJs);

var Item = (function () {
    function Item() {
        var title = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
        var date = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
        var status = arguments.length <= 2 || arguments[2] === undefined ? _StatusJs2["default"].PENDING : arguments[2];
        var id = arguments.length <= 3 || arguments[3] === undefined ? "" : arguments[3];

        _classCallCheck(this, Item);

        this.id = id ? id : _UtilsJs2["default"].guid();
        this.title = title;
        this.date = date;
        this.status = status;
    }

    _createClass(Item, [{
        key: "render",
        value: function render() {
            var formattedDate = this.date ? _UtilsJs2["default"].formatDate(this.date) : null;
            return "<li class=\"item\" data-id=\"" + this.id + "\" data-status=\"" + this.status + "\">\n              <div class=\"status-input-wrp\"><input type=\"checkbox\" class=\"status-input\" " + (this.status === _StatusJs2["default"].COMPLETE ? "checked" : "") + " /></div>\n              <div class=\"item-title\"> " + this.title + " </div>\n              <div> " + (this.date ? "<input type='date' class='item-date' value='" + formattedDate + "' />" : "<div class='btn' data-action='add-date'>[+] Add Date</div></div>") + "\n              <div class=\"btn delete-item danger\" data-action=\"delete-item\">X</div>\n            </li>";
        }
    }]);

    return Item;
})();

exports["default"] = Item;
module.exports = exports["default"];

},{"./Status.js":4,"./Utils.js":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _UtilsJs = require("./Utils.js");

var _UtilsJs2 = _interopRequireDefault(_UtilsJs);

var List = (function () {
    function List() {
        var title = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
        var items = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
        var isEditable = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
        var id = arguments.length <= 3 || arguments[3] === undefined ? "" : arguments[3];

        _classCallCheck(this, List);

        this.id = id ? id : _UtilsJs2["default"].guid();
        this.title = title;
        this.items = items;
        this.isEditable = isEditable;
    }

    _createClass(List, [{
        key: "render",
        value: function render() {
            var html = "<div class=\"list\" data-id=\"" + this.id + "\" data-iseditable=\"" + this.isEditable + "\">\n                  <h2 class=\"list-title\">" + this.title + "</h2>\n                  " + (this.isEditable ? "<div class='btn delete-list danger' data-action='delete-list'>X</div>" : "") + "\n                  <ul class=\"items\">";
            this.items.forEach(function (item) {
                html += item.render();
            });
            html += "\n                </ul>\n                " + (this.isEditable ? "<div class='btn add-item success' data-action='add-item'>Add Item</div>" : "") + "\n            </div>";
            return html;
        }
    }, {
        key: "getItemById",
        value: function getItemById(id) {
            var item = this.items.filter(function (i) {
                return i.id === id;
            });
            return item.length ? item[0] : null;
        }
    }, {
        key: "add",
        value: function add(item) {
            this.items.push(item);
        }
    }, {
        key: "remove",
        value: function remove(item) {
            this.items = this.items.filter(function (i) {
                return i.id !== item.id;
            });
        }
    }]);

    return List;
})();

exports["default"] = List;
module.exports = exports["default"];

},{"./Utils.js":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Status = {
    PENDING: 0,
    COMPLETE: 1
};
exports["default"] = Status;
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Utils = {
    guid: function guid() {
        /** @returns {string} Random string */
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    },
    getParents: function getParents(elem, selector) {
        var parents = [];
        var firstChar = undefined;
        if (selector) {
            firstChar = selector.charAt(0);
        }
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (selector) {
                if (firstChar === ".") {
                    if (elem.classList.contains(selector.substr(1))) {
                        parents.push(elem);
                    }
                }
                if (firstChar === "#") {
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
        if (typeof date === "string") {
            date = new Date(date);
        }
        var dd = date.getDate();
        var mm = date.getMonth() + 1; // January is 0
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        return yyyy + "-" + mm + "-" + dd;
    },
    dateDiffInDays: function dateDiffInDays(date1, date2) {
        return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
    }
};
exports["default"] = Utils;
module.exports = exports["default"];

},{}],6:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _ItemJs = require("./Item.js");

var _ItemJs2 = _interopRequireDefault(_ItemJs);

var _StatusJs = require("./Status.js");

var _StatusJs2 = _interopRequireDefault(_StatusJs);

var _ListJs = require("./List.js");

var _ListJs2 = _interopRequireDefault(_ListJs);

var _UtilsJs = require("./Utils.js");

var _UtilsJs2 = _interopRequireDefault(_UtilsJs);

var _AppJs = require("./App.js");

var _AppJs2 = _interopRequireDefault(_AppJs);

var app = new _AppJs2["default"]();
/** To update localstorage with current app model */
function updateLocalStorage() {
    localStorage.setItem("appmodel", JSON.stringify(app));
}
/**
 * To check and invoke callback if it is defined
 * @param {function} callback - callback function
 */
function callbackHandler(callback) {
    if (typeof callback === "function") {
        return callback();
    }
}
/**
 * Event handler for `drop` event on list item
 * @param {object} event - Associated event
 */
function _itemDropped(event, callback) {
    event.preventDefault();
    var itemJSON = JSON.parse(event.dataTransfer.getData("item"));
    var oldListId = JSON.parse(event.dataTransfer.getData("parentListId"));
    var newListId = _UtilsJs2["default"].getParents(event.target, ".list")[0].dataset.id;
    var item = app.getItemById(itemJSON.id);
    var oldList = app.getListById(oldListId);
    var newList = app.getListById(newListId);
    if (oldList && newList) {
        // can't move to and from past due date
        oldList.remove(item);
        newList.add(item);
        return callbackHandler(callback);
    }
}
/**
 * Event handler for `change` of list item status
 * @param {object} event - Associated event
 */
function _statusChanged(event, callback) {
    var itemId = _UtilsJs2["default"].getParents(event.target, ".item")[0].dataset.id;
    var item = app.getItemById(itemId);
    item.status = event.target.checked ? _StatusJs2["default"].COMPLETE : _StatusJs2["default"].PENDING;
    return callbackHandler(callback);
}
/**
 * Event handler for `blur` event on list title
 * @param {object} event - Associated event
 */
function _listTitleInput(event, callback) {
    var listId = _UtilsJs2["default"].getParents(event.target, ".list")[0].dataset.id;
    var list = app.getListById(listId);
    list.title = event.target.textContent ? event.target.textContent : "Enter titile";
    updateLocalStorage();
    return callbackHandler(callback);
}
/**
 * Event handler for `blur` event on list item title
 * @param {object} event - Associated event
 */
function _itemTitleInput(event, callback) {
    var itemId = _UtilsJs2["default"].getParents(event.target, ".item")[0].dataset.id;
    var item = app.getItemById(itemId);
    item.title = event.target.textContent ? event.target.textContent : "Enter titile";
    return callbackHandler(callback);
}
/**
 * Event handler for `change` event on list item date
 * @param {object} event - Associated event
 */
function _itemDateChanged(event, callback) {
    var itemId = _UtilsJs2["default"].getParents(event.target, ".item")[0].dataset.id;
    var item = app.getItemById(itemId);
    if (event.target.value) {
        var d = new Date();
        item.date = new Date(event.target.value + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    } else {
        item.date = "";
        return callbackHandler(callback);
    }
    return callbackHandler(callback);
}
/**
 * Event handler for `dragstart` event on list item
 * @param {object} event - Associated event
 */
function _itemDragStarted(event, callback) {
    var itemId = _UtilsJs2["default"].getParents(event.target, ".item")[0].dataset.id;
    var item = app.getItemById(itemId);
    var parentListId = _UtilsJs2["default"].getParents(event.target, ".list")[0].dataset.id;
    event.dataTransfer.setData("item", JSON.stringify(item));
    event.dataTransfer.setData("parentListId", JSON.stringify(parentListId));
    return callbackHandler(callback);
}
/** Prevents default action for dragover event on list items */
function allowdrop(event, callback) {
    event.preventDefault();
    return callbackHandler(callback);
}
/**
 * Event handler for clicks on elements with class .btn
 * @param {object} event - Event attached with click
 */
function _buttonClicked(event, callback) {
    var action = event.target.dataset.action;
    switch (action) {
        case "add-list":
            {
                var list = new _ListJs2["default"]("New List");
                app.add(list);
                break;
            }
        case "delete-list":
            {
                var listId = _UtilsJs2["default"].getParents(event.target, ".list")[0].dataset.id;
                var list = app.getListById(listId);
                app.remove(list);
                break;
            }
        case "add-item":
            {
                var listId = _UtilsJs2["default"].getParents(event.target, ".list")[0].dataset.id;
                var list = app.getListById(listId);
                var item = new _ItemJs2["default"]("New Item");
                list.add(item);
                break;
            }
        case "delete-item":
            {
                var itemId = _UtilsJs2["default"].getParents(event.target, ".item")[0].dataset.id;
                var item = app.getItemById(itemId);
                var listId = _UtilsJs2["default"].getParents(event.target, ".list")[0].dataset.id;
                var list = app.getListById(listId);
                list.remove(item);
                break;
            }
        case "add-date":
            {
                var itemId = _UtilsJs2["default"].getParents(event.target, ".item")[0].dataset.id;
                var listId = _UtilsJs2["default"].getParents(event.target, ".list")[0].dataset.id;
                var list = app.getListById(listId);
                var item = list.getItemById(itemId);
                var currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 1);
                item.date = currentDate.toUTCString();
                break;
            }
        default:
            throw Error("Unhandled Event");
    }
    return callbackHandler(callback);
}
/** To paint the dom based on current state */
function drawDom() {
    // TO-DO: REFRACTOR
    updateLocalStorage();
    document.body.innerHTML = app.render();
    var buttons = document.getElementsByClassName("btn");
    var eventHandlers = {
        buttonClicked: function buttonClicked(event) {
            _buttonClicked(event, drawDom);
        },
        statusChanged: function statusChanged(event) {
            _statusChanged(event, drawDom);
        },
        listTitleInput: function listTitleInput(event) {
            _listTitleInput(event, drawDom);
        },
        itemTitleInput: function itemTitleInput(event) {
            _itemTitleInput(event, drawDom);
        },
        itemDateChanged: function itemDateChanged(event) {
            _itemDateChanged(event, drawDom);
        },
        itemDragStarted: function itemDragStarted(event) {
            _itemDragStarted(event);
        },
        itemDropped: function itemDropped(event) {
            _itemDropped(event, drawDom);
        }
    };
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", eventHandlers.buttonClicked);
    }
    var statusInputs = document.getElementsByClassName("status-input");
    for (var i = 0; i < statusInputs.length; i++) {
        statusInputs[i].addEventListener("change", eventHandlers.statusChanged);
    }
    var listTitles = document.getElementsByClassName("list-title");
    for (var i = 0; i < listTitles.length; i++) {
        if (listTitles[i].parentNode.dataset.iseditable === "true") {
            listTitles[i].setAttribute("contenteditable", true);
            listTitles[i].addEventListener("blur", eventHandlers.listTitleInput);
        }
    }
    var itemTitles = document.getElementsByClassName("item-title");
    for (var i = 0; i < itemTitles.length; i++) {
        itemTitles[i].setAttribute("contenteditable", true);
        itemTitles[i].addEventListener("blur", eventHandlers.itemTitleInput);
    }
    var itemDates = document.getElementsByClassName("item-date");
    for (var i = 0; i < itemDates.length; i++) {
        itemDates[i].addEventListener("change", eventHandlers.itemDateChanged);
    }
    var items = document.getElementsByClassName("item");
    for (var i = 0; i < items.length; i++) {
        var parentListIsEditable = _UtilsJs2["default"].getParents(items[i], ".list")[0].dataset.iseditable;
        if (parentListIsEditable === "true") {
            items[i].setAttribute("draggable", true);
            items[i].addEventListener("dragstart", eventHandlers.itemDragStarted);
        }
    }
    var lists = document.getElementsByClassName("list");
    for (var i = 0; i < lists.length; i++) {
        lists[i].addEventListener("dragover", allowdrop);
        lists[i].addEventListener("drop", eventHandlers.itemDropped);
    }
}
/** Retrives application state from localstorage */
function getAppFromModel() {
    if (localStorage.getItem("appmodel")) {
        var appModel = JSON.parse(localStorage.getItem("appmodel"));
        appModel.lists.forEach(function (list) {
            var items = [];
            list.items.forEach(function (item) {
                items.push(new _ItemJs2["default"](item.title, item.date, item.status, item.id));
            });
            app.add(new _ListJs2["default"](list.title, items, list.isEditable, list.id));
        });
        app.pastDueList = new _ListJs2["default"]("Past Due", app.getDueItems(), false);
    }
}
/** This function is called when DOM is ready. */
function ready() {
    getAppFromModel();
    drawDom();
}
document.addEventListener("DOMContentLoaded", ready, false);

},{"./App.js":1,"./Item.js":2,"./List.js":3,"./Status.js":4,"./Utils.js":5}]},{},[6]);
