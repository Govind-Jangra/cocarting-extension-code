const axios = require('axios');

// Fetch dynamic selectors based on website name
async function fetchSelectors(websiteName) {
    try {
        const response = await axios.post('https://cron-job-9njv.onrender.com/selector', {
            website_name: websiteName
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status !== 200) throw new Error(`Failed to fetch selectors: ${response.status}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching selectors:", error);
        return null;
    }
}

module.exports = { fetchSelectors };
