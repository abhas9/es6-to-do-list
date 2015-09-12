var Item = require('./Item.js');
var Status = require('./Status.js');
var List = require('./List.js');
var Utils = require('./Utils.js');
var App = require('./App.js');
var Status = require('./Status.js');

var app = new App();

document.addEventListener( "DOMContentLoaded", drawDom, false )

function buttonClicked(event) {
	var action = event.target.dataset.action;
	switch (action) {
		case "add-list":
						{
							let list = new List("New Empty List");
							app.add(list);
							drawDom();
							break;
						}
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

function statusChanged() {
	let itemId = Utils.getParents(event.target,".item")[0].dataset.id
	let item = list.getItemById(itemId);
	item.status = (event.target.checked)? Status.COMPLETE : Status.PENDING;
}

function drawDom() {
	document.body.innerHTML = app.render();
	var buttons = document.getElementsByClassName("btn");
	for ( let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', buttonClicked);	
	}
	var statusInput = document.getElementsByClassName("status-input");
	for ( let i = 0; i < statusInput.length; i++) {
		statusInput[i].addEventListener('change', statusChanged);	
	}
}

console.log(list.render());