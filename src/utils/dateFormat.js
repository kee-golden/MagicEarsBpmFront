function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

export function translateUSDate(date) {
  const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec'];
  const w = ['Monday', 'Tuseday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const d = ['st', 'nd', 'rd', 'th'];
  const mn = date.getMonth();
  const wn = date.getDay();
  const dn = date.getDate();
  let dns;
  if (((dn % 10) < 1) || ((dn % 10) > 3)) {
    dns = d[3];
  } else {
    dns = d[(dn % 10) - 1];
    if ((dn === 11) || (dn === 12)) {
      dns = d[3];
    }
  }
  return m[mn] + ' ' + dn + dns + ' ';
}


// 日期月份/天的显示，如果是1位数，则在前面加上'0'
function getFormatDate(arg) {
  if (arg === undefined || arg === '') {
    return '';
  }

  let re = arg + '';
  if (re.length < 2) {
    re = '0' + re;
  }

  return re;
}

// 当前日期增加天数，默认增加一天
export function addDate(time, days) {
  if (days === undefined || days === '') {
    days = 1;
  }
  const date = new Date(time);
  date.setDate(date.getDate() + days);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
}


export default function dateFormat() {

}
