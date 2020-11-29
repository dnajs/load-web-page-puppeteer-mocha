// Mocha Specification Cases

// Imports
const assert =       require('assert');
const browserReady = require('./browser-ready');
const cheerio =      require('cheerio');
const puppeteer =    require('puppeteer');

// Setup
const pageUrl = 'https://pretty-print-json.js.org/';
let web;  //fields: browser, page, response, url, status, statusText, html
let $;
const loadWebPage = () => puppeteer.launch()
   .then(browserReady(pageUrl))
   .then(ready => web = ready)
   .then(() => $ = cheerio.load(web.html));
const closeWebPage = () => web.browser.close();

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {
   before(loadWebPage);
   after(closeWebPage);

   it('has the correct URL -> ' + pageUrl, () => {
      const actual =   { url: web.url };
      const expected = { url: pageUrl };
      assert.deepStrictEqual(actual, expected);
      });

   it('has exactly one header, main, and footer', () => {
      const actual =   {
         header: $('body >header').length,
         main:   $('body >main').length,
         footer: $('body >footer').length,
         };
      const expected = { header: 1, main: 1, footer: 1 };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The document content', () => {
   before(loadWebPage);
   after(closeWebPage);

   it('has a 🚀 traveling to 🪐!', () => {
      const actual =   { '🚀': !!web.html.match(/🚀/g), '🪐': !!web.html.match(/🪐/g) };
      const expected = { '🚀': true,                    '🪐': true };
      assert.deepStrictEqual(actual, expected);
      });

   });