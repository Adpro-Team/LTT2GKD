var thisSub = {
  id: -2,
  name: '本地订阅',
  version: 0,
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
    if(Object.keys(a)[0].match(/-?[0-9]+/) === null) return;
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
      let LappConfig = JSON5.parse(a[hash[0]]);
      if(!LappConfig.hasOwnProperty('popup_rules')) return;
      let Lrules = LappConfig.popup_rules;
      let groupKeyCount = 1;
      let ruleKeyCount = 0;
      let thisGroup;

      Lrules.forEach((r) => {
        if(r == null) return;

        if(ruleKeyCount == 0){
          thisGroup = {
            key: groupKeyCount,
            name: `${List[index].appName}-${String(groupKeyCount)}`,
            rules: [],
          };
        }

        let thisRule = {
          key: ruleKeyCount,
          matches: [],
        };

        if(r.hasOwnProperty('times')) thisRule.actionMaximum = r.times;

        if(LappConfig.hasOwnProperty('delay')) thisRule.actionDelay = LappConfig.delay;

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
        if(LappConfig.hasOwnProperty('unite_popup_rules')){
          if(LappConfig.unite_popup_rules == true){
            if(ruleKeyCount < getJsonArrayLength(Lrules) - 1) ruleKeyCount++;
            else{
              thisApp.groups.push(thisGroup);
              groupKeyCount++;
            }
          }
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