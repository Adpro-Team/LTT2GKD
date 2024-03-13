import fs from 'node:fs/promises';
import json5 from 'json5';
import { getJsonArrayLength, iArrayToArray } from "./method";
import { PatchAppList } from '../patch';

export const UpdateMd = async () => {
  const totalAppListFile = await fs.readFile(process.cwd() + '/AppList.json5', 'utf-8');
  const totalAppList = json5.parse(totalAppListFile);
  const totalAppCount = getJsonArrayLength(totalAppList);

  const patchAppListArray = iArrayToArray(PatchAppList);
  const patchCount = getJsonArrayLength(patchAppListArray);

  const template = await fs.readFile(process.cwd() + '/Template.md', 'utf-8');
  const mdFile = template.
    replace('--APPCOUNT--',String(totalAppCount)).
    replace('--PATCHCOUNT--',String(patchCount));
  await fs.writeFile(process.cwd() + '/README.md', mdFile);
};
UpdateMd();