# LTT2GKD

李跳跳规则转GKD规则

网页版上线，欢迎使用。

[点此跳转](https://ltt2gkd.adproqwq.xyz)

## 使用教程

### 1. 步骤

#### Github Actions

Fork 本仓库的 `main`分支。

在你的仓库中，将以数组包裹的形似
```json
[
  {规则1},
  {规则2},
  ...
]
```
的李跳跳规则填写进入`ltt.json`，然后运行 github action 里的 `convert`。

运行成功后，转换结果会出现在`-2.json`。

参考[教程](https://ltt2gkd.adproqwq.xyz/tutoril.html)导入GKD使用。

由于hash的不可逆性，部分规则会因无法获取具体的应用信息，而被抛弃，具体抛弃数量可以查看`log.txt`。

#### 本地运行

以 Windows系统 为例，其它系统可参考。

请事先准备好 node.js 环境！

下载 本仓库的 `main`分支 的源码。

将以数组包裹的形似
```json
[
  {规则1},
  {规则2},
  ...
]
```
的李跳跳规则填写进入`ltt.json`，然后使用命令行依次运行：

```shell
pnpm i

pnpm convert
```

运行成功后，转换结果会出现在`-2.json`。

参考[教程](https://ltt2gkd.adproqwq.xyz/tutoril.html)导入GKD使用。

由于hash的不可逆性，部分规则会因无法获取具体的应用信息，而被抛弃，具体抛弃数量可以查看`log.txt`。

### 2. 补丁

上文提到

> 由于hash的不可逆性，部分规则会因无法获取具体的应用信息，而被抛弃，具体抛弃数量可以查看`log.txt`。

本仓库目前收录有许多个应用，但总会有应用未被覆盖，这就会导致该应用的规则被丢弃。

那么，没有办法解决吗？

当然有，你可以通过补丁的方式，将一些没有被收录的应用添加进去，使其能够被解析。

只需要在 **根目录** 下的`patch.ts`文件中，在中括号里添加形如：

```json5
{
  packgeName: '应用包名1',
  appName: '应用名称1',
},
{
  packgeName: '应用包名2',
  appName: '应用名称2',
},
...
```

（本地运行需要执行此步骤）然后在命令行工具输入

```shell
pnpm run list
```

就可以了

**注意：用户补丁按照上面的格式放入patch.ts即可，libs文件夹内放的是GKD的订阅文件，也可以起到补丁效果，但必须是订阅文件！**

## 仓库信息

当前收录应用 4674 个，其中，添加应用补丁 0 个。

注意：其中包含大量 OPPO、小米等 手机品牌和安卓系统的系统应用。~~所以只是看起来多~~

## 致谢

应用库提供 By [@AIsouler](https://github.com/AIsouler)、[@gkd-kit](https://github.com/gkd-kit)

李跳跳测试规则提供 By [@Snoopy1866](https://github.com/Snoopy1866)、[@FreezingArts](https://github.com/FreezingArts)

部分思路帮助 By [@Snoopy1866](https://github.com/Snoopy1866)

## 许可证

所有代码（仅在本分支内）遵循GPL-3.0许可证