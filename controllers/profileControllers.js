const Users = require('../models/users')
const Bands = require('../models/bands')

//get profile of user
module.exports.getProfileController = async (req, res) => {
    const user = await Users.findById(req.params.uid)
    res.send(user)
}

module.exports.createBandController = async (req, res) => {
    const { name, description, origin, rating } = req.body
    console.log(name, description, origin, rating)
    const band = new Bands({
        name,
        description,
        origin,
        rating
    })
    await band.save()
    const id = req.params.uid
    const user = await Users.findByIdAndUpdate(id)
    //  ,{$push: {"band":}},{new: true, upsert: true})
    user.bands.push(band._id)
    await user.save()
    console.log(user)
    console.log(band)
    res.send(user)
}

module.exports.getBandsController = async (req, res) => {
    const id = req.params.uid
    const user = await Users.findById(id).populate('bands')
    const bands = user.bands
    const result = JSON.stringify(bands)
    res.send(result)
}


module.exports.getUserBandController = async (req, res) => {
    const band = await Bands.findById(req.params.bid)
    res.status(201).send(band)
}

//update profile of user
module.exports.updateProfileController = async (req, res) => {
    const { name, email, organization, date_of_birth } = req.body
    const user =await  Users.findByIdAndUpdate(req.params.uid, {
        name: name,
        email: email,
        organization: organization,
        date_of_birth: date_of_birth
    })
    res.send(user)
}