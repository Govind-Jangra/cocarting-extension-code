var OpenAI = require('openai');
var dotenv = require('dotenv');

dotenv.config();

var openaiApiKey = process.env.OPENAI_API_KEY;
var openai = new OpenAI({
  apiKey: openaiApiKey
});

/**
 * Extract product information from markdown content using OpenAI API.
 *
 * @param {string} markdownContent - The markdown content containing product details.
 * @returns {Promise<object|null>} - A promise that resolves to an object containing the extracted product information, or null if an error occurs.
 */
function generateTwoMoreUrl(markdownContent, url) {
  var systemPrompt = {
    role: 'system',
    content: 'You are given the markdown content of an e-commerce product page. This page contains multiple links, including links to other product pages on the same e-commerce website. Your task is to extract 3 URLs that specifically link to other product pages on the same domain. The current page’s URL is ' + url + ' —this is also a product page. Please ensure that the URLs you extract are for product pages (not categories, blogs, or other types of pages).\nReturn in JSON format:\n{\n    "moreUrl": ["url1", "url2", "url3"]\n}'
  };

  var userPrompt = {
    role: 'user',
    content: markdownContent
  };

  return openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: "json_object" },
    messages: [systemPrompt, userPrompt]
  })
  .then(function(response) {
    var extractedData = response.choices[0].message.content.trim();
    return JSON.parse(extractedData);
  })
  .catch(function(error) {
    console.error('Error extracting product information:', error);
    return null;
  });
}

module.exports = generateTwoMoreUrl;
