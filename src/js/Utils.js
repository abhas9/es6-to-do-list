module.exports = {
    guid: function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    getParents: function(elem, selector) {
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
    formatDate: function(date) {
        if (typeof date === "string") {
            date = new Date(date);
        }
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
    },
    dateDiffInDays: function(date1, date2) {
        return ((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    }
}