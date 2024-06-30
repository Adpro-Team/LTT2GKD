import DOMPurify from 'dompurify';
import { marked } from 'marked';

export default () => {
  const tutoril =
    `
# 开始

## 第一步

打开[这个网址](https://share.adproqwq.top)

## 第二步

将网站的转换结果复制到文本框中

## 第三步

复制生成的导入链接，导入到GKD中
`;

  document.getElementsByClassName('container')[0].innerHTML = DOMPurify.sanitize(marked.parse(tutoril) as string);
};