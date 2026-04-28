const https = require('https');

https.get('https://api.github.com/repos/yilin20020116-lab/companyweb-images/git/trees/main?recursive=1', {headers: {'User-Agent': 'node.js'}}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    if (!json.tree) return console.log(json);
    console.log(JSON.stringify(json.tree.map(f => f.path).filter(p => !p.startsWith('.')), null, 2));
  });
});
