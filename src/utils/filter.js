import Vue from "vue";
import {accDiv} from "@/utils"
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}
export function textOverFlow(str,num) {
  console.log(str, num);
  var myLen = 0;
  var i = 0;
  for (; (i < str.length) && (myLen <= num * 2); i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)         //根据Unicode编码值判断是否汉字
      myLen++;
    else
      myLen += 2;
  }
  if(myLen < num * 2) {
    return str
  }else {
    var st = str.substring(0, num) + '…' 
    return st
  }
}
// 金额单位分 转成元
export function transferMoney(cent = 0) {
  return accDiv(cent,100)
}

// 2017-12-14
export function formatTime(sec) {
  if (sec == null) return "--";
  var date = new Date(sec);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var seconds = date.getSeconds();
  var time = [hour, minute, seconds].map(formatNumber).join(":");
  var date = [year, month, day].map(formatNumber).join("/");
  return date;
}

export function formatTime2(sec) {
  if (sec == null) return "--";
  var date = new Date(sec);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var seconds = date.getSeconds();
  var time = [hour, minute, seconds].map(formatNumber).join(":");
  var date = [year, month, day].map(formatNumber).join("/");
  return date+" "+time;
}

export function beautifyTime(timestamp) {
  var mistiming = Math.round(new Date() / 1000) - timestamp / 1000;
  var postfix = mistiming > 0 ? '前' : '后'
  mistiming = Math.abs(mistiming)
  var arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
  var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];

  for (var i = 0; i < 7; i++) {
    var inm = Math.floor(mistiming / arrn[i])
    if (inm != 0) {
      return inm + arrr[i] + postfix
    }
  }
}  

const filters = {
  textOverFlow,
  formatTime,
  formatTime2,
  beautifyTime,
  transferMoney
}
export default filters;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
