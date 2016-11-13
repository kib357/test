export const isElementInViewport = el => {
    if (typeof el === 'string') {
        el = document.getElementById(el);
    }
    if (el == null) {
        return false;
    }
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
};

export const getURLParameter = function (parameter, url = window.location.search) {
    parameter = parameter.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + parameter + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const removeURLParameter = function (parameter, url = window.location.search) {
    if (url[0] === '?') {
        url = url.slice(1);
    }
    var prefix = encodeURIComponent(parameter) + '=';
    var pairs = url.split(/[&;]/g);
    for (var i = pairs.length; i-- > 0;) {
        if (pairs[i].lastIndexOf(prefix, 0) !== -1) {
            pairs.splice(i, 1);
        }
    }

    let res = (pairs.length > 0 ? '?' + pairs.join('&') : '');
    return res;
};

export const addURLParameter = function (parameter, value, url = window.location.search) {
    if (url[0] === '?') {
        url = url.slice(1);
    }
    var prefix = encodeURIComponent(parameter) + '=';
    var pairs = url.split(/[&;]/g);
    let index = -1;
    for (var i = 0; i < pairs.length; i++) {
        if (pairs[i].lastIndexOf(prefix, 0) !== -1) {
            index = i;
            break;
        }
    }
    if (index < 0) { index = pairs.push('') - 1 }
    pairs[index] = prefix + encodeURIComponent(value);
    let res = (pairs.length > 0 ? '?' + pairs.filter(p => p).join('&') : '');
    return res;
};