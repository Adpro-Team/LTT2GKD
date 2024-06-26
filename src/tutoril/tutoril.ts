import DOMPurify from 'dompurify';
import { marked } from 'marked';

export default () => {
  const tutoril =
    `
# 准备

你需要准备以下的东西：

1. MT管理器（或其它可读写Android/data的文件管理器）
2. GKD~~（这不废话）~~
3. 已经导出好的转换结果

# 开始

## 第一步

用MT管理器打开下面的路径：

\`\`\`text
Android/data/li.songe.gkd/files/subscription
\`\`\`

## 第二步

将网站的导出结果文件复制替换进去

注意：由于覆盖了本地订阅，所以请做好备份工作！

## 第四步

强行停止GKD，重新打开GKD即可
`;

  document.getElementsByClassName('container')[0].innerHTML = DOMPurify.sanitize(marked.parse(tutoril) as string);
};