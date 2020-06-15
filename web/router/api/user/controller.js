const path = require('path'),
    Model = require(path.resolve('.') + '/models'),
    logger = require(path.resolve('.') + '/utils/logger'),
    redis = require(path.resolve('.') + '/utils/redisHelper'),
    utils = require(path.resolve('.') + '/utils/utils'),
    googleAuth = require(path.resolve('.') + '/utils/googleLogin'),
    config = require(path.resolve('.') + '/config'),
    Sequelize = require("sequelize"),
    Op = Sequelize.Op;
    // controller = require(path.resolve('.') + '/web/router/api/session/controller');
    // bcrypt = require('bcrypt');

    userAttributes = [
        "customer_id","name","email","credit_card","address_1","address_2","city","region","postal_code","country","shipping_region_id","day_phone","eve_phone","mob_phone"
      ];

let isValidUser = async (userid, password) => {
    try{
      logger.info("[web] [router] [user] [controller] isValidUser called");
      userAttributes.push('password')
        let userInfo = await Model.Users.findAll({attributes: userAttributes,where: {email: {[Op.eq]: userid}}});
      userAttributes.pop()
        
        if (userInfo.length>0) {
            let pswrd=userInfo[0].dataValues.password
            if(pswrd===password){
            logger.info("[web] [router] [user] [controller] isValidUser success");
                return userInfo;
            }else{
            logger.error("[web] [router] [user] [controller] isValidUser failed");
                throw "wrong password";
            }
            
        }else{
        logger.error("[web] [router] [user] [controller] isValidUser failed");
            throw "user not found";
        }
    }catch(err){
        logger.error("[web] [router] [user] [controller] isValidUser failed");
        console.log('====>',err);
        
        throw err;
    }
}


let logoutSessions = (email) => {
    return controller.activeSessions(email).then((sessions) => {
        let promise = []
        sessions.forEach((session) => {
            session.logout = true;
            session.logout_at = new Date();
            // session.logout_event = LOGOUT_EVENT.force
            session.save();

            promise.push(utils.expireToken("JWT " + session.token));
        });

        return Promise.all(promise).then((success) => {
            logger.info('web | router | api | user | logoutSessions(function) | success');
        }).catch((err) => {
            logger.error('web | router | api | user | logoutSessions(function) | session error | ', err);
        });
    }).catch((err) => {
        logger.error('web | router | api | user | logoutSessions(function) | ', err);
    });
}

let User = function () {
    this.signUp= async (data)=>{
        try{
      logger.info("[web] [router] [user] [controller] existing signup called");
      //check user is already exist
        let userInfo = await Model.Users.findAll({
            attributes: userAttributes,
            where: {
              email: {
                [Op.eq]: data.email
              }
            }
          });
      logger.info("[web] [router] [user] [controller] existing user found",userInfo );
      
        if (userInfo.length<=0) {
            //save user details
            let user=await Model.Users.create(data);
            //Generating token.Token has no expirytime for now, once logout feature is implemented token will be expired after certain give time
            let token = await utils.generateJWTToken(userInfo);
            await redis.set(token.token, token);
            user.dataValues['token']=token.token;
            return user;
        }else{
            return "user already exist"
        }
        }catch(err){
            logger.error("[web] [router] [user] [controller] error",err );
            throw err;
        }
        
    }
    
    this.listUser = async (data) => {
        
        let userInfo = await Model.Users.findAll({
            attributes: userAttributes,
            where: {
                customer_id: {
                [Op.eq]: data.userId
              }
            }
          });
        if(userInfo.length<=0){
            return "user not exist"
        }else{
            return userInfo;
        }
        
    }

    this.updateUser =async (data) => {
        try{
        logger.info('web | router | api | user | updateUser(function) | called');
        let userInfo = await Model.Users.findAll({
            attributes: userAttributes,
            where: {
                name: {
                [Op.eq]: data.name
              },
              email: {
                [Op.eq]: data.email
              }
            }
          });
        if(userInfo.length>0){
         query={
             password:'',
             day_phone:'',
             eve_phone:'',
             mob_phone:''
         };
        data.password? query.password=data.password:delete query.password;
        data.day_phone?query.day_phone=data.day_phone:delete query.day_phone;
        data.eve_phone? query.eve_phone=data.eve_phone:delete query.eve_phone;
        data.mob_phone? query.mob_phone=data.mob_phone:delete query.mob_phone;
        console.log(query);
        

        let updatedUser=await  Model.Users.update(query, { where: { name: data.name,email:data.email } })
        console.log("updated user==",updatedUser);
        logger.info('web | router | api | user | updateUser(function) | succes');
        return updatedUser
        }else{
        logger.error('web | router | api | user | updateUser(function) | failed');
            throw {message: "user not exist",succes:false};
        }
    }catch(err){
        throw err;
    }
    }

    this.updateAddress=async (data)=>{
        try{
            logger.info('web | router | api | user | updateAddress(function) | called');
        let userInfo = await Model.Users.findAll({
            attributes: userAttributes,
            where: {
                name: {
                [Op.eq]: data.name
              },
              email: {
                [Op.eq]: data.email
              }
            }
          });
          if(userInfo.length>0){
            let query={};
            query.address_1=data.address_1;
            query.address_2=data.address_2 || '';
            query.city=data.city;
            query.region=data.region;
            query.postal_code=data.postal_code;
            query.country=data.country;
            query.shipping_region_id=query.shipping_region_id;


            let updatedUser=await  Model.Users.update(query, { where: { name: data.name,email:data.email } })
            return updatedUser;
          }else{
            throw {succes:false,message:'user not found'}
          }
        }catch(err){
            throw err
        }
    }

    this.updateCreditCard=async (data)=>{
        try{
            logger.info('web | router | api | user | updateAddress(function) | called');
        let userInfo = await Model.Users.findAll({
            attributes: userAttributes,
            where: {
                name: {
                [Op.eq]: data.name
              },
              email: {
                [Op.eq]: data.email
              }
            }
          });
          if(userInfo.length>0){
            let query={};
            query.credit_card=data.credit_card;
           
            let updatedUser=await  Model.Users.update(query, { where: { name: data.name,email:data.email } })
            return updatedUser;
          }else{
            throw {succes:false,message:'user not found'}
          }
        }catch(err){
            throw err
        }
    }

    this.deleteUser = (data) => {
        return new Promise((resolve, reject) => {
            if (data) {
                userModel.deleteOne({
                    userid: data.userid
                }).then((response) => {
                    resolve(response);
                }), ((error) => {
                    reject(false);
                })
            } else {
                reject(false);
            }
        })
    }

    this.login = async (email, password) => {
        try{
            email = email.toLowerCase();
            let validUser=await isValidUser(email, password);
            let token = await utils.generateJWTToken(validUser[0].dataValues);
            console.log(token);
            await redis.set(token.token, token);
            delete validUser[0].dataValues.password;
            validUser[0].dataValues['token']=token.token;
            return validUser[0];
        }catch(err){
            logger.error('web | router | api | user | login(function) | invalid user' );
            
            throw err;
        }
    }

    this.logout = (token) => {

        return new Promise((resolve, reject) => {
            if (!token || token === '' || token === undefined || token === null) {
                logger.info('web | router | api | user | logOut(function) | Missing token')
                reject({
                    message: "No access token found"
                });
            }
            // controller.updateSessionLog({
            //     token: token,
            //     logout: true,
            //     logout_at: new Date(),
            //     // logout_event: LOGOUT_EVENT.normal
            // }).then((success) => {
            //     logger.info('web | router | api | user | logOut(function) | update session success')
            // }).catch((err) => {
            //     logger.error('web | router | api | user | logOut(function) | session update error', err)
            // });

            return utils.expireToken(token).then((success) => {
                if (success) {
                    logger.info('web | router | api | user | logOut(function) | logOut success')
                    resolve(success);
                } else {
                    logger.error('web | router | api | user | logOut(function) | Token could not expire ')
                    reject({
                        message: "Could not logout"
                    });
                }
            }).catch((err) => {
                logger.error('web | router | api | user | logOut(function) | error: ', err)
                reject({
                    message: err.message ? err.message : "Server error"
                });
            });
        })
    }

    this.googleLogin=async()=>{

       console.log(googleAuth.urlGoogle());
       return googleAuth.urlGoogle()
    }

    this.googleUserInfo=async(code)=>{
        console.log(googleAuth.getGoogleAccountFromCode(code));
        return googleAuth.getGoogleAccountFromCode(code)
     }
}
module.exports = new User()