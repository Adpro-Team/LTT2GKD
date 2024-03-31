function exportJSON(){
  const GKDRules = JSON.parse(JSON.stringify(thisSub));

  const blob = new Blob([JSON.stringify(GKDRules)], {
    type: 'application/json'
  });
  const downloadURL = URL.createObjectURL(blob);
  const aTag = document.createElement('a');
  aTag.href = downloadURL;
  aTag.download = '-2.json';
  aTag.click();
  URL.revokeObjectURL(downloadURL);

  document.getElementById('export-message').innerText = '已调用浏览器下载';
}