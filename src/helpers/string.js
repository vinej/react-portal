if(typeof String.prototype.startsWith != 'function'){
    String.prototype.startsWith = function(str){
        if(str == null) return false;
        var i = str.length;
        if(this.length < i) return false;
        for(--i; (i >= 0) && (this[i] === str[i]); --i) continue;
        return i < 0;
    }
}