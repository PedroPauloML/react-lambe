const functions = require('firebase-functions');
const cors = require("cors")({ origin: true })
const fs = requure("fs")
const uuid = require("uuid-v4")
const { Storage } = require("@google-cloud/storage")
const storage = new Storage({
  projectId: "lambe-e36d9",
  keyFilename: "lambe-e36d9.json"
})

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    
  })
});
