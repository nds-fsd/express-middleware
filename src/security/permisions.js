const User = require('../model/User');
const Restaurant = require('../model/Restaurant');

const adminPermissionMiddleware = async (req, res, next) => {
    const userId = req.jwtPayload._id; //guardado en el jwt middleware
    const user = await User.findById(userId);
    if (user.role !== 'ADMIN') {
        return res.status(401).json({error: "Unauthorized"});
    }

    next();
};

const globalAdminPermissionMiddleware = async (req, res, next) => {
    const userId = req.jwtPayload._id; //guardado en el jwt middleware
    const user = await User.findById(userId);
    if (user.role !== 'GLOBAL_ADMIN') {
        return res.status(401).json({error: "Unauthorized"});
    }

    next();
};

const ownPermissionMiddleware = async (req, res, next) => {
    const userId = req.jwtPayload._id; //guardado en el jwt middleware
    const user = await User.findById(userId);

    if (user.role === 'GLOBAL_ADMIN' || user.role === 'ADMIN') {
        return next();
    }

    const restaurant = await Restaurant.findById(req.params.id);

    if (restaurant.owner !== userId) {
        return res.status(401).json({error: "Unauthorized"});
    }

    next();

};

module.exports = {
    adminPermissionMiddleware,
    globalAdminPermissionMiddleware,
    ownPermissionMiddleware
}