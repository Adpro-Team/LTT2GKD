import json5 from 'json5';
import { RawSubscription, RawApp, RawAppGroup, RawAppRule, Position, IArray } from '@gkd-kit/api';
import { getJsonArrayLength, iArrayToArray } from './method'
import fs from 'node:fs/promises';

function textRuleConvert(lttRule: string){
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

function boundsRuleConvert(lttRule: string){
  let temp = lttRule.split(',');
  let width = Number(temp[2]);
  let height = temp[3];
  let position: Position = {
    left: width,
    top: `${height} / width`
  };
  return position;
};

const convert = async () => {
  const AppListFile = await fs.readFile(process.cwd() + '/AppList.json5', 'utf-8');
  const lttSub = await fs.readFile(process.cwd() + '/ltt.json', 'utf-8');
  const AppList = json5.parse(AppListFile);
  const origin = json5.parse(lttSub);
  const originLength = getJsonArrayLength(origin);
  let throwCount = 0;

  let thisSub: RawSubscription = {
    id: -2,
    name: '本地订阅',
    version: 1,
    author: 'gkd',
    globalGroups: [],
    categories: [],
    apps: [],
  };

  origin.forEach((a: any) => {
    let isInclude = false;
    let index: string | null = null;
    let hash = Object.keys(a);
    for(let i in AppList){
      if(hash[0] == AppList[i].hash){
        isInclude = true;
        index = i;
        break;
      }
    }
    if(isInclude){
      let thisApp: RawApp = {
        id: AppList[index as string].appId,
        name: AppList[index as string].appName,
        groups: [],
      };
      let Lrules = json5.parse(a[hash[0]]).popup_rules;
      let groupKeyCount = 1;
      let ruleKeyCount = 0;

      Lrules.forEach((r: any) => {
        let thisGroup: RawAppGroup = {
          key: groupKeyCount,
          name: `${AppList[index as string].appName}-${String(groupKeyCount)}`,
          rules: [],
        };

        let thisRule: RawAppRule = {
          key: ruleKeyCount,
          matches: [],
        };

        if(r.hasOwnProperty('times')) thisRule.actionMaximum = r.times;

        if(json5.parse(a[hash[0]]).hasOwnProperty('delay')) thisRule.actionDelay = json5.parse(a[hash[0]]).delay;

        const thisRuleMatches = iArrayToArray(thisRule.matches as IArray<string>);

        thisRuleMatches.push(textRuleConvert(r.id));

        if(r.action == 'GLOBAL_ACTION_BACK') thisRule.action = 'back';
        else{
          let isBounds = r.action.split(',');
          if(isBounds.length < 4) thisRuleMatches.push(textRuleConvert(r.action));
          else if(isBounds.length == 4 || isBounds.length == 5){
            thisRule.position = boundsRuleConvert(r.action);
            thisRuleMatches.push('[id="android:id/content"]');
          }
        }

        thisRule.matches = thisRuleMatches;

        const thisGroupRules = iArrayToArray(thisGroup.rules as IArray<RawAppRule>);

        thisGroupRules.push(thisRule);
        thisGroup.rules = thisGroupRules;
        if(json5.parse(a[hash[0]]).hasOwnProperty('unite_popup_rules')){
          if(json5.parse(a[hash[0]]).unite_popup_rules == true) ruleKeyCount++;
        }
        else{
          thisApp.groups.push(thisGroup);
          groupKeyCount++;
        }
      });

      const thisSubApps = iArrayToArray(thisSub.apps as RawApp[]);

      thisSubApps.push(thisApp);
      thisSub.apps = thisSubApps;
    }
    else throwCount++;
  });

  await fs.writeFile(process.cwd() + '/log.txt', `共识别到应用${originLength}个，已抛弃${throwCount}个未知应用的规则`);

  await fs.writeFile(process.cwd() + '/-2.json', JSON.stringify(thisSub));
};
convert();