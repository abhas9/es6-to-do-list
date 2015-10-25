import List from "./List.js";
import Utils from "./Utils.js";
import Status from "./Status.js";
class App {
    constructor(lists = []) {
        this.lists = lists;
    }
    getDueItems() {
        let dueItems = [];
        this.lists.forEach(function(list) {
            list.items.forEach(function(item) {
                if (item.date && item.status === Status.PENDING && Utils.dateDiffInDays(new Date(item.date), new Date()) > 0) {
                    dueItems.push(item);
                }
            });
        });
        return dueItems;
    }
    getItemById(id) {
        for (let i = 0; i < this.lists.length; i++) {
            let item = this.lists[i].items.filter(listItem => listItem.id === id);
            if (item.length) {
                return item[0];
            }
        }
        return null;
    }
    getListById(id) {
        let list = this.lists.filter(l => l.id === id);
        return ((list.length) ? list[0] : null);
    }
    render() {
        let pastDueList = new List("Past Due Date", this.getDueItems(), false);
        let html = `<div class="app">
            <div class="btn add-list success" data-action="add-list">[+] Add List</div>
          `;
        this.lists.forEach(function(list) {
            html += list.render();
        });
        html += pastDueList.render();
        html += "</div>";
        return html;
    }
    add(list) {
        this.lists.push(list);
    }
    remove(list) {
        this.lists = this.lists.filter(l => (l.id !== list.id));
    }
}
export default App;
