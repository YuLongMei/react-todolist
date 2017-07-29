function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uid(len) {
    var str = '';
    var src = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var src_len = src.length;
    var i = len;

    for (; i--;) {
        str += src.charAt(random(0, src_len - 1));
    }

    return str;
}

module.exports = function *(next) {
    var cookieID = this.cookies ?
        this.cookies.get('cookieID') : undefined;

    if (typeof cookieID === 'undefined') {
        this.cookies.set('cookieID', uid(32));
    }

    yield next;
};