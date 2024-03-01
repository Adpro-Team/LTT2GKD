import { createRequire } from "module";
import type { Root } from "./types";
import { RawApp } from "./originTypes";
import { PatchAppList } from '../patch';
import { getJsonArrayLength, iArrayToArray } from "./method";
import fs from 'node:fs/promises';
import json5 from 'json5';
const require = createRequire(import.meta.url);
const hashj = require('hashj');

export const writeList = async() => {
  const subFile = await fs.readFile(process.cwd() + '/AIsouler_gkd.json5', 'utf-8');
  const sub = await json5.parse(subFile);
  const apps = sub.apps;
  var List: Root = [];
  var id: string[] = [''], name: string[] = [''], hash: string[] = [''];
  var count = 0;
  apps.forEach((a: RawApp) => {
    id.push(a.id);
    name.push(a.name as string);
    hash.push(String(hashj.jHashCode(a.id)));
    count++;
  });

  let PatchAppListArray = iArrayToArray(PatchAppList);
  let PatchCount = getJsonArrayLength(PatchAppListArray);
  if(PatchCount != 0){
    PatchAppListArray.forEach((a) => {
      if(id.indexOf(a.packageName) == -1){
        id.push(a.packageName);
        name.push(a.appName);
        hash.push(String(hashj.jHashCode(a.packageName)));
        count++;
      }
    });
  }

  for(let i = 1;i <= count;i++){
    List.push({
      appId: id[i],
      appName: name[i],
      hash: hash[i],
    });
  }

  await fs.writeFile(process.cwd() + '/AppList.json5', json5.stringify(List));
};
writeList();