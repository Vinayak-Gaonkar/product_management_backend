const path = require('path'),
    logger = require(path.resolve('.') + '/utils/logger'),
    controller = require('./controller');

    let User = function () {
        this.listProducts = (req, res) => {
            return controller.listProducts(req.query).then((result) => {
                logger.info('web | router | api | product | listProducts(function) | success');
                res.status(200).json({ success: true, payload: result })
            }).catch((err) => {
                logger.warn('web | router | api | User | listProducts(function) | Error: ', err)
                return res.status(400).json({ success: false, error: { message: err } });
            })
        }

        this.searchProducts = (req, res) => {
            return controller.searchProducts(req.query).then((result) => {
                logger.info('web | router | api | product | listProducts(function) | success');
                res.status(200).json({ success: true, payload: result })
            }).catch((err) => {
                logger.warn('web | router | api | User | listProducts(function) | Error: ', err)
                return res.status(400).json({ success: false, error: { message: err } });
            })
        }

        this.searchByCategory = (req, res) => {
            return controller.searchByCategory(req.params,req.query).then((result) => {
                logger.info('web | router | api | product | searchByCategory(function) | success');
                res.status(200).json({ success: true, payload: result })
            }).catch((err) => {
                logger.warn('web | router | api | User | searchByCategory(function) | Error: ', err)
                return res.status(400).json({ success: false, error: { message: err } });
            })
        }

        this.listProduct = (req, res) => {
            return controller.listProduct(req.params).then((result) => {
                logger.info('web | router | api | product | listProduct(function) | success');
                res.status(200).json({ success: true, payload: result })
            }).catch((err) => {
                logger.warn('web | router | api | product | listProduct(function) | Error: ', err)
                return res.status(400).json({ success: false, error: { message: err } });
            })
        }

        this.searchByDepartment = (req, res) => {
            return controller.searchByDepartment(req.params).then((result) => {
                logger.info('web | router | api | product | searchByDepartment(function) | success');
                res.status(200).json({ success: true, payload: result })
            }).catch((err) => {
                logger.warn('web | router | api | product | searchByDepartment(function) | Error: ', err)
                return res.status(400).json({ success: false, error: { message: err } });
            })
        }

        this.productDetailsById = (req, res) => {
            return controller.productDetailsById(req.params).then((result) => {
                logger.info('web | router | api | product | productDetailsById(function) | success');
                res.status(200).json({ success: true, payload: result })
            }).catch((err) => {
                logger.warn('web | router | api | product | productDetailsById(function) | Error: ', err)
                return res.status(400).json({ success: false, error: { message: err } });
            })
        }

        this.productLocation = (req, res) => {
            return controller.productLocation(req.params).then((result) => {
                logger.info('web | router | api | product | productLocation(function) | success');
                res.status(200).json({ success: true, payload: result })
            }).catch((err) => {
                logger.warn('web | router | api | product | productLocation(function) | Error: ', err)
                return res.status(400).json({ success: false, error: { message: err } });
            })
        }


        this.createReview = (req, res) => {
            return controller.createReview(req.params,req.body,req.headers.authorization).then((result) => {
                logger.info('web | router | api | product | productLocation(function) | success');
                res.status(200).json({ success: true, payload: result })
            }).catch((err) => {
                logger.warn('web | router | api | product | productLocation(function) | Error: ', err)
                return res.status(400).json({ success: false, error: { message: err } });
            })
        }

        this.listReviews = (req, res) => {
            return controller.listReviews(req.params).then((result) => {
                logger.info('web | router | api | product | productLocation(function) | success');
                res.status(200).json({ success: true, payload: result })
            }).catch((err) => {
                logger.warn('web | router | api | product | productLocation(function) | Error: ', err)
                return res.status(400).json({ success: false, error: { message: err } });
            })
        }
    }
    module.exports = new User()
