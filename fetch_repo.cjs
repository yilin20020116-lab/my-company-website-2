const https = require('https');

https.get('https://api.github.com/repos/yilin20020116-lab/companyweb-images/git/trees/main?recursive=1', {
  headers: {
    'User-Agent': 'Node.js'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
