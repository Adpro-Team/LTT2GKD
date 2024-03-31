var thisSub = {
  id: -2,
  name: '本地订阅',
  version: 1,
  author: 'gkd',
  globalGroups: [],
  categories: [],
  apps: [],
};

async function convert(){
  const AppList = JSON5.parse(await $.get('https://raw.gitmirror.com/Adpro-Team/LTT2GKD/main/AppList.json5'));
  const AppExtList = JSON5.parse(await $.get('https://raw.gitmirror.com/Adpro-Team/LTT2GKD/main/AppExtList.json5'));
  const lttSub = document.getElementById('ltt-rules').value;
  const List = AppList.concat(AppExtList);
  const origin = JSON5.parse(lttSub);
  const originLength = getJsonArrayLength(origin);
  let throwCount = 0;

  origin.forEach((a) => {
    let isInclude = false;
    let index;
    let hash = Object.keys(a);
    for(let i = 0;i < List.length;i++){
      if(hash[0] == List[i].hash){
        isInclude = true;
        index = i;
        break;
      }
    }
    if(isInclude){
      let thisApp = {
        id: List[index].appId,
        name: List[index].appName,
        groups: [],
      };
      let Lrules = JSON5.parse(a[hash[0]]).popup_rules;
      let groupKeyCount = 1;
      let ruleKeyCount = 0;

      Lrules.forEach((r) => {
        let thisGroup = {
          key: groupKeyCount,
          name: `${List[index].appName}-${String(groupKeyCount)}`,
          rules: [],
        };

        let thisRule = {
          key: ruleKeyCount,
          matches: [],
        };

        if(r.hasOwnProperty('times')) thisRule.actionMaximum = r.times;

        if(JSON5.parse(a[hash[0]]).hasOwnProperty('delay')) thisRule.actionDelay = JSON5.parse(a[hash[0]]).delay;

        const thisRuleMatches = thisRule.matches;

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

        const thisGroupRules = thisGroup.rules;

        thisGroupRules.push(thisRule);
        thisGroup.rules = thisGroupRules;
        if(JSON5.parse(a[hash[0]]).hasOwnProperty('unite_popup_rules')){
          if(JSON5.parse(a[hash[0]]).unite_popup_rules == true) ruleKeyCount++;
        }
        else{
          thisApp.groups.push(thisGroup);
          groupKeyCount++;
        }
      });

      const thisSubApps = thisSub.apps;

      thisSubApps.push(thisApp);
      thisSub.apps = thisSubApps;
    }
    else throwCount++;
  });

  alert(`共识别到应用${originLength}个，已抛弃${throwCount}个未知应用的规则`);

  document.getElementById('gkd-rules').value = JSON5.stringify(thisSub, null, 2);
};