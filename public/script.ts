import { JSDOM } from 'jsdom';
fetch('http://www.ezhouxx.com/product/569.html').then(r=>r.text()).then(t => {  
  const dom = new JSDOM(t);
  const elements = dom.window.document.querySelectorAll('.pro_con, .content, article, main');
  elements.forEach(e => console.log(e.textContent.trim()));
});
