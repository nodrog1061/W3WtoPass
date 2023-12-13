/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require('firebase-functions/v2/https');
// const timePlans = require("./timePlans");

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const usersCol = db.collection('users');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// const requireJSON = (req, res) => {
//   // get the content type header from the request variable

//   try {
//     const contentType = req.headers['content-type'];
//   } catch (error) {
//     return res.status(400).send('Invalid content type');
//   }

//   if (!contentType.includes('application/json')) {
//     return res.status(400).send('Invalid content type');
//   }
// };

exports.automatedRegistration = onRequest(async (request, response) => {
  let uid = Math.floor(1000 + Math.random() * 9000);
  const timePlan = Math.floor(Math.random() * 3) + 1;

  let snapshot = await admin.firestore()
      .collection('users')
      .doc(uid.toString())
      .get();

  while (snapshot.exists) {
    uid = Math.floor(Math.random() * 99999) + 1;

    snapshot = await admin.firestore()
        .collection('users')
        .doc(uid.toString())
        .get();
  }
  const dataToServer = {
    uid: uid,
    timePlan: timePlan,
    savedLocation: [],
    savedW3W: [],
    savedAttemptes: {
      bbb: 'bbb',
    },
    accountRegistratedAt: new Date().toISOString(),
    accountSetupCompleted: false,
  };
  await usersCol.doc(uid.toString()).set(dataToServer);

  const dataToRespond = {
    uid: uid,
    timePlan: timePlan,
  };
  response.json(dataToRespond);
});

exports.checkID = onRequest(async (request, response) => {
  const Body = request.body;

  if (!Body.uid) {
    return response.status(400).send('UID is required');
  }

  await admin.firestore()
      .collection('users')
      .doc(Body.uid.toString())
      .get()
      .then(function(doc) {
        if (doc.exists) {
          const dataToRespond = {
            uid: doc.data().uid,
            accountSetupCompleted: doc.data().accountSetupCompleted,
          };
          response.json(dataToRespond);
        } else {
          response.status(400).send('User does not exist');
        }
      }).catch(function(error) {
        response.status(400).send('Error getting document: ' + error);
      });
});


exports.signUp = onRequest(async (request, response) => {
  const Body = request.body;

  if (!Body.uid) {
    return response.status(400).send('UID is required');
  }

  if (!Body.lat || !Body.long) {
    return response.status(400).send('Location is required');
  }

  if (!Body.w3w) {
    return response.status(400).send('W3W is required');
  }

  const snapshot = await admin.firestore()
      .collection('users')
      .doc(Body.uid.toString())
      .get();
  if (!snapshot.exists) {
    return response.status(400).send('User does not exist');
  }
  if (snapshot.data().accountSetupCompleted) {
    return response.status(400).send('User already setup');
  }


  usersCol.doc(Body.uid.toString()).update(
      {
        savedLocation: [request.body['lat'], request.body['long']],
        savedW3W: request.body['w3w'],
        accountSetupCompleted: true,
      },
  ).then(function() {
    return response.status(200).send('Successfully updated!');
  }).catch(function(error) {
    return response.status(400).send('Error updating document: ' + error);
  });
});

exports.startLogin = onRequest(async (request, response) => {
  const Body = request.body;

  if (!Body.uid) {
    return response.status(400).send('UID is required');
  }

  const cod = usersCol.doc(Body.uid.toString());

  console.log((await cod.get()).data()['savedAttemptes']);

  cod.update(
      {
        savedAttemptes: {
          ...(await cod.get()).data()['savedAttemptes'],
          [new Date().toLocaleDateString()]: {
            start: new Date().toISOString(),
          },
        },
      },
  ).then(function() {
    return response.status(200).send('Successfully updated!');
  }).catch(function(error) {
    return response.status(400).send('Error updating document: ' + error);
  });
});

exports.login = onRequest(async (request, response) => {
  const Body = request.body;

  if (!Body.uid) {
    return response.status(400).send('UID is required');
  }

  if (!Body.lat || !Body.long) {
    return response.status(400).send('Location is required');
  }

  if (!Body.w3w) {
    return response.status(400).send('W3W is required');
  }

  const cod = usersCol.doc(Body.uid.toString());
  const respo = (await cod.get()).data();

  if (
    Body.w3w[0] === respo['savedW3W'][0] &&
        Body.w3w[1] === respo['savedW3W'][1] &&
        Body.w3w[2] === respo['savedW3W'][2]
  ) {
    if (getDistFromLatLonInKm(
        Body.lat,
        Body.long,
        respo.savedLocation[0],
        respo.savedLocation[1]) <=
            0.5) {
      cod.update(
          {
            savedAttemptes: {
              ...(await cod.get()).data()['savedAttemptes'],
              [new Date().toLocaleDateString()]: {
                end: new Date().toISOString(),
              },
            },
          },
      ).then(function() {
        return response.status(200).send('Ok');
      }).catch(function(error) {
        return response.status(400).send('Error updating document: ' + error);
      });
    } else {
      cod.update(
          {
            savedAttemptes: {
              ...(await cod.get()).data()['savedAttemptes'],
              [new Date().toLocaleDateString()]: {
                [new Date().toISOString()]: 'Wrong location',
              },
            },
          },
      ).then(function() {
        return response.status(401).send('Wrong location');
      }).catch(function(error) {
        return response.status(401).send('Error updating document: ' + error);
      });
    }
  } else {
    cod.update(
        {
          savedAttemptes: {
            ...(await cod.get()).data()['savedAttemptes'],
            [new Date().toLocaleDateString()]: {
              [new Date().toISOString()]: 'Wrong W3W',
            },
          },
        },
    ).then(function() {
      return response.status(401).send('Wrong W3W');
    }).catch(function(error) {
      return response.status(401).send('Error updating document: ' + error);
    });
  }
  return response.status(401).send('An error occured');
});


/**
 * Calculates the distance between two coordinates in kilometers.
 * @param {number} lat1 - Latitude of the first coordinate.
 * @param {number} long1 - Longitude of the first coordinate.
 * @param {number} lat2 - Latitude of the second coordinate.
 * @param {number} long2 - Longitude of the second coordinate.
 * @return {number} - Distance between the two coordinates in kilometers.
 */
function getDistFromLatLonInKm(lat1, long1, lat2, long2) {
  const R = 6371; // Rad of Earth in Km
  const dLat = deg2Rad(lat2 - lat1);
  const dLong = deg2Rad(long2 - long1);
  const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2Rad(lat1)) * Math.cos(deg2Rad(lat2)) *
                Math.sin(dLong / 2) * Math.sin(dLong / 2)
                ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

/**
 * Converts degrees to radians.
 * @param {number} deg - Degree value to be converted to radians.
 * @return {number} - Radian value.
 */
function deg2Rad(deg) {
  return deg * (Math.PI / 180);
}
