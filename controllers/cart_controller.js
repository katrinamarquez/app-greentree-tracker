const { addItemToCart } = require("../utils/cart_utils")
const { findUser } = require("../utils/user_utilities")
const User = require('../models/user');

const getCart = function (req, res) {
    console.log("getCart user: ", req.user)

    User.findById(req.user._id).exec((err, userInfo) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            })
        } else {
            res.status(201)
            res.send(userInfo.cart)
        }
    })
}

const getCartItem = function (req, res) {

}

const addToCart = function (req, res) {
    // Add date
    const date = new Date()
    req.body.modified_date = date

    // user
    let currentUserId = req.user._id
    req.body.plant = req.params._id

    User.findOneAndUpdate(
        {_id: currentUserId}, 
        {
            $push :{
                cart: {
                    plant_id: req.params.id, 
                    quantity: req.body.quantity,
                    addedAt: req.body.modified_date
                }
            }
        }, {new: true})
        .exec((err, userInfo) => {
            if (err) {
                res.status(500);
                return res.json({
                    error: err.message
                })
            } else {
                res.status(201)
                res.send(userInfo.cart)
            }
        })
}

const removeCartItem = function (req, res) {
    console.log("remove cart item params: ", req.params)
    const plantId = req.params.id

    User.findOneAndUpdate(
        {_id: req.user.id}, 
        {
            $pull :{
                cart: { plant_id: req.params.id }
            }
        }, {new: true})
        .exec((err, userInfo) => {
            if (err) {
                res.status(500);
                return res.json({
                    error: err.message
                })
            } else {
                res.sendStatus(204)
            }
        })
}

const changeCartItem = function (req, res) {

    console.log("In changecart, new quantity: ", req.body.quantity)
    console.log("In changecart, params: ", req.params.id)
    
    User.findOneAndUpdate(
        {_id: req.user.id, "cart._id" : req.params.id },
        { $set : {
            "cart.$.quantity": req.body.quantity
            }
        }, {new: true})
        .exec((err, userInfo) => {
            if (err) {
                res.status(500);
                return res.json({
                    error: err.message
                })
            } else {
                res.status(201)
                res.send(userInfo.cart)
            }
        })
}

module.exports = {
    getCart,
    getCartItem,
    addToCart,
    removeCartItem,
    changeCartItem
}