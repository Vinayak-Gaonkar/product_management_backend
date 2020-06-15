const router = require('express').Router();
const middleware = require('../middleware');
const api = require('./api');
const path = require('path')
const multer = require(path.resolve('.') + '/utils/multer');


router.post('/customers/login', middleware.user.login, api.user.user.login)
router.post('/logout', middleware.user.logout, api.user.user.logout)

router.get('/googelApi', api.user.user.googleLogin)
router.post('/googelApi', api.user.user.googleUserInfo)


console.log(multer.userUpload.single())
// Users module APIs
router.post('/customers', middleware.user.createUser, api.user.user.createUser)
router.get('/customer/:userId',middleware.user.ensureUser, api.user.user.listUser)
router.put('/customer', middleware.user.updateUser, api.user.user.updateUser)
router.put('/customer/address', middleware.user.updateAddress, api.user.user.updateAddress)
router.put('/customer/creditCard', middleware.user.updateCreditCard, api.user.user.updateCreditCard)
// router.delete('/user', api.user.user.deleteUser)

router.get('/products', api.product.product.listProducts);
router.get('/products/search', api.product.product.searchProducts)
router.get('/products/:id', api.product.product.listProduct)
router.get('/product/inCategory/:id', api.product.product.searchByCategory);
router.get('/products/inDepartment/:id', api.product.product.searchByDepartment);
router.get('/products/:id/details', api.product.product.productDetailsById);
router.get('/products/:id/locations', api.product.product.productLocation);
router.post('/products/:id/reviews',middleware.user.ensureUser,api.product.product.createReview);
router.get('/products/:id/reviews',api.product.product.listReviews);

router.get('/departments',api.department.department.listDepartment);
router.get('/departments/:id',api.department.department.listByDepartmentId);

router.get('/category',api.category.category.listCategory);
router.get('/category/:id',api.category.category.listByCategoryId);
router.get('/category/inProduct/:id',api.category.category.getCategoryByProductId);
router.get('/category/inDepartment/:id',api.category.category.getCategoryByDepartmentId);


router.get('/attributes',api.attribute.attribute.listAtributes);
router.get('/attributes/:id',api.attribute.attribute.listByAttributeId);
router.get('/attributes/value/:id',api.attribute.attribute.getAttributeValueById);
router.get('/attributes/inProduct/:id',api.attribute.attribute.getAttributeValueById);

















module.exports = router