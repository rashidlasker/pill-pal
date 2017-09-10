var Alexa = require('alexa-sdk');
var http = require('http');

var welcomeMessage = "Hello! You can ask me for help. What will it be?";

var welcomeReprompt = "You can ask me for your schedule or say help. What will it be?";

var HelpMessage = "Here are some things you can say: Check if I've taken my medicine. Refill my prescriptions. Contact my doctor.  What would you like to do?";

var moreInformation = "See your Alexa app for  more  information."

var tryAgainMessage = "please try again."

var noMedicineErrorMessage = "What medicine was that? " + tryAgainMessage;

var goodbyeMessage = "OK, good bye.";

var newline = "\n";

var output = "";

var alexa;

var newSessionHandlers = {
    'LaunchRequest': function () {
        output = "hello 1";
        this.emit(':ask', output, welcomeReprompt);
    },
    'CheckIntent': function () {
        output = "hello 2";
        this.emit(':tell', output);
    },
    'ConfirmAdherenceIntent': function () {
        output = "hello 3";
        this.emit(':tell', output);
    },
    'DoctorContactIntent': function(){
        output = "hello 4";
        this.emit(':tell', output);
    },
    'DoctorIntent': function(){
        output = "hello 5";
        this.emit(':tell', output);
    },
    'ManualAdherenceIntent': function(){
        output = "hello 6";
        this.emit(':tell', output);
    },
    'NextDoseIntent': function(){
        output = "hello 7";
        this.emit(':tell', output);
    },
    'PharmacyInfoIntent': function(){
        output = "hello 8";
        this.emit(':tell', output);
    },
    'RefillIntent': function(){
        output = "hello 9";
        this.emit(':tell', output);
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

exports.handler = function (event, context, callback) {
    alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandlers);
    alexa.execute();
};

String.prototype.trunc =
    function (n) {
        return this.substr(0, n - 1) + (this.length > n ? '&hellip;' : '');
    };
