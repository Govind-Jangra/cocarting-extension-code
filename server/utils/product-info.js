const fetchHTML = require('./fetchHTML');
const convertToMarkdown = require('./convertToMarkdown');
const runHTMLFileSearch = require('./runHTMLFileSearch');
const generateMoreUrl = require('./generateMoreUrl');
const storeInMongoDB = require('./storeInMongoDB');

module.exports = async function productInfo(url) {
    const res = [];
    console.log("Processing URL:", url);
    
    // Fetch HTML for the current URL
    const html = await fetchHTML(url);
    const markdown = await convertToMarkdown(html);
    let moreUrls = await generateMoreUrl(markdown, url);
    moreUrls = moreUrls.moreUrl;
    
    console.log("moreUrls", moreUrls);
    
    // Use Promise.all() to process both the original URL and the moreUrls in parallel
    const allUrls = [url].concat(moreUrls);
    const htmlResponses = await Promise.all(
        allUrls.map(async function(tempUrl) {
            try {
                const html = await fetchHTML(tempUrl);
                if (html) {
                    console.log("Processing HTML for URL:", tempUrl);
                    const selector = await runHTMLFileSearch(html);
                    return selector; // Return the extracted selector
                }
            } catch (error) {
                console.error("Error processing URL:", tempUrl, error);
                return null; // In case of error, return null
            }
        })
    );
    
    // Filter out any null results and push valid selectors to `res`
    res.push.apply(res, htmlResponses.filter(function(selector) { return selector !== null; }));
    
    // Initialize productInfo object
    const productInfo = {
        website_name: new URL(url).hostname,
        title: [],
        mrp: [],
        current: [],
        rating: [],
        image: []
    };
    
    // Populate productInfo from the res array
    res.forEach(function(selectors) {
        if (selectors.productTitle) {
            productInfo.title.push(selectors.productTitle.toString());
        }
        if (selectors.currentPriceSelector) {
            productInfo.current.push(selectors.currentPriceSelector.toString());
        }
        if (selectors.mrpPriceSelector) {
            productInfo.mrp.push(selectors.mrpPriceSelector.toString());
        }
        if (selectors.imageSelector) {
            productInfo.image.push(selectors.imageSelector.toString());
        }
        if (selectors.ratingSelector) {
            productInfo.rating.push(selectors.ratingSelector.toString());
        }
    });

    console.log("productinfo", productInfo);
    
    // Store the productInfo in MongoDB
    await storeInMongoDB(productInfo);
    
    // Return the extracted product information
    return productInfo;
};
