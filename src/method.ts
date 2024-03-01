import type { IArray } from "./types";

export const iArrayToArray = <T>(array: IArray<T> = []): T[] => {
  return Array<T>().concat(array);
};

export const getJsonArrayLength = (jsonArray: any) => {
  let length = 0;
  for(let i in jsonArray){
    length++;
  }
  return length;
};