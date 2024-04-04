export type Root = RawApp[];

export type PatchApps = RawPatchApp[];

export type LogApps = LogRawApp[];

export type RawApp = {
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

export type RawPatchApp = {
  /**
   * 应用包名
   */
  packageName: string;

  /**
   * 应用名称
   */
  appName: string;
};

export type LogRawApp = {
  /**
   * 包名
   */
  id: string;

  /**
   * 应用名称
   */
  name: string;

  /**
   * 应用版本号
   */
  versionCode: number;

  /**
   * 应用版本名
   */
  versionName: number;

  /**
   * 是否为系统应用
   */
  isSystem: boolean;

  /**
   * 最后更新时间，使用时间戳
   */
  mtime: number;

  /**
   * 是否为隐藏应用
   */
  hidden: boolean;
};