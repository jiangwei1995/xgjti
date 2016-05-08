 //图片上传
 function sendFile(file,el) {
  var form_data = new FormData();
  form_data.append('upload', file);
    $.ajax({
      data:  form_data,
      type: "POST",
      url: 'http://localhost:3000/api/Journalisms/uploaderImage',
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        $(el).summernote('editor.insertImage', data.url);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

//滚动条
$('.page-content').slimScroll({
  height: '100%'
});

//菜单
$("#menu").metisMenu();
//id获取
function request(paras){
  var url = location.href;
  var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
  var paraObj = {}
  for (i=0; j=paraString[i]; i++){
    paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
  }
  var returnValue = paraObj[paras.toLowerCase()];
  if(typeof(returnValue)=="undefined"){
    return "";
  }else{
    return returnValue;
  }
}
//
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds() //秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
window.onload= function(){

  if(typeof getCookie('token')!= "string" ){
    alert("请登录!!!");
    location.href ="login.html"
  }else{
    $.get("http://localhost:3000/api/Tokens/"+getCookie('token')).done(
      function(data){

      }).fail(function(err){
        alert("请重新登录!!!");
        location.href ="login.html"
      });

  }
}
function getCookie(name){
 var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 if(arr=document.cookie.match(reg))
 return unescape(arr[2]);
 else
 return null;
 }

function delCookie(){
    var name ="token";
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}


function setCookie(name,value,time){
  var strsec = getsec(time);
  var exp = new Date();
  exp.setTime(exp.getTime() + strsec*1);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getsec(str){
  var str1=str.substring(1,str.length)*1;
  var str2=str.substring(0,1);
  if (str2=="s")
  {
  return str1*1000;
  }
  else if (str2=="h")
  {
  return str1*60*60*1000;
  }
  else if (str2=="d")
  {
  return str1*24*60*60*1000;
  }
}
