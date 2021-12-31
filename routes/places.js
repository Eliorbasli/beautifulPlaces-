const express = require('express')
const router = express.Router()
const Place = require('../models/place')


/////

// router.use('/public', express.static('public'))

// router.get('/', function (req, res) {
//     res.sendFile(__dirname + "/views/places/" + "index.html");
// })


/////




//Getting all
router.get('/', async (req, res) => {
    try {
        const places = await Place.find()
        res.json(places)

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//Creating One
router.post('/', async (req, res) => {
    const place = new Place({
        placeName: req.body.placeName,
        description: req.body.description

    })
    try {
        const newPlace = await place.save()
        res.status(201).json(newPlace)
    } catch (err) {
        res.status(400).json({
            message: err.message,
        })
    }
})

//Getting One
router.get('/:id', getPlace, (req, res) => {
    res.json(res.place)
})



//Updating One
router.patch('/', getPlace, async (req, res) => {
    if (req.body.placeName != null) {
        res.place.placeName = req.body.placeName
    }
    if (req.body.description != null) {
        res.place.description = req.body.description
    }
    try {
        const updatedPlace = await res.place.save()
        res.json(updatedPlace)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

//Deleting One
router.delete('/:id', getPlace, async (req, res) => {
    try {
        await res.place.remove()
        res.json({
            message: 'Deleted Place'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


async function getPlace(req, res, next) {
    try {
        place = await Place.findById(req.params.id)
        if (place == null) {
            return res.status(404).json({
                message: 'Cannot find place'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
    res.place = place
    next()
}

module.exports = router