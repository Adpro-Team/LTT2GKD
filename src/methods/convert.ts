import json5 from 'json5';
import type { RawSubscription, RawApp, RawAppGroup, RawAppRule, IArray } from '@gkd-kit/api';
import { getJsonArrayLength, iArrayToArray, textRuleConvert, boundsRuleConvert } from './method'
import $ from 'jquery';

export const convert = async (origin: Object[]) => {
  const List = json5.parse(await $.get('https://raw.gitmirror.com/Adpro-Team/LTT2GKD/main/AppList.json5'));
  const originLength = getJsonArrayLength(origin);
  let throwCount = 0;

  const thisSub: RawSubscription = {
    id: -2,
    name: '本地订阅',
    version: 0,
    author: 'gkd',
    globalGroups: [],
    categories: [],
    apps: [],
  };

  origin.forEach((a: any) => {
    if (Object.keys(a)[0].match(/-?[0-9]+/) === null) return;
    let isInclude = false;
    let index: number | null = null;
    const hash = Object.keys(a);
    for (let i = 0; i < List.length; i++) {
      if (hash[0] == List[i].hash) {
        isInclude = true;
        index = i;
        break;
      }
    }
    if (isInclude) {
      const thisApp: RawApp = {
        id: List[index as number].appId,
        name: List[index as number].appName,
        groups: [],
      };
      const LappConfig = json5.parse(a[hash[0]]);
      if (!Object.prototype.hasOwnProperty.call(LappConfig, 'popup_rules')) return;
      const Lrules = LappConfig.popup_rules;
      let groupKeyCount = 1;
      let ruleKeyCount = 0;
      let thisGroup: RawAppGroup;

      Lrules.forEach((r: any) => {
        if (r == null) return;

        if (ruleKeyCount == 0) {
          thisGroup = {
            key: groupKeyCount,
            name: `${List[index as number].appName}-${String(groupKeyCount)}`,
            rules: [],
          };
        }

        const thisRule: RawAppRule = {
          key: ruleKeyCount,
          matches: [],
        };

        if (Object.prototype.hasOwnProperty.call(r, 'times')) thisRule.actionMaximum = r.times;

        if (Object.prototype.hasOwnProperty.call(LappConfig, 'delay')) thisRule.actionDelay = LappConfig.delay;

        const thisRuleMatches = iArrayToArray(thisRule.matches as IArray<string>);

        if (r.action == 'GLOBAL_ACTION_BACK') thisRule.action = 'back';
        else {
          const isBounds = r.action.split(',');
          if (isBounds.length < 4) thisRuleMatches.push(textRuleConvert(r.action));
          else if (isBounds.length == 4 || isBounds.length == 5) {
            thisRule.position = boundsRuleConvert(r.action);
            thisRuleMatches.push('[id="android:id/content"]');
          }
        }

        thisRule.matches = thisRuleMatches;

        const thisGroupRules = iArrayToArray(thisGroup.rules as IArray<RawAppRule>);

        thisGroupRules.push(thisRule);
        thisGroup.rules = thisGroupRules;
        if (Object.prototype.hasOwnProperty.call(LappConfig, 'unite_popup_rules')) {
          if (LappConfig.unite_popup_rules == true) {
            if (ruleKeyCount < getJsonArrayLength(Lrules) - 1) ruleKeyCount++;
            else {
              thisApp.groups.push(thisGroup);
              groupKeyCount++;
            }
          }
        }
        else {
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

  alert(`共识别到应用${originLength}个，已抛弃${throwCount}个未知应用的规则`);

  (document.getElementById('gkd-rules')! as HTMLTextAreaElement).value = json5.stringify(thisSub, null, 2);
  (document.getElementById('gkd-rules-hidden')! as HTMLTextAreaElement).value = json5.stringify(thisSub);
};