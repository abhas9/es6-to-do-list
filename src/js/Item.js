import Utils from "./Utils.js";
import Status from "./Status.js";
class Item {
    constructor(title = "", date = "", status = Status.PENDING, id = "") {
        this.id = (id) ? id : Utils.guid();
        this.title = title;
        this.date = date;
        this.status = status;
    }
    render() {
        let formattedDate = (this.date) ? Utils.formatDate(this.date) : null;
        return `<li class="item" data-id="${this.id}" data-status="${this.status}">
              <div class="status-input-wrp"><input type="checkbox" class="status-input" ${(this.status === Status.COMPLETE) ? "checked" : ""} /></div>
              <div class="item-title"> ${this.title} </div>
              <div> ${(this.date) ? "<input type='date' class='item-date' value='" + formattedDate + "' />" : "<div class='btn' data-action='add-date'>[+] Add Date</div></div>" }
              <div class="btn delete-item danger" data-action="delete-item">X</div>
            </li>`;
    }
}
export default Item;
