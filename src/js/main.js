var Item = require('./Item.js');
var Status = require('./Status.js');
var List = require('./List.js');
var Utils = require('./Utils.js');
var App = require('./App.js');
var Status = require('./Status.js');

var app = new App();

document.addEventListener( "DOMContentLoaded", ready, false )

function ready() {
	getAppFromModel();
	drawDom();
}

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
							var currentDate = new Date();
							currentDate.setDate(currentDate.getDate() + 1);
							item.date = currentDate.toUTCString();
							drawDom();
							break;
						}

	}
}

function statusChanged(event) {
	let itemId = Utils.getParents(event.target,".item")[0].dataset.id
	let item = app.getItemById(itemId);
	item.status = (event.target.checked)? Status.COMPLETE : Status.PENDING;
	drawDom();
}

function listTitleInput(event) {
	let listId = Utils.getParents(event.target,".list")[0].dataset.id
	let list = app.getListById(listId);
	list.title = (event.target.textContent)? event.target.textContent : 'Enter titile';
	updateLocalStorage();
}

function itemTitleInput(event) {
	let itemId = Utils.getParents(event.target,".item")[0].dataset.id
	let item = app.getItemById(itemId);
	item.title = (event.target.textContent)? event.target.textContent : 'Enter titile';
	drawDom();
}

function itemDateChanged(event) {
	let itemId = Utils.getParents(event.target,".item")[0].dataset.id
	let item = app.getItemById(itemId);
	
	if (event.target.value) {
		var d = new Date();
		item.date = new Date(event.target.value + " " +  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
	} else {
		item.date = "";
		drawDom();
	}
	drawDom();
}

function drawDom() { //TO-DO: REFRACTOR
	updateLocalStorage();
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
		listTitles[i].addEventListener('blur', listTitleInput);	
	}
	var itemTitles = document.getElementsByClassName("item-title");
	for ( let i = 0; i < itemTitles.length; i++) {
		itemTitles[i].setAttribute("contenteditable", true);
		itemTitles[i].addEventListener('blur', itemTitleInput);	
	}
	var itemDates = document.getElementsByClassName("item-date");
	for ( let i = 0; i < itemDates.length; i++) {
		itemDates[i].addEventListener('change', itemDateChanged);	
	}
}

function getAppFromModel() {
	if (localStorage.getItem("appmodel")) {
		var appModel = JSON.parse(localStorage.getItem("appmodel"));
		appModel.lists.forEach(function(list){
			let items = [];
			list.items.forEach(function(item) {
				items.push(new Item(item.title, item.date, item.status, item.id));
			});
			app.add(new List(list.title, items, list.isEditable, list.id));
		});
		app.pastDueList =  new List("Past Due", app.getDueItems(), false);
	}
}

function updateLocalStorage() {
	localStorage.setItem("appmodel", JSON.stringify(app));
}
