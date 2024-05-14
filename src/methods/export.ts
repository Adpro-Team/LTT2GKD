import json5 from 'json5';

export const exportJSON = () => {
  const GKDRules = json5.parse((document.getElementById('gkd-rules-hidden')! as HTMLTextAreaElement).value);

  const blob = new Blob([JSON.stringify(GKDRules)], {
    type: 'application/json'
  });
  const downloadURL = URL.createObjectURL(blob);
  const aTag = document.createElement('a');
  aTag.href = downloadURL;
  aTag.download = '-2.json';
  aTag.click();
  URL.revokeObjectURL(downloadURL);

  document.getElementById('export-message')!.style.display = 'block';
}