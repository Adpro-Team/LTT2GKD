import type { IArray, Position } from "@gkd-kit/api";

export const iArrayToArray = <T>(array: IArray<T> = []): T[] => {
  return Array<T>().concat(array);
};

export const getJsonArrayLength = (jsonArray: any[]) => {
  let length = 0;
  jsonArray.forEach(() => {
    length++;
  });
  return length;
};

export const textRuleConvert = (lttRule: string) => {
  const temp = lttRule.split('&');
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].startsWith('+')) temp[i] = temp[i].replace('+', '^="');
    else if (temp[i].startsWith('-')) temp[i] = temp[i].replace('-', '$="');
    else if (temp[i].startsWith('=')) temp[i] = temp[i].replace('=', '="');
    else temp[i] = '*="' + temp[i];
    temp[i] += '"';
  }
  let rule = `[(text${temp[0]}||desc${temp[0]}||id${temp[0]})`;
  for (let i = 1; i < temp.length; i++) {
    rule += `&&(text${temp[i]}||desc${temp[i]}||id${temp[i]})`;
  }
  rule += ']';
  return rule;
};

export const boundsRuleConvert = (lttRule: string) => {
  const temp = lttRule.split(',');
  const left = Number(temp[0]), top = Number(temp[1]), right = Number(temp[2]), bottom = Number(temp[3]);
  const horizontalCenter = right - (right - left) / 2;
  const verticalCenter = bottom - (bottom - top) / 2;
  const position: Position = {
    left: horizontalCenter,
    top: verticalCenter
  };
  return position;
};