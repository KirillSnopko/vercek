import gplay from 'google-play-scraper';

// Define the endpoint
export default async (req, res) => {
    const { appid, country } = req.query;

    // Validate required parameter
    if (!appid) {
        return res.status(400).json({ error: 'Missing required parameter: appid' });
    }

    try {
        // Fetch app details from Google Play Store
        var reviews = await gplay.reviews({
            appId: appid,
            country: country,
            sort: gplay.sort.NEWEST,
            num: 1000
        });

        console.log(reviews);
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch app details' });
    }
};

