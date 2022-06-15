import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const addFavouriteRestaurant: RequestHandler = (req, res) => {
    const { restaurantId } = req.body;
    const receivedToken = req.body.headers.Authorization;
    const user: any = jwt.verify(
        receivedToken as string,
        process.env.TOKEN_SECRET!
    );
    try {
        User.findByIdAndUpdate(
            user._id,
            { $push: { favRestaurants: restaurantId } },
            { new: true }
        ).exec();

        res.json({ message: 'Added restaurant to favourites' });
    } catch (e) {
        res.json({ message: 'Error while adding restaurant to favourites' });
    }
};

export const removeFavouriteRestaurant: RequestHandler = (req, res) => {
    const { restaurantId } = req.body;
    const receivedToken = req.body.headers.Authorization;
    const user: any = jwt.verify(
        receivedToken as string,
        process.env.TOKEN_SECRET!
    );
    try {
        User.findByIdAndUpdate(
            user._id,
            { $pull: { favRestaurants: restaurantId } },
            { new: true }
        ).exec();

        res.json({ message: 'Removed restaurant from favourites' });
    } catch (e) {
        res.json({ message: 'Error while removing restaurant from favourites' });
    }
};

export const checkFavourite: RequestHandler = (req, res) => {
    const { restaurantId } = req.body;
    const receivedToken = req.body.headers.Authorization;
    const user: any = jwt.verify(
        receivedToken as string,
        process.env.TOKEN_SECRET!
    );

    User.findById(user._id)
        .select('favRestaurants')
        .then((response) => {
            const objectIds = response.favRestaurants;
            const stringArray = objectIds.map((elm: any) => elm.toString());
            const favRestaurant = stringArray.filter(
                (elm: any) => elm === restaurantId
            );

            if (favRestaurant[0]) {
                res.json({ alreadyFav: true });
            } else {
                res.json({ alreadyFav: false });
            }
        });
};

export const getFavourites: RequestHandler = (req, res) => {
    const receivedToken = req.body.headers.Authorization;
    const user: any = jwt.verify(
        receivedToken as string,
        process.env.TOKEN_SECRET!
    );

    const { _id } = user;

    User.findById({ _id })
        .populate('favRestaurants')
        .select('favRestaurants')
        .then((restaurants) => {
            res.json(restaurants);
        })
        .catch((err) => console.error(err));
};
