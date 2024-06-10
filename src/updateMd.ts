import fs from 'node:fs/promises';
import json5 from 'json5';
import { getJsonArrayLength } from "./method";
import { PatchAppList } from '../patch';

export const UpdateMd = async () => {
  const AppListFile = await fs.readFile(process.cwd() + '/AppList.json5', 'utf-8');
  const AppList = json5.parse(AppListFile);
  const totalAppCount = getJsonArrayLength(AppList);

  const patchCount = getJsonArrayLength(PatchAppList);

  const template = await fs.readFile(process.cwd() + '/Template.md', 'utf-8');
  const mdFile = template.
    replace('--APPCOUNT--',String(totalAppCount)).
    replace('--PATCHCOUNT--',String(patchCount));
  await fs.writeFile(process.cwd() + '/README.md', mdFile);
};
UpdateMd();