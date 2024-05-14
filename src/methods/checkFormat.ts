import json5 from 'json5';
import { convert } from './convert';

export const checkFormat = () => {
  const lttSub = (document.getElementById('ltt-rules')! as HTMLTextAreaElement).value;
  try {
    json5.parse(lttSub);
  }
  catch (err) {
    alert(`规则格式检测检测到了错误，错误信息如下：\r${err}`);
  }
  convert(json5.parse(lttSub));
}