const path = require('path'),
    logger = require(path.resolve('.') + '/utils/logger'),
    controller = require('./controller');

let Attribute = function () {
    this.listAtributes = (req, res) => {
        return controller.listAtributes(req.query).then((result) => {
            logger.info('web | router | api | Atributes | listAtributes(function) | success');
            res.status(200).json({ success: true, payload: result })
        }).catch((err) => {
            logger.warn('web | router | api | Atributes | listAtributes(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err } });
        })

    }

    this.listByAttributeId = (req, res) => {
        return controller.listByAttributeId(req.params).then((result) => {
            logger.info('web | router | api | Attribute | listByAttributeId(function) | success');
            res.status(200).json({ success: true, payload: result })
        }).catch((err) => {
            logger.warn('web | router | api | Attirbute | listByAttributeId(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err } });
        })

    }

    this.getAttributeValueById = (req, res) => {
        return controller.getAttributeValueById(req.params).then((result) => {
            logger.info('web | router | api | Attribute | getAttributeValueById(function) | success');
            res.status(200).json({ success: true, payload: result })
        }).catch((err) => {
            logger.warn('web | router | api | Attirbute | getAttributeValueById(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err } });
        })

    }

    this.getAttributeValueByProductId = (req, res) => {
        return controller.getAttributeValueByProductId(req.params).then((result) => {
            logger.info('web | router | api | Attribute | getAttributeValueByProductId(function) | success');
            res.status(200).json({ success: true, payload: result })
        }).catch((err) => {
            logger.warn('web | router | api | Attirbute | getAttributeValueByProductId(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err } });
        })

    }
}

module.exports = new Attribute()
