const path = require('path'),
    logger = require(path.resolve('.') + '/utils/logger'),
    controller = require('./controller');

    let Department = function () {
        this.listDepartment = (req, res) => {
            return controller.listDepartment(req.query).then((result) => {
                logger.info('web | router | api | Department | listDepartment(function) | success');
                res.status(200).json({ success: true, payload: result })
            }).catch((err) => {
                logger.warn('web | router | api | Department | listDepartment(function) | Error: ', err)
                return res.status(400).json({ success: false, error: { message: err } });
            })
        
        }

    this.listByDepartmentId = (req, res) => {
        return controller.listByDepartmentId(req.params).then((result) => {
            logger.info('web | router | api | Department | listByDepartmentId(function) | success');
            res.status(200).json({ success: true, payload: result })
        }).catch((err) => {
            logger.warn('web | router | api | Department | listByDepartmentId(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err } });
        })
    
}
}

    module.exports = new Department()
