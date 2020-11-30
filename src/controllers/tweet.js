const _ = require("lodash");
const async = require("async");

const Tweet = require("../models/tweet");

module.exports = {
  createTweet: async (req, res) => {
    try {
      if (req.body) {
        let tweetData = await new Tweet(req.body);
      
        let saveTweetData = await tweetData.save();
        if (saveTweetData) {
          res.json({
            status: true,
            tweet: saveTweetData,
            message: "Tweet created successfully",
          });
        }
      }
    } catch (err) {
      res.json({
        status: false,
        error: err,
      });
    }
  }

};
