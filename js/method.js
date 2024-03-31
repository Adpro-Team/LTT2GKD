function getJsonArrayLength(jsonArray){
  let length = 0;
  for(let i in jsonArray){
    length++;
  }
  return length;
};

function textRuleConvert(lttRule){
  let temp = lttRule.split('&');
  for(let i = 0;i < temp.length;i++){
    if(temp[i].startsWith('+')) temp[i] = temp[i].replace('+','^="');
    else if(temp[i].startsWith('-')) temp[i] = temp[i].replace('-','$="');
    else if(temp[i].startsWith('=')) temp[i] = temp[i].replace('=','="');
    else temp[i] = '*="' + temp[i];
    temp[i] += '"';
  }
  let rule = `[(text${temp[0]}||desc${temp[0]}||id${temp[0]})`;
  for(let i = 1;i < temp.length;i++){
    rule += `&&(text${temp[i]}||desc${temp[i]}||id${temp[i]})`;
  }
  rule += ']';
  return rule;
};

function boundsRuleConvert(lttRule){
  let temp = lttRule.split(',');
  let width = Number(temp[2]);
  let height = temp[3];
  let position = new Position({
    left: width,
    top: `${height} / width`
  });
  return position;
};