"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavourites = exports.checkFavourite = exports.removeFavouriteRestaurant = exports.addFavouriteRestaurant = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const addFavouriteRestaurant = (req, res) => {
    const { restaurantId } = req.body;
    const receivedToken = req.body.headers.Authorization;
    const user = jsonwebtoken_1.default.verify(receivedToken, process.env.TOKEN_SECRET);
    try {
        user_model_1.default.findByIdAndUpdate(user._id, { $push: { favRestaurants: restaurantId } }, { new: true }).exec();
        res.json({ message: 'Added restaurant to favourites' });
    }
    catch (e) {
        res.json({ message: 'Error while adding restaurant to favourites' });
    }
};
exports.addFavouriteRestaurant = addFavouriteRestaurant;
const removeFavouriteRestaurant = (req, res) => {
    const { restaurantId } = req.body;
    const receivedToken = req.body.headers.Authorization;
    const user = jsonwebtoken_1.default.verify(receivedToken, process.env.TOKEN_SECRET);
    try {
        user_model_1.default.findByIdAndUpdate(user._id, { $pull: { favRestaurants: restaurantId } }, { new: true }).exec();
        res.json({ message: 'Removed restaurant from favourites' });
    }
    catch (e) {
        res.json({ message: 'Error while removing restaurant from favourites' });
    }
};
exports.removeFavouriteRestaurant = removeFavouriteRestaurant;
const checkFavourite = (req, res) => {
    const { restaurantId } = req.body;
    const receivedToken = req.body.headers.Authorization;
    const user = jsonwebtoken_1.default.verify(receivedToken, process.env.TOKEN_SECRET);
    user_model_1.default.findById(user._id)
        .select('favRestaurants')
        .then((response) => {
        const objectIds = response.favRestaurants;
        const stringArray = objectIds.map((elm) => elm.toString());
        const favRestaurant = stringArray.filter((elm) => elm === restaurantId);
        if (favRestaurant[0]) {
            res.json({ alreadyFav: true });
        }
        else {
            res.json({ alreadyFav: false });
        }
    });
};
exports.checkFavourite = checkFavourite;
const getFavourites = (req, res) => {
    const receivedToken = req.body.headers.Authorization;
    const user = jsonwebtoken_1.default.verify(receivedToken, process.env.TOKEN_SECRET);
    const { _id } = user;
    user_model_1.default.findById({ _id })
        .populate('favRestaurants')
        .select('favRestaurants')
        .then((restaurants) => {
        res.json(restaurants);
    })
        .catch((err) => console.error(err));
};
exports.getFavourites = getFavourites;
