const functions = require('firebase-functions');
const admin = require("firebase-admin")
const cors = require('cors')({origin: true});

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const dbApi = require("./db")

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


exports.getPublicEvent = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        if(req.method !== 'GET') {
            return res.status(401).json({
                message: 'Not allowed'
            })
        }
        const eventId = req.query.eventId
        if (!eventId) {
            return res.status(400).json({
                message: 'Event id is needed'
            })
        }
        dbApi.getEvent(db, eventId).then(event => {
            const {guests, ...rest} = event
            return res.status(200).send(rest)
        }).catch(() => {
            return res.status(400).json({
                message: 'no event'
            })
        })
    })
});


exports.setGuestData = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        if(req.method !== 'POST') {
            return res.status(401).json({
                message: 'Not allowed'
            })
        }

        const eventId = req.body.eventId
        
        const data = {
            isComming: req.body.isComming,
            name: req.body.name,
            count: req.body.count,
        }

        // TODO sanitize

        dbApi.setGuestData(db, eventId, data).then(() => {
            return res.status(200).send(data)
        }).catch((err) => {
            console.log(err)
            return res.status(400).json({
                message: 'not saved'
            })
        })
    })
});
