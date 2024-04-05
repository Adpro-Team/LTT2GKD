const tutoril =
`
# 准备

你需要准备以下的东西：

1. MT管理器（或其它可读写Android/data的文件管理器）
2. GKD~~（这不废话）~~
3. 已经导出好的转换结果

# 开始

## 第一步

在GKD导入下面的订阅：

\`\`\`text
https://ltt2gkd.adproqwq.xyz/subscription/1919810.json5
\`\`\`

## 第二步

用MT管理器打开下面的路径：

\`\`\`text
Android/data/li.songe.gkd/files/subscription
\`\`\`

## 第三步

将网站的导出结果复制替换进去

可选：你可以打开导出结果（或者直接在网站上），把里面的name改成你喜欢的名字，这是订阅显示的名字

## 第四步

强行停止GKD，重新打开GKD
`;

document.getElementsByClassName('container')[0].innerHTML = DOMPurify.sanitize(marked.parse(tutoril));