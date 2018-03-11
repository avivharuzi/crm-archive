const expres = require('express');
const router = expres.Router();

const RouteHandler = require('./../handlers/route.handler');

const CompanyController = require('./../controllers/company.controller');

router.get('/', (req, res) => {
    res.send(req.userData);
});

router.get('/companies', (req, res) => {
    CompanyController.getCompaniesWithoutCurrent(req.userData._id)
        .then((companies) => res.send(companies));
});

router.get('/customers', (req, res) => {
    CompanyController.getCompanyCustomers(req.userData._id)
        .then((customers) => res.send(customers))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

router.get('/details/:name', (req, res) => {
    CompanyController.getCompanyByName(req.params.name)
        .then((company) => res.send(company))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

router.put('/customer', (req, res) => {
    let customerId = req.body.customerId;
    if (customerId) {
        CompanyController.checkIfCompanyCustomerExist(req.userData._id, customerId)
            .then((updatedCompany) => RouteHandler.success(res, 'Customer added successfully', updatedCompany))
            .catch((err) => RouteHandler.error(res, 409, '', err));
    }
});

module.exports = router;
