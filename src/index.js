var Alexa = require('alexa-sdk');
var http = require('http');

var states = {
    SEARCHMODE: '_SEARCHMODE',
    TOPFIVE: '_TOPFIVE',
};

var location = "Charlottesville";

var numberOfResults = 3;

var APIKey = "4844d21f760b47359945751b9f875877";

var welcomeMessage = location + " Guide. You can ask me for an attraction or say help. What will it be?";

var welcomeRepromt = "You can ask me for an attraction or say help. What will it be?";

var locationOverview = "Charlottesville is an independent city in the Commonwealth of Virginia. As of the 2010 census, the population was 48,210. It is the county seat of Albemarle County, which surrounds the city, though the two are separate legal entities. It is named after the British Queen Charlotte of Mecklenburg-Strelitz. Charlottesville was the home of two Presidents, Thomas Jefferson and James Monroe. While both served as Governor of Virginia, they lived in Charlottesville, and traveled to and from Richmond, along the 71-mile historic Three Notch'd Road. Charlottesville is well known for its restaurants, vineyards, as well as the University of Virginia.";

var HelpMessage = "Here are some things you can say: Give me an attraction. Tell me about " + location + ". Tell me the top five things to do.  What would you like to do?";

var moreInformation = "See your  Alexa app for  more  information."

var tryAgainMessage = "please try again."

var noAttractionErrorMessage = "What attraction was that? " + tryAgainMessage;

var topFiveMoreInfo = " You can tell me a number for more information. For example, open number one.";

var getMoreInfoRepromtMessage = "What number attraction would you like to hear about?";

var getMoreInfoMessage = "OK, " + getMoreInfoRepromtMessage;

var goodbyeMessage = "OK, have a nice time in " + location + ".";

//var newsIntroMessage = "These are the " + numberOfResults + " most recent " + location + " headlines, you can read more on your Alexa app. ";

var hearMoreMessage = "Would you like to hear about another top thing that you can do in " + location +"?";

var newline = "\n";

var output = "";

var alexa;

var attractions = [
    { name: "IX Art Park", content: "Imagine a walk-through, sculptural, mural-festooned Mecca that's free and open for the public to wander, night and day. Welcome to the IX Art Park: a public, non-commercial, interactive space for spontaneous dreaming – for residents, visitors, families and solo acts.", location: "The park is located off the downtown mall. \n Street address: 522 2nd Street SE in Charlottesville, Virginia", contact: "info@ixartpark.com" },
    { name: "Monticello", content: "Monticello was the primary plantation of Thomas Jefferson, the third President of the United States, who began designing and building Monticello at age 26 after inheriting land from his father. Today, guided tours are provided daily throughout the year.", location: "931 Thomas Jefferson Pkwy, Charlottesville, VA 22902", contact: "434 984 9822" },
    { name: "The Rotunda", content: "The Rotunda at the University of Virginia was designed by Thomas Jefferson as the architectural and academic heart of the University’s community of scholars. He named the University’s original buildings the “Academical Village.” As the phrase suggests, the Academical Village is based on the Jeffersonian principle that learning is a lifelong process, and that interaction between faculty and students is vital to the pursuit of knowledge.", location: "1826 University Ave, Charlottesville, VA 22904", contact: "434 924 7969" },
    { name: "The Downtown Mall", content: "Maintained by the Charlottesville Parks and Recreation Department, the Historic Downtown Mall is considered one of the finest urban parks in the country.  This pedestrian mall is home to a vibrant collection of more than 120 shops and 30 restaurants located in the historic buildings on and around old Main Street Charlottesville.", location: "248 Water St E, Charlottesville, VA 22902", contact: "downtown charlottesville dot net" },
    { name: "Humpback Rocks", content: "Humpback Rock is a steep, but popular trail in the northern section of the Blue Ridge Parkway with great views. It is a must see for hikers in the area", location: "Humpback Rock, Rockfish, VA 22920", contact: "540 943 4716" },
];

var topFive = [
    { number: "1", caption: "Watch the sunset at the Thursday Evening Sunset Series at Carter Mountain", more: "One of our favorite traditions on Carter Mountain is the Thursday Evening Sunset Series! Each Thursday from mid-May through the end of September, the Carter Mountain orchard stays open til 9pm. Join them for dinner, live music, wine and hard cider, hayrides, and the best view of a sunset anywhere! It’s free admission! Bring lawn chairs and blankets, or come early for a picnic table.", location: "1435 Carters Mountain Trail Charlottesville, VA 22901", contact: "434 977 1833" },
    { number: "2", caption: "Get shopping at the Charlottesville City Market", more: "A producer only market of farmers, food vendors, crafts, and artisans since 1973 – The Charlottesville City Market is held every Saturday from 7:00am till Noon from April through December. City Market offers fresh produce, herbs, plants, grass fed meats, crafts, and baked goods from local vendors every Saturday, April – December.  The market features over 100 vendors every Saturday morning.", location: "Downtown Charlottesville at Water Street and South Street between 1st and 2nd.", contact: "434 970 3371" },
    { number: "3", caption: "Watch a show at Jefferson Theater", more: "Located on Charlottesville’s historic Downtown Mall, the Jefferson Theater was established in 1912 as a live performance theater that played host to silent movies, vaudeville acts and a historic list of live performers, ranging from Harry Houdini to The Three Stooges. In addition, state‐of‐the-art sound and lighting systems and treatments to the theater’s acoustics make The Jefferson an excellent environment to experience live music. The venue now plays host to a range of genres including rock, bluegrass, reggae, country, metal and hip-hop.", location: "110 E Main St, Charlottesville, VA 22902", contact: "434 245 4980" },
    { number: "4", caption: "Experience local food at Feast!", more: "Feast! is a specialty food store that has been serving the Central Virginia community since its inception in 2002. This independently owned store offers an in-house cafe, catering services, and handmade gift hampers for several occasions. Most of what is sold in the shop comes from local farmers and artisans, and it is fresh, seasonal, and of superb quality. You can taste a lot of what they have to offer in their nice little café where they sell excellent sandwiches and soups. Ask for their daily specials.", location: "416 West Main St., Suite H Charlottesville, VA 22903 ", contact: "info@feastvirginia.com \n 434 244 7800 " },
    { number: "5", caption: "Visit the Academical Village at the University of Virginia.", more: "The University of Virginia’s Academical Village, which is nearing its 200th anniversary, is unique in many respects, not the least of which is that it is the vision of one man, Thomas Jefferson, who conceived of the University and designed it.", location: "1826 University Ave, Charlottesville, VA 22904", contact: "virginia.edu" }
];

var topFiveIntro = "Here are the top five things to  do in " + location + ".";

var newSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = states.SEARCHMODE;
        output = welcomeMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
    'getOverview': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getOverview');
    },
//    'getNewsIntent': function () {
//        this.handler.state = states.SEARCHMODE;
//        this.emitWithState('getNewsIntent');
//    },
    'getAttractionIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getAttractionIntent');
    },
    'getTopFiveIntent': function(){
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getTopFiveIntent');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
};

var startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {
    'getOverview': function () {
        output = locationOverview;
        this.emit(':tellWithCard', output, output, locationOverview);
    },
    'getAttractionIntent': function () {
        var cardTitle = location;
        var cardContent = "";

        var attraction = attractions[Math.floor(Math.random() * attractions.length)];
        if (attraction) {
            output = attraction.name + " " + attraction.content + newline + moreInformation;
            cardTitle = attraction.name;
            cardContent = attraction.content + newline + attraction.contact;

            this.emit(':tellWithCard', output, cardTitle, cardContent);
        } else {
            this.emit(':ask', noAttractionErrorMessage, tryAgainMessage);
        }
    },
    'getTopFiveIntent': function () {
        output = topFiveIntro;
        var cardTitle = "Top Five Things To See in " + location;

        for (var counter = topFive.length - 1; counter >= 0; counter--) {
            output += " Number " + topFive[counter].number + ": " + topFive[counter].caption + newline;
        }
        output += topFiveMoreInfo;
        this.handler.state = states.TOPFIVE;
        this.emit(':askWithCard', output, topFiveMoreInfo, cardTitle, output);
    },
    'AMAZON.YesIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.NoIntent': function () {
        output = HelpMessage;
        this.emit(':ask', HelpMessage, HelpMessage);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },
//    'getNewsIntent': function () {
//        httpGet(location, function (response) {
//
//            // Parse the response into a JSON object ready to be formatted.
//            var responseData = JSON.parse(response);
//            var cardContent = "Data provided by New York Times\n\n";
//
//            // Check if we have correct data, If not create an error speech out to try again.
//            if (responseData == null) {
//                output = "There was a problem with getting data please try again";
//            }
//            else {
//                output = newsIntroMessage;
//
//                // If we have data.
//                for (var i = 0; i < responseData.response.docs.length; i++) {
//
//                    if (i < numberOfResults) {
//                        // Get the name and description JSON structure.
//                        var headline = responseData.response.docs[i].headline.main;
//                        var index = i + 1;
//
//                        output += " Headline " + index + ": " + headline + ";";
//
//                        cardContent += " Headline " + index + ".\n";
//                        cardContent += headline + ".\n\n";
//                    }
//                }
//
//                output += " See your Alexa app for more information.";
//            }
//
//            var cardTitle = location + " News";
//
//            alexa.emit(':tellWithCard', output, cardTitle, cardContent);
//        });
//    },

    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

var topFiveHandlers = Alexa.CreateStateHandler(states.TOPFIVE, {
    'getAttractionIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getAttractionIntent');
    },
    'getOverview': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getOverview');
    },
    'getTopFiveIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getTopFiveIntent');
    },
    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },

    'getMoreInfoIntent': function () {
        var slotValue = 0;
        if(this.event.request.intent.slots.attraction ) {
            if (this.event.request.intent.slots.attraction.value) {
                slotValue = this.event.request.intent.slots.attraction.value;

            }
        }

        if (slotValue > 0 && slotValue <= topFive.length) {

            var index = parseInt(slotValue) - 1;
            var selectedAttraction = topFive[index];

            output = selectedAttraction.caption + ". " + selectedAttraction.more + ". " + hearMoreMessage;
            var cardTitle = selectedAttraction.name;
            var cardContent = selectedAttraction.caption + newline + newline + selectedAttraction.more + newline + newline + selectedAttraction.location + newline + newline + selectedAttraction.contact;

            this.emit(':askWithCard', output, hearMoreMessage, cardTitle, cardContent);
        } else {
            this.emit(':ask', noAttractionErrorMessage);
        }
    },

    'AMAZON.YesIntent': function () {
        output = getMoreInfoMessage;
        alexa.emit(':ask', output, getMoreInfoRepromtMessage);
    },
    'AMAZON.NoIntent': function () {
        output = goodbyeMessage;
        alexa.emit(':tell', output);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
    },

    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

exports.handler = function (event, context, callback) {
    alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandlers, startSearchHandlers, topFiveHandlers);
    alexa.execute();
};

// Create a web request and handle the response.
function httpGet(query, callback) {
    console.log("/n QUERY: "+query);

    var options = {
        //http://api.nytimes.com/svc/search/v2/articlesearch.json?q=seattle&sort=newest&api-key=
        host: 'api.nytimes.com',
        path: '/svc/search/v2/articlesearch.json?q=' + query + '&sort=newest&api-key=' + APIKey,
        method: 'GET'
    };

    var req = http.request(options, (res) => {

            var body = '';

    res.on('data', (d) => {
        body += d;
});

    res.on('end', function () {
        callback(body);
    });

});
    req.end();

    req.on('error', (e) => {
        console.error(e);
});
}

String.prototype.trunc =
    function (n) {
        return this.substr(0, n - 1) + (this.length > n ? '&hellip;' : '');
    };
