// (function(){
//     var changeFont=function(){
//         var deviceW=window.innerWidth||document.documentElement.clientWidth;
//         baseFontSize=100;
//         var fontSize=deviceW/maxSize*baseFontSize;
//             elementBody=document.querySelector('body.html');
//             elementBody.style.fontSize=fontSize+'px';
//             console.log(deviceW)
//     }
//     changeFont();
// })
// function setRem() {
//     var whdef = 100/1920;// 表示1920的设计图,使用100PX的默认值
//     var bodyWidth = document.body.clientWidth;// 当前窗口的宽度
//     var rem = bodyWidth * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
//     document.getElementsByTagName('html')[0].style.fontSize = rem + 'px';
//   }
//   setRem()
//   window.addEventListener('load', setRem);
// window.addEventListener('resize', setRem);
var doc = document,
query = 'querySelectorAll',
claname = 'getElementsByClassName',
S = function(s) {
    return doc[query](s);
},
G = function(obj,attr){ 
    if(obj.currentStyle){
        if(attr=='width'){
            return (parseFloat(obj.currentStyle['width'])+parseFloat(obj.currentStyle['marginLeft'])+parseFloat(obj.currentStyle['marginRight'])+parseFloat(obj.currentStyle['paddingLeft'])+parseFloat(obj.currentStyle['paddingRight']));
           }else if(attr=='height'){
               return (parseFloat(obj.currentStyle['height'])+parseFloat(obj.currentStyle['marginTop'])+parseFloat(obj.currentStyle['marginBottom'])+parseFloat(obj.currentStyle['paddingTop'])+parseFloat(obj.currentStyle['paddingBottom']));
           }else{
               return parseFloat(obj.currentStyle[attr]);
           }
    } 
    else{ 
        if(attr=='width'){
            return parseFloat(document.defaultView.getComputedStyle(obj,null)['width']);
        }else if(attr=='height'){
            return parseFloat(document.defaultView.getComputedStyle(obj,null)['height']);
        }else{
            return parseFloat(document.defaultView.getComputedStyle(obj,null)[attr]);
        }
    } 
};