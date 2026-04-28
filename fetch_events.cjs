const https = require('https');

https.get(`https://api.github.com/repos/yilin20020116-lab/companyweb-images/events?t=${Date.now()}`, {
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
      const events = JSON.parse(data);
      events.slice(0, 5).forEach(e => console.log(e.type, e.created_at, e.payload.commits ? e.payload.commits.map(c=>c.message) : ''));
    } catch(e) {
      console.log(data);
    }
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
