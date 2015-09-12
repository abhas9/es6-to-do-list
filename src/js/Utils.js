module.exports = {
	guid: function() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
	},
	getParents : function (elem, selector) {

	    var parents = [];
	    if ( selector ) {
	        var firstChar = selector.charAt(0);
	    }

	    // Get matches
	    for ( ; elem && elem !== document; elem = elem.parentNode ) {
	        if ( selector ) {

	            // If selector is a class
	            if ( firstChar === '.' ) {
	                if ( elem.classList.contains( selector.substr(1) ) ) {
	                    parents.push( elem );
	                }
	            }

	            // If selector is an ID
	            if ( firstChar === '#' ) {
	                if ( elem.id === selector.substr(1) ) {
	                    parents.push( elem );
	                }
	            }

	            // // If selector is a data attribute
	            // if ( firstChar === '[' ) {
	            //     if ( elem.hasAttribute( selector.substr(1, selector.length - 1) ) {
	            //         parents.push( elem );
	            //     }
	            // }

	            // If selector is a tag
	            if ( elem.tagName.toLowerCase() === selector ) {
	                parents.push( elem );
	            }

	        } else {
	            parents.push( elem );
	        }

	    }

	    // Return parents if any exist
	    if ( parents.length === 0 ) {
	        return null;
	    } else {
	        return parents;
	    }

	}
}