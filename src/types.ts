export type IArray<T> = T | T[];

export type Root = IArray<RawApp>

type RawApp = {
  /**
   * 应用包名
   */
  appId: string;

  /**
   * 应用名称
   */
  appName: string;

  /**
   * 应用包名对应的Hash
   */
  hash: string;
};