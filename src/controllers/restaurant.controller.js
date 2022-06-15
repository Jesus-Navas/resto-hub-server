"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const getAll = (req, res) => {
    restaurant_model_1.default.find()
        .then((restaurants) => res.json(restaurants))
        .catch((error) => console.error(error));
};
exports.getAll = getAll;
const getOne = (req, res) => {
    const { id } = req.params;
    restaurant_model_1.default.findById(id)
        .then((restaurant) => res.json(restaurant))
        .catch((error) => console.error(error));
};
exports.getOne = getOne;
const createOne = (req, res) => {
    const { name, address, neighborhood, image } = req.body;
    restaurant_model_1.default.create({ name, address, neighborhood, image })
        .then((restaurant) => res.json(restaurant))
        .catch((error) => console.error(error));
};
exports.createOne = createOne;
const updateOne = (req, res) => {
    const { id } = req.params;
    const { name, address, neighborhood, image } = req.body;
    restaurant_model_1.default.findByIdAndUpdate({ _id: id }, { name, address, neighborhood, image }, { new: true })
        .then((restaurant) => res.json(restaurant))
        .catch((error) => console.error(error));
};
exports.updateOne = updateOne;
const deleteOne = (req, res) => {
    const { id } = req.params;
    restaurant_model_1.default.findByIdAndDelete(id)
        .then(() => res.json('Successfully removed the restaurant'))
        .catch((error) => console.error(error));
};
exports.deleteOne = deleteOne;
