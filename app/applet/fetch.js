import http from "http";

http.get("http://www.ezhouxx.com/product/579.html", (res) => {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    const textContent = data.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                            .replace(/<[^>]+>/g, '\n')
                            .replace(/\n\s+\n/g, '\n\n');
    console.log(textContent.substring(textContent.indexOf('内定径钢骨架增强聚乙烯复合管'), textContent.indexOf('内定径钢骨架增强聚乙烯复合管') + 5000));
  });
});
