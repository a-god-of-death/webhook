// Import express (after running 'npm install express').
const express = require("express");
const app = express();

// Configure server. 
const PORT = 8080;

// Decode JSON data.
app.use(express.json({ limit: "25mb" }));
let blocks = [];
let createdContracts = [];
let transactionLog = [];

// Create a route for the app.
app.get("/", (req, res) => {
    res.send(
        "Welchome to Alchemy Blockchain Information Fetcher. Access the designated endpoints to retrieve the desired information."
    );
});

// Create a POST block-info route. Use as a webhook URL.
app.post("/block-info", (req, res) => {
    const blockInfo = JSON.stringify(req.body.event.data.block);
    blocks.push(blockInfo);

    // Respond with status 200.
    res.send("Success.");
})

// Create a GET block-info route.
app.get("/block-info", (req, res) => {
    res.send(blocks);
});

// Create a POST created-contracts route. Use as a webhook URL.
app.post("/created-contracts", (req, res) => {
    const createdContractsInfo = req.body.event.data.block.logs;

    // Loop over the received object of block transactions 
    // save all transactions in which a contract has been created. 
    for (let transaction of createdContractsInfo) {
        if (transaction.transaction.createdContract) {
            createdContracts.push(transaction);
        }
    }

    // Respond with status 200. 
    res.send("Success.");
});

// Create a GET created-contracts route.
app.get("/created-contracts", (req, res) => {
    res.send(createdContracts);
});

// Create a POST transactions route. Use as a webhook URL.
app.post("/transactions", (req, res) => {
    const transactions = req.body.event.data.block;
    transactionLog.push(transactions);

    // Respond with status 200.
    res.send("Success.");
})

// Create a GET transactions route.
app.get("/transactions", (req, res) => {
    res.send(transactionLog);
});

// Make the server listen to requests.
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
})