import express from "express";
//const gplay = require('google-play-scraper');
const app = express();
const PORT = 3000;
import gplay from "google-play-scraper";

// Define the endpoint
app.get('/app', async (req, res) => {
    const { appid, country, lang } = req.query;

    // Validate required parameter
    if (!appid) {
        return res.status(400).json({ error: 'Missing required parameter: appid' });
    }

    const options = {
        num: 1000,
        sort: gplay.sort.NEWEST,
        appId: appid,
    };

    if (country) options.country = country;
    if (lang) options.lang = lang;

    try {
        // Fetch app details from Google Play Store
        var reviews = await gplay.reviews(options);

        console.log(reviews);
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch app details' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});