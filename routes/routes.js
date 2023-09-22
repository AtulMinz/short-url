const express = require('express');

const { handleCreateURL, handleGetAnalytics, handleRedirect } = require('../controller/index')

const router = express.Router();

router.post("/", handleCreateURL);

router.get('/analytics/:shortId', handleGetAnalytics);

router.get('/:shortId', handleRedirect);

module.exports = router;