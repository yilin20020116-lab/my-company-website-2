const https = require('https');

https.get(`https://api.github.com/repos/yilin20020116-lab/companyweb-images/commits?t=${Date.now()}`, {
  headers: {
    'User-Agent': 'Node.js',
    'Cache-Control': 'no-cache'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const commits = JSON.parse(data);
      if(commits.length > 0) {
        console.log(commits[0].sha, commits[0].commit.author.date, commits[0].commit.message);
      }
    } catch(e) {
      console.log(data);
    }
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
