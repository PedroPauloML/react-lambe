const functions = require('firebase-functions');
const cors = require("cors")({ origin: true })
const fs = require("fs")
const uuid = require("uuid-v4")
const { Storage } = require("@google-cloud/storage")
const storage = new Storage({
  projectId: "lambe-e36d9",
  keyFilename: "lambe-e36d9.json"
})

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.uploadImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    try {
      fs.writeFileSync(
        "/tmp/imageToSave.jpg", // path temp
        request.body.image, // image file
        "base64" // enconding type
      )
      const buckect = storage.bucket("lambe-e36d9.appspot.com")
      const id = uuid()
      bucket.upload("/tmp/imageToSave.jpg", {
        uploadType: "media",
        destination: `/posts/${id}.jpg`,
        metadata: {
          metadata: {
            contentType: "image/jpeg",
            firebaseStorageDownloadTokens: id
          }
        }
      }, (err, file) => {
        if (err) {
          console.log(err)
          return response.status(500).json({ error: err })
        } else {
          const filename = encodeURIComponent(file.name)
          const imageUrl = "https://firebase.googleapis.com/v0/b/"
            + buckect.name + "/o/" + filename + "?alt=media&token=" + id
          return response.status(201).json({ imageUrl: imageUrl })
        }
      })
    } catch (err) {
      console.log(err)
      return response.status(500).json({ error: err })
    }
  })
});