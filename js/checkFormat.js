function checkFormat(){
  const lttSub = document.getElementById('ltt-rules').value;
  try{
    JSON5.parse(lttSub);
  }
  catch(err){
    alert(`规则格式检测检测到了错误，错误信息如下：\r${err}`);
  }
  convert(JSON5.parse(lttSub));
}