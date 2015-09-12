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
							let list = app.getListById(listId);
							let item = list.getItemById(itemId);
							list.remove(item);
							drawDom();
							break;
						}
		case "add-date":
						{
							let itemId = Utils.getParents(event.target,".item")[0].dataset.id
							let listId = Utils.getParents(event.target,".list")[0].dataset.id;
							let list = app.getListById(listId);
							let item = list.getItemById(itemId);
							item.date = Utils.formatDate(new Date());
							drawDom();
							break;
						}

	}
}

function statusChanged(event) {
	let itemId = Utils.getParents(event.target,".item")[0].dataset.id
	let item = list.getItemById(itemId);
	item.status = (event.target.checked)? Status.COMPLETE : Status.PENDING;
}

function listTitleInput(event) {
	let listId = Utils.getParents(event.target,".list")[0].dataset.id
	let list = app.getListById(listId);
	list.title = (event.target.textContent)? event.target.textContent : 'Enter titile';
}

function itemTitleInput(event) {
	let itemId = Utils.getParents(event.target,".item")[0].dataset.id
	let listId = Utils.getParents(event.target,".list")[0].dataset.id
	let list = app.getListById(listId);
	let item = list.getItemById(itemId);
	item.title = (event.target.textContent)? event.target.textContent : 'Enter titile';
}

function itemDateChanged(event) {
	let itemId = Utils.getParents(event.target,".item")[0].dataset.id
	let listId = Utils.getParents(event.target,".list")[0].dataset.id
	let list = app.getListById(listId);
	let item = list.getItemById(itemId);
	if (event.target.value) {
		item.date = event.target.value
	} else {
		item.date = "";
		drawDom();
	}
}

function drawDom() {
	document.body.innerHTML = app.render();
	var buttons = document.getElementsByClassName("btn");
	for ( let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', buttonClicked);	
	}
	var statusInputs = document.getElementsByClassName("status-input");
	for ( let i = 0; i < statusInputs.length; i++) {
		statusInputs[i].addEventListener('change', statusChanged);	
	}
	var listTitles = document.getElementsByClassName("list-title");
	for ( let i = 0; i < listTitles.length; i++) {
		listTitles[i].setAttribute("contenteditable", true);
		listTitles[i].addEventListener('input', listTitleInput);	
	}
	var itemTitles = document.getElementsByClassName("item-title");
	for ( let i = 0; i < itemTitles.length; i++) {
		itemTitles[i].setAttribute("contenteditable", true);
		itemTitles[i].addEventListener('input', itemTitleInput);	
	}
	var itemDates = document.getElementsByClassName("item-date");
	for ( let i = 0; i < itemDates.length; i++) {
		itemDates[i].addEventListener('change', itemDateChanged);	
	}
}