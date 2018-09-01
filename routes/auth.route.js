const express = require('express');
const router = express.Router();

const RouteHandler = require('./../handlers/route.handler');
const AuthHandler = require('./../handlers/auth.handler');

const CompanyController = require('./../controllers/company.controller');

router.post('/register', (req, res) => {
    CompanyController.validateCompany(req.body, req.files)
        .then(CompanyController.saveCompany)
        .then((newCompany) => RouteHandler.success(res, 'You are registered successfully', newCompany))
        .catch((err) => res.status(409).send(err));
});

router.post('/login', (req, res) => {
    let user = req.body.user;
    
    if (!user) {
        res.status(404).end();
    } else {
        CompanyController.checkUserCompany(user)
            .then(AuthHandler.signUserToJwt)
            .then(token => {
                res.setHeader('authorization', token);
                RouteHandler.success(res, 'User found', token);
            })
            .catch(err => RouteHandler.error(res, 409, '', err));
    }
});

router.post('/check', (req, res) => {
    let token = req.body.token;

    if (!token) {
        res.status(404).end();
    } else {
        AuthHandler.checkUserToken(token)
            .then(() => RouteHandler.success(res, 'Token verify', token))
            .catch(() => res.status(401).end());
    }
});

module.exports = router;
