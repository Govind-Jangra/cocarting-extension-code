const OpenAI = require("openai");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
const { dirname } = require("path");
const { fileURLToPath } = require("url");


dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: openaiApiKey
});

async function runHTMLFileSearch(htmlContent) {
    const fileName = "temp_" + Date.now() + ".html";  
    const filePath = path.join(__dirname, fileName);
    try {
        console.log("entering....");

        fs.writeFileSync(filePath, htmlContent, 'utf8');

        const assistant = await openai.beta.assistants.create({
            name: "Product Info Extractor",
            instructions: `Objective:
  The provided HTML file contains product information. Your task is to generate querySelectors to extract the following key details from the product page:

  Product Title: Extract the exact title of the main product.
  Current Price: Extract the current price with the currency, ensuring no extraction of multiple numbers.
  MRP Price: Extract the original MRP price, ensuring no extraction of multiple numbers.
  Product Rating: Extract the rating (only the numeric value, e.g., 4.0).
  Image URL: Extract the main product image URL.
  Instructions:

  Analyze the HTML:

  Review the HTML structure to identify classes, IDs, or tags related to the required elements.
  Ensure the selected identifiers can be generalized across other product pages from the same website.
  Identify and Test CSS Selectors:

  Create specific CSS selectors (preferably using class names or IDs) for each product attribute.
  Ensure the selectors are accurate, resilient to variations in HTML structure, and work across multiple product pages.
  Validate the Selectors:

  Test each querySelector to ensure it returns the expected values.
  If a selector fails or returns null, retry with a different approach, such as inspecting alternative elements.
  Output Format:
  For each attribute, return a JSON object that includes:

  The querySelector used for that element.
  A valid flag indicating if the selector accurately extracted the data (true if successful, false if not).
  Important Considerations:

  Generalization: Avoid using overly specific selectors that may not work across all product pages.
  Resilience: Selectors should handle minor changes in the HTML structure.
  Verification: Ensure the selectors accurately target the specific data without capturing nested or irrelevant elements.
  You have to just give me the string part <unique querySelector> so that i can use in dom to extract details document.querySelector('<unique querySelector>').textContent.trim()
  Example Response:

  {
    "productTitle": "<unique querySelector>"
    "currentPriceSelector":"<unique querySelector>"
    "mrpPriceSelector":"<unique querySelector>"
    "ratingSelector":"<unique querySelector>"
    "imageSelector":"<unique querySelector>" 
  }
  `,
            model: "gpt-4o-mini", 
            tools: [{ type: "file_search" }],
        });

        const fileStream = fs.createReadStream(filePath);
        
        // Create a vector store including our two files.
        let vectorStore = await openai.beta.vectorStores.create({
            name: "Temp",
        });
        
        await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {
            files: [fileStream],
        });

        await openai.beta.assistants.update(assistant.id, {
            tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
        });

        const thread = await openai.beta.threads.create({
            messages: [
                {
                    role: "user",
                    content: "Lets try on this file",
                },
            ],
        });

        const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: assistant.id,
        });

        const messages = await openai.beta.threads.messages.list(thread.id, {
            run_id: run.id,
        });

        const message = messages.data.pop();
        const res = "";
        if (message.content[0].type === "text") {
            const text = message.content[0].text;

            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                response_format: { type: "json_object" },
                messages: [
                    {
                        role: 'system',
                        content: `
                            You are provided with output that is not valid JSON. Your task is to return it in the correct JSON format.
                            Please structure the response as:
            
                            {
                                "productTitle": "<unique querySelector>",
                                "currentPriceSelector": "<unique querySelector>",
                                "mrpPriceSelector": "<unique querySelector>",
                                "ratingSelector": "<unique querySelector>",
                                "imageSelector": "<unique querySelector>"
                            }
            
                            Make sure the output is a valid JSON object with the correct syntax and properly escaped quotes. 
                            If the selector is null or undefined do not include in response
                        `
                    },
                    {
                        role: 'user',
                        content: text // Pass the variable with the text that needs to be formatted as JSON
                    }
                ],
            });

            fs.unlinkSync(filePath);
            const selectors = response.choices[0].message.content.trim();
            return JSON.parse(selectors);
        }

    } catch (error) {
        fs.unlinkSync(filePath);
        process.exit(1);
    }
}

module.exports = runHTMLFileSearch;
