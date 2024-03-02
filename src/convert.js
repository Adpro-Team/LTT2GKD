import json5 from 'json5';
import fs from 'node:fs/promises';

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
  let position = {
    left: width,
    top: `${height} / width`
  };
  return position;
};

const GKDRawSub = {
  id: -2,
  name: '本地订阅',
  version: 1,
  author: 'gkd',
  globalGroups: [],
  categories: [],
  apps: []
};

const convert = async () => {
  const AppListFile = await fs.readFile(process.cwd() + '/AppList.json5', 'utf-8');
  const lttSub = await fs.readFile(process.cwd() + '/ltt.json', 'utf-8');
  const AppList = json5.parse(AppListFile);
  const origin = json5.parse(lttSub);
  const originLength = getJsonArrayLength(origin);
  let throwCount = 0;

  var {...thisSub} = GKDRawSub;

  origin.forEach((a) => {
    let isInclude = false;
    let index;
    let hash = Object.keys(a);
    for(let i in AppList){
      if(hash[0] == AppList[i].hash){
        isInclude = true;
        index = i;
        break;
      }
    }
    if(isInclude){
      let thisApp = {
        id: undefined,
        name: undefined,
        groups: []
      };
      thisApp.id = AppList[index].appId;
      thisApp.name = AppList[index].appName;
      let Lrules = json5.parse(a[hash[0]]).popup_rules;
      let groupKeyCount = 1;
      let ruleKeyCount = 0;

      Lrules.forEach((r) => {
        let thisGroup = {
          key: undefined,
          name: undefined,
          rules: []
        };
        thisGroup.key = groupKeyCount;
        thisGroup.name = `${AppList[index].appName}-${String(groupKeyCount)}`;

        let thisRule = {
          key: undefined,
          matches: []
        };
        thisRule.key = ruleKeyCount;

        if(r.hasOwnProperty('times')) thisRule['actionMaximum'] = r.times;

        if(json5.parse(a[hash[0]]).hasOwnProperty('delay')) thisRule['actionDelay'] = json5.parse(a[hash[0]]).delay;

        thisRule.matches.push(textRuleConvert(r.id));

        if(r.action == 'GLOBAL_ACTION_BACK') thisRule['action'] = 'back';
        else{
          let isBounds = r.action.split(',');
          if(isBounds.length < 4) thisRule.matches.push(textRuleConvert(r.action));
          else if(isBounds.length == 4 || isBounds.length == 5){
            thisRule['position'] = boundsRuleConvert(r.action);
            thisRule['action'] = 'clickCenter';
            thisRule.matches.push('[id="android:id/content"]');
          }
        }

        thisGroup.rules.push(thisRule);
        if(json5.parse(a[hash[0]]).hasOwnProperty('unite_popup_rules')){
          if(json5.parse(a[hash[0]]).unite_popup_rules == true) ruleKeyCount++;
        }
        else{
          thisApp.groups.push(thisGroup);
          groupKeyCount++;
        }
      });

      thisSub.apps.push(thisApp);
    }
    else throwCount++;
  });

  await fs.writeFile(process.cwd() + '/log.txt', `共识别到应用${originLength}个，已抛弃${throwCount}个未知应用的规则`);

  await fs.writeFile(process.cwd() + '/-2.json', JSON.stringify(thisSub));
};
convert();