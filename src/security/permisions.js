const User = require('../model/User');

const adminPermissionMiddleware = (req, res, next) => {
    const userRole = req.jwtPayload.role; //guardado en el jwt middleware
    if (userRole !== 'ADMIN') {
        return res.status(401).json({error: "Unauthorized"});
    }

    next();
};

const globalAdminPermissionMiddleware = (req, res, next) => {
    const userRole = req.jwtPayload.role; //guardado en el jwt middleware
    if (userRole !== 'GLOBAL_ADMIN') {
        return res.status(401).json({error: "Unauthorized"});
    }

    next();
};

module.exports = {
    adminPermissionMiddleware,
    globalAdminPermissionMiddleware
}