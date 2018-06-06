// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information the users
// ===============================================================================
var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

// API POST Requests
// Below code handles when a user submits a form and thus submits data to the server.
// In each of the below cases, when a user submits form data (a JSON object)
// ...the JSON is pushed to the appropriate JavaScript array
// (ex. User fills out a survey... this data is then sent to the server...
// Then the server saves the data to the friendsData array)
    // Note the code here. Our "server" will respond to users with their best match
    // req.body is available since we're using the body-parser middleware
    app.post("/api/friends", function(req, res) {
        
        var bestMatch = {
            name: "",
            photo: "",
            difference: Infinity
        }
        
        var userData = req.body;
        var userScore = userData.scores;
        var totalDifference;
        
        for (var i = 0; i < friendsData.length; i++) {
            var possibleFriend = friendsData[i];
            totalDifference = 0

            console.log(possibleFriend.name);

            for (var j = 0; j < possibleFriend.scores.length; j++) {
                var possibleFriendScore = possibleFriend.scores[j]
                var currentUserScore = userScore[j]

                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(possibleFriendScore));

            }
                if (totalDifference <= bestMatch.difference) {
                    bestMatch.name = possibleFriend.name;
                    bestMatch.photo = possibleFriend.photo;
                    bestMatch.difference = totalDifference;
            }
        }

        friendsData.push(userData);

        res.json(bestMatch);
    });
}