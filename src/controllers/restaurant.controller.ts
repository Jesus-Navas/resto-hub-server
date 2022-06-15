import { RequestHandler } from 'express';
import Restaurant from '../models/restaurant.model';

export const getAll: RequestHandler = (req, res) => {
    Restaurant.find()
        .then((restaurants) => res.json(restaurants))
        .catch((error) => console.error(error));
};

export const getOne: RequestHandler = (req, res) => {
    const { id } = req.params;
    Restaurant.findById(id)
        .then((restaurant) => res.json(restaurant))
        .catch((error) => console.error(error));
};

export const createOne: RequestHandler = (req, res) => {
    const { name, address, neighborhood, image } = req.body;
    Restaurant.create({ name, address, neighborhood, image })
        .then((restaurant) => res.json(restaurant))
        .catch((error) => console.error(error));
};

export const updateOne: RequestHandler = (req, res) => {
    const { id } = req.params;
    const { name, address, neighborhood, image } = req.body;
    Restaurant.findByIdAndUpdate(
        { _id: id },
        { name, address, neighborhood, image },
        { new: true }
    )
        .then((restaurant) => res.json(restaurant))
        .catch((error) => console.error(error));
};

export const deleteOne: RequestHandler = (req, res) => {
    const { id } = req.params;
    Restaurant.findByIdAndDelete(id)
        .then(() => res.json('Successfully removed the restaurant'))
        .catch((error) => console.error(error));
};