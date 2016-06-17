if(typeof String.prototype.startsWith != 'function'){
  String.prototype.startsWith = function(str){
    if(str == null) return false;
    var i = str.length;
    if(this.length < i) return false;
    for(--i; (i >= 0) && (this[i] === str[i]); --i) continue;
    return i < 0;
  }
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

if (typeof String.prototype.splitEqual != 'function') {
  String.prototype.splitEqual = function(actiontype, sep) {
    var res = this.split(sep)
    for(let f of res) {
      if (f === "*" || f == actiontype) {
        return true
      }
    }
    return false
  }
}

