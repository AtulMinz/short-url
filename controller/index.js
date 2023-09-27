const shortid = require('shortid')
const URL = require('../model/url');

async function handleCreateURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const shortID = shortid();
  
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });
  
    res.render('home', { id : shortID })
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  })
}

async function handleRedirect(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (entry && entry.redirectURL) {
    res.redirect(entry.redirectURL);
  } else {
    // Handle the case when entry or redirectURL is null or undefined
    res.status(404).json({ error: "URL not found" });
  }
}

module.exports = { handleCreateURL, handleGetAnalytics, handleRedirect };