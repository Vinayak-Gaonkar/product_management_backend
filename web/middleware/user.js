const path = require('path'),
    logger = require(path.resolve('.') + '/utils/logger'),
    passwordValidator = require(path.resolve('.') + '/utils/passwordValidator'),
    validator = require('joi');
var jwt = require('jsonwebtoken');

exports.createUser = function (req, res, next) {
    //    let a = JSON.parse(req.body)
    logger.info("web | middleware | create user | validating request body ");
    let schema = validator.object().keys({
        customer_id: validator.string().min(1).max(30).required(),
        name: validator.string().min(3).max(30),
        email: validator.string().email()
        // phone: validator.string().allow('').regex(/^$|^\d{10}$/), ///^\d{10}$/   
    });



    validator.validate(req.body, schema, {
        abortEarly: false,
        allowUnknown: true
    }, function (err) {
        if (err) {
            logger.warn("web | middleware | create user | validating request body ", err);
            res.status(400).json({
                success: false,
                error: {
                    message: "Validation error  " + err
                }
            })
        } else {
            let validation = passwordValidator.validate(req.body.password);
            if (validation && validation.strong) {
                next();
            } else {
                logger.warn("web | middleware | create user | password validation error: ", validation);
                res.status(400).json({
                    success: false,
                    error: validation
                });
            }
        }
    });
}

exports.updateUser = function (req, res, next) {
    logger.info("web | middleware | update user | validating request body");
    let schema = validator.object().keys({
        name: validator.string().min(3).max(30),
        email: validator.string().email(),
        day_phone: validator.string().allow('').regex(/^$|^\d{10}$/),
        eve_phone: validator.string().allow('').regex(/^$|^\d{10}$/),
        mob_phone: validator.string().allow('').regex(/^$|^\d{10}$/),
        password:validator.string()
    });

    validator.validate(req.body, schema, {
        abortEarly: false,
        allowUnknown: true
    }, function (err) {
        if (err) {
            logger.warn("web | middleware | update user | validating request body | Error: ", err);
            res.status(400).json({
                success: false,
                error: {
                    message: err.message
                }
            })
        } else
            next();
    });
}
exports.updateAddress = function (req, res, next) {
    logger.info("web | middleware | update address | validating request body");
    let schema = validator.object().keys({
        name: validator.string().min(3).max(30).required(),
        email: validator.string().email().required(),
        address_1: validator.string().allow('').required(),
        address_2: validator.string().allow(''),
        city: validator.string().allow('').required(),
        region:validator.string().required(),
        postal_code:validator.string().required(),
        country:validator.string().required(),
        shipping_region_id:validator.string().required(),
    });

    validator.validate(req.body, schema, {
        abortEarly: false,
        allowUnknown: true
    }, function (err) {
        if (err) {
            logger.warn("web | middleware | update address | validating request body | Error: ", err);
            res.status(400).json({
                success: false,
                error: {
                    message: err.message
                }
            })
        } else
            next();
    });
}

exports.updateCreditCard = function (req, res, next) {
    logger.info("web | middleware | update address | validating request body");
    let schema = validator.object().keys({
        name: validator.string().min(3).max(30).required(),
        email: validator.string().email().required(),
        credit_card: validator.string().creditCard()
    });

    validator.validate(req.body, schema, {
        abortEarly: false,
        allowUnknown: true
    }, function (err) {
        if (err) {
            logger.warn("web | middleware | update address | validating request body | Error: ", err);
            res.status(400).json({
                success: false,
                error: {
                    message: err.message
                }
            })
        } else
            next();
    });
}
exports.login = function (req, res, next) {
    logger.info("web | middleware | login | validating request body");
    let schema = validator.object().keys({
        email: validator.string().required(),
        password: validator.string().required()
    });

    validator.validate(req.body, schema, {
        abortEarly: false,
        allowUnknown: true
    }, function (err) {
        if (err) {
            logger.warn("web | middleware | login | validating request body | Error: ", err);
            res.status(400).json({
                success: false,
                error: {
                    message: "Validation error"
                }
            })
        } else
            next();
    });
}

exports.logout = function (req, res, next) {
    logger.info("web | middleware | logout | validating request body");
    let schema = validator.object().keys({
        "x-access-token": validator.string().required()
    });

    validator.validate(req.headers, schema, {
        abortEarly: false,
        allowUnknown: true
    }, function (err) {
        if (err) {
            logger.warn("web | middleware | logout | validating request body | Error: ", err);
            res.status(400).json({
                success: false,
                error: {
                    message: "Validation error"
                }
            })
        } else
            next();
    });
}

exports.changePassword = function (req, res, next) {
    logger.info("web | middleware |changepassWord | validating request body ");
    let schema = validator.object().keys({
        signature: validator.string().required(),
        password: validator.string().required()
    });

    validator.validate(req.body, schema, {
        abortEarly: false,
        allowUnknown: true
    }, function (err) {
        if (err) {
            logger.warn("web | middleware | changepassWord | validating request body ", err);
            res.status(400).json({
                success: false,
                error: {
                    message: "Validation error"
                }
            })
        } else {
            let validation = passwordValidator.validate(req.body.password);
            if (validation && validation.strong) {
                next();
            } else {
                logger.warn("web | middleware | changepassWord | password validation error: ", validation);
                res.status(400).json({
                    success: false,
                    error: validation
                });
            }
        }
    });
}

exports.ensureUser = function (req, res, next) {
    try {
        console.log(req.headers);

        const authHeaderValue = req.headers.authorization;

        const token = jwt.verify(authHeaderValue, "S3CR#TK#YEwuHX#.I!O>dM*a");
        console.log(token);
        return next();
    } catch (e) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}