var Item = require('./Item.js');
var Status = require('./Status.js');
var List = require('./List.js');
var Utils = require('./Utils.js');
var App = require('./App.js');



var item1 = new Item("Yo item 1");
var item2 = new Item("Yo item 2");

var list = new List("Yo List", [item1]);
list.add(item2);
list.remove(item2);

var app = new App([list]);

document.addEventListener( "DOMContentLoaded", drawDom, false )

function buttonClicked(event) {
	var action = event.target.dataset.action;
	switch (action) {
		case "add-item":
						{
							let listId = Utils.getParents(event.target,".list")[0].dataset.id;
							let list = app.getListById(listId);
							let item = new Item("New Item");
							list.add(item);
							drawDom();
							break;
						}
		case "delete-item" : 
						{
							let itemId = Utils.getParents(event.target,".item")[0].dataset.id
							let listId = Utils.getParents(event.target,".list")[0].dataset.id;
							console.log(listId);
							let list = app.getListById(listId);
							let item = list.getItemById(itemId);
							list.remove(item);
							drawDom();
							break;
						}

	}
}

function drawDom() {
	document.body.innerHTML = app.render();
	var buttons = document.getElementsByClassName("btn");
	for ( let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', buttonClicked);	
	}
}

console.log(list.render());