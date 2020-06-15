
const path = require('path'),
    logger = require(path.resolve('.') + '/utils/logger'),
    controller = require('./controller');

let User = function () {

   this.createUser=async(req, res)=> {
        try {
          let result = await controller.signUp(req.body);
          res.status(200).json({ success: true, payload: result });
        } catch (error) {
          let message = "Internal server error";
          if (error.status && error.reason) {
            message =
              error.status === "500" ? "Internal server error" : error.reason;
          } else {
            error.status = 500;
          }
          logger.error("[web] [router] [user] [Users] [signUp] error: ", error);
          res
            .status(error.status)
            .json({ error: { message: message }, success: false });
        }
    }


    this.listUser = (req, res) => {
        return controller.listUser(req.params).then((result) => {
            logger.info('web | router | api | User | listUser(function) | success');
            res.status(200).json({ success: true, payload: result })
        }).catch((err) => {
            logger.warn('web | router | api | User | listUser(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err.message } });
        })
    }


    this.updateUser = (req, res) => {
        return controller.updateUser(req.body).then((result) => {
            logger.info('web | router | api | session | updateUser(function) | update success');
            res.status(200).json({ success: true,payload:result })
        }).catch((err) => {
            logger.warn('web | router | api | session | updateUser(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err.message } });
        })
    }

    this.updateAddress = (req, res) => {
        return controller.updateAddress(req.body).then((result) => {
            logger.info('web | router | api | session | updateUser(function) | update success');
            res.status(200).json({ success: true,payload:result })
        }).catch((err) => {
            logger.warn('web | router | api | session | updateUser(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err.message } });
        })
    }

    this.updateCreditCard = (req, res) => {
        return controller.updateCreditCard(req.body).then((result) => {
            logger.info('web | router | api | session | updateCreditCard(function) | update success');
            res.status(200).json({ success: true,payload:result })
        }).catch((err) => {
            logger.warn('web | router | api | session | updateCreditCard(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err.message } });
        })
    }

    this.deleteUser = (req, res) => {
        return controller.deleteUser(req.body).then((result) => {
            logger.info('web | router | api | User | deleteUser(function) | success');
            res.status(200).json({ success: true, message: "User deleted successfully" })
        }).catch((err) => {
            logger.warn('web | router | api | User | deleteUser(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err.message } });
        })
    }

    this.login = (req, res) => {
        return controller.login(req.body.email, req.body.password).then((result) => {
            logger.info('web | router | api | user | login(function) | login success');
            res.status(200).json({ success: true, payload: result })
        }).catch((err) => {
            logger.warn('web | router | api | user | login(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err } });
        })
    }

    this.logout = (req, res) => {
        return controller.logout(req.headers["x-access-token"]).then((result) => {
            logger.info('web | router | api | user | logout(function) | login success');
            res.status(200).json({ success: true })
        }).catch((err) => {
            logger.warn('web | router | api | user | logout(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err.message } });
        })
    }

    this.updateSessionLog = (req, res) => {
        return controller.updateSessionLog(req.body, req.userObj).then((result) => {
            logger.info('web | router | api | session | updateSessionLog(function) | create session success');
            res.status(200).json({ success: true })
        }).catch((err) => {
            logger.warn('web | router | api | session | updateSessionLog(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err.message } });
        })
    }

    this.googleLogin = (req, res) => {
        return controller.googleLogin().then((result) => {
            logger.info('web | router | api | session | googleLogin(function) | create session success');
            res.status(200).json({ success: true, url:result })
        }).catch((err) => {
            logger.warn('web | router | api | session | googleLogin(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err.message } });
        })
    }

    this.googleUserInfo = (req, res) => {
        return controller.googleUserInfo(req.body.code).then((result) => {
            logger.info('web | router | api | session | googleUserInfo(function) | create session success');
            res.status(200).json({ success: true, url:result })
        }).catch((err) => {
            logger.warn('web | router | api | session | googleUserInfo(function) | Error: ', err)
            return res.status(400).json({ success: false, error: { message: err.message } });
        })
    }
}

module.exports = new User()
