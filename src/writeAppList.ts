import type { Root } from "./types";
import { RawApp } from "./originTypes";
import * as fs from 'node:fs/promises';
import * as json5 from 'json5';
const hashj = require('hashj');

export const writeList = async() => {
  const subFile = await fs.readFile(process.cwd() + '/ltt2gkd/Adpro_gkd.json5', 'utf-8');
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
  for(let i = 1;i <= count;i++){
    List.push({
      appId: id[i],
      appName: name[i],
      hash: hash[i],
    });
  }
  await fs.writeFile(process.cwd() + '/ltt2gkd/AppList.json5', json5.stringify(List));
};
writeList();