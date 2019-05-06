const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const {dialogflow} = require('actions-on-google');
const app = dialogflow({debug:true});

var jonaResponses = [
'Für $vorname werden schöne Tage kommen. Ich sage nur 15ter Mai.',
'$vorname steht kurz vor der Fahrradprüfung.',
'Wieder ein Sprung ins kalte Wasser des Blütenbades in Leichlingen für $vorname.',
'Happy brithday to you soon, liebe $vorname.'
];

var johannResponses = [
'$vorname hat sich den Arm gebrochen!',
'Leider hat $vorname seinen Arm im Gips!',
'Der Rechte Arm von $vorname ist geschient!',
'Du kannst $vorname zur Zeit nur die linke Hand geben!'
];

var janaResponses = [
'$vorname feierte am Sonntag ihre Erstkommunion!',
'Am 28.04.2019 hatte $vorname ihre erste heilige Kommonunion.',
'Am Sonntag ist für $vorname ein ganz besonderer Tag!',
'Nächsten Sonntag steht $vorname ganz im Mittelpunkt!'
];

var defaultResponses = [
'Muss!',
'$vorname geht es gut!',
'Für $vorname gibt es zur Zeit nichts zu klagen!',
'Soweit ich weis, ist bei $vorname alles ok!'
];

function getResponse(responseArray, name) {
  var rand = responseArray[Math.floor(Math.random() * responseArray.length)];
  return rand.replace("$vorname", name);
}

app.intent('Wie geht es', (conv,{vorname}) => {
	switch (vorname.toLowerCase()) {
		case 'jona':
		  conv.ask(getResponse(jonaResponses,vorname))
		  break;
		case 'johann':
		  conv.ask(getResponse(johannResponses,vorname))
		  break;
		case 'jana':
		  conv.close(getResponse(janaResponses,vorname))
		  break;
		default:
		  conv.close(getResponse(defaultResponses,vorname))
		  //conv.close(defaultResponses[0])
	}
})

app.intent('Teste alle Antworten', (conv) => {

//	for (index = 0; index < jonaResponses.length; ++index) {
//	    conv.ask(jonaResponses[index].replace("$vorname", "Max"));
//	}
    allResponses=[jonaResponses,johannResponses,janaResponses,defaultResponses]
    conv.close(allResponses.join('.').split("$vorname").join("Max"));
    //close will end the assistant
})



exports.DrThienenkamp = functions.https.onRequest(app)

/*
exports.DrThienenkamp = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
*/