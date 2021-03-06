'use strict';

export interface StringMap<T> {
  [key: string]: T;
}

export function stringify(obj:any) {
  return JSON.stringify(obj);
}

export function isString(str:any):str is String {
  return typeof str === 'string';
}

export function isFunction(func: any) {
  return typeof func === 'function';
}

export function isBlank(obj: any): boolean {
  return obj == undefined;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
export function groupBy<T>(array: T[], key:string):StringMap<T[]> {
  return array.reduce<StringMap<T[]>>(function(res, value) {
    if (hasOwnProperty.call(res, value[key])) {
      res[value[key]].push(value);
    } else {
      res[value[key]] = [value];
    }
    return res;
  }, {});
}

export function statusCodeType(statusCode, defaultAsError = false) {
  if (statusCode === 'default') {
    return defaultAsError ? 'error' : 'success';
  }

  if (statusCode < 100 || statusCode > 599) {
    throw new Error('invalid HTTP code');
  }
  let res = 'success';
  if (statusCode >= 300 && statusCode < 400) {
    res = 'redirect';
  } else if (statusCode >= 400) {
    res = 'error';
  } else if (statusCode < 200) {
    res = 'info';
  }
  return res;
}

export function defaults(target, src) {
  var props = Object.keys(src);

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    if (target[key] === undefined) {
      target[key] = src[key];
    }
  }
  return target;
}

export function safePush(obj, prop, val) {
  if (!obj[prop]) obj[prop] = [];
  obj[prop].push(val);
}

// credits https://remysharp.com/2010/07/21/throttling-function-calls
export function throttle(fn, threshhold, scope) {
  threshhold = threshhold || 250;
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

export const isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0
  || (function (p) { return p.toString() === '[object SafariRemoteNotification]'; })(!window['safari']
  || safari.pushNotification);

export function snapshot(obj) {
  if(obj == undefined || typeof(obj) !== 'object') {
    return obj;
  }

  var temp = new obj.constructor();

  for(var key in obj) {
    if (obj.hasOwnProperty(key)) {
      temp[key] = snapshot(obj[key]);
    }
  }

  return temp;
}

export function isJsonLike(contentType: string): boolean {
  return contentType.search(/json/i) !== -1;
}

export function getJsonLike(object: object) {
  const jsonLikeKeys = Object.keys(object).filter(isJsonLike);

  if (!jsonLikeKeys.length) {
    return false;
  }

  return object[jsonLikeKeys.shift()];
}
