import { createRequire } from "module";
import type { Root } from "./types";
import { RawApp } from '@gkd-kit/api';
import { PatchAppList } from '../patch';
import { getJsonArrayLength } from "./method";
import fs from 'node:fs/promises';
import json5 from 'json5';
const require = createRequire(import.meta.url);
const hashj = require('hashj');

export const writeList = async() => {
  const libDir = await fs.readdir(process.cwd() + '/libs');
  var List: Root = [];
  var id: string[] = [''], name: string[] = [''], hash: string[] = [''];
  var count = 0;
  for(let i in libDir){
    const subFile = await fs.readFile(process.cwd() + '/libs/' + libDir[i], 'utf-8');
    const sub = json5.parse(subFile);
    const apps = sub.apps;
    apps.forEach((a: RawApp) => {
      if(id.indexOf(a.id) == -1){
        id.push(a.id);
        name.push(a.name as string);
        hash.push(String(hashj.jHashCode(a.id)));
        count++;
      }
    });
  }

  let PatchCount = getJsonArrayLength(PatchAppList);
    if(PatchCount != 0){
      PatchAppList.forEach((a) => {
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