const { addItemToCart } = require("../utils/cart_utils")
const { findUser } = require("../utils/user_utilities")
const User = require('../models/user');

const getCart = function (req, res) {
    console.log("getCart user: ", req.user)
    console.log("getCart body: ",req.body)

    User.find(
        {_id: req.user._id}
    ).exec((err, userInfo) => {
        console.log("userInfo: ", userInfo)
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
                    plant: req.params.id, 
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

}

const changeCartItem = function (req, res) {

}

module.exports = {
    getCart,
    getCartItem,
    addToCart,
    removeCartItem,
    changeCartItem
}