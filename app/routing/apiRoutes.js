var friendData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
  res.json(friendData);
  });

  app.post("/api/friends", function(req, res) {
    var friendObj = friendObject(req);
    if (friendData.length > 1) {
      var bestMatch = matchMe(friendObj);
      res.json(bestMatch);
    }
    friendData.push(friendObj);
    });
};


function friendObject(req) {
    var friendObj = {
    name: req.body.name,
    photo_url: req.body.photo_url,
    scores: [
      Number.parseInt(req.body.question1),
      Number.parseInt(req.body.question2),
      Number.parseInt(req.body.question3),
      Number.parseInt(req.body.question4),
      Number.parseInt(req.body.question5),
      Number.parseInt(req.body.question6),
      Number.parseInt(req.body.question7),
      Number.parseInt(req.body.question8),
      Number.parseInt(req.body.question9),
      Number.parseInt(req.body.question10)
    ]
  };
  return friendObj;
};

function matchMe(friendObj) {
  var bestDiff = 0;
  var bestMatch = {};
  for (var f in friendData) {
    var totalDiff = 0;
    for (var s in friendData[f].scores) {
      totalDiff = totalDiff + (Math.abs(friendData[f].scores[s] - friendObj.scores[s]));
    };
    if (f == 0) {
      bestDiff = totalDiff;
      bestMatch = friendData[f];
    } else {
      if (totalDiff < bestDiff) {
        bestDiff = totalDiff;
        bestMatch = friendData[f];
      };
    };
  };
  return bestMatch;
};