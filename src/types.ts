export type IArray<T> = T | T[];

export type Root = IArray<RawApp>;

export type PatchApp = IArray<RawPatchApp>;

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

type RawPatchApp = {
  /**
   * 应用包名
   */
  packageName: string;

  /**
   * 应用名称
   */
  appName: string;
};