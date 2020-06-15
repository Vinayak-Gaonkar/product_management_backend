const path = require('path'),
    logger = require(path.resolve('.') + '/utils/logger'),
    controller = require('./controller');

let Category = function () {
    this.listCategory = (req, res) => {
        return controller.listCategory(req.query).then((result) => {
            logger.info('web | router | api | Department | listCategory(function) | success');
            res.status(200).json({ success: true, payload: result })
        }).catch((err) => {
            logger.warn('web | router | api | Department | listCategory(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err } });
        })

    }



    this.listByCategoryId = (req, res) => {
        return controller.listByCategoryId(req.params).then((result) => {
            logger.info('web | router | api | Department | listByCategoryId(function) | success');
            res.status(200).json({ success: true, payload: result })
        }).catch((err) => {
            logger.warn('web | router | api | Department | listByCategoryId(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err } });
        })

    }


    this.getCategoryByProductId = (req, res) => {
        return controller.getCategoryByProductId(req.params).then((result) => {
            logger.info('web | router | api | Department | getCategoryByProductId(function) | success');
            res.status(200).json({ success: true, payload: result })
        }).catch((err) => {
            logger.warn('web | router | api | Department | getCategoryByProductId(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err } });
        })

    }

    this.getCategoryByDepartmentId = (req, res) => {
        return controller.getCategoryByDepartmentId(req.params).then((result) => {
            logger.info('web | router | api | Department | getCategoryByDepartmentId(function) | success');
            res.status(200).json({ success: true, payload: result })
        }).catch((err) => {
            logger.warn('web | router | api | Department | getCategoryByDepartmentId(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err } });
        })

    }

}

module.exports = new Category()
