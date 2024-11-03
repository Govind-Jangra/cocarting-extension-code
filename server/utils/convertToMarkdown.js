const convertHtmlToMarkdown = require('dom-to-semantic-markdown').convertHtmlToMarkdown;
const JSDOM = require('jsdom').JSDOM;

function convertToMarkdown(html) {
    const dom = new JSDOM(html);
    const markdown = convertHtmlToMarkdown(html, { overrideDOMParser: new dom.window.DOMParser() });
    return markdown;
}

module.exports = convertToMarkdown;
