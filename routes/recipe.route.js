const expres = require('express');
const router = expres.Router();

const RouteHandler = require('./../handlers/route.handler');

const RecipeController = require('./../controllers/recipe.controller');
const CompanyController = require('./../controllers/company.controller');

router.get('/', (req, res) => {
    CompanyController.getRecipesForCompany(req.userData._id)
        .then((recipes) => res.send(recipes))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

router.post('/', (req, res) => {
    RecipeController.validateRecipe(req.body, req.userData)
        .then(RecipeController.saveRecipe)
        .then(CompanyController.addRecipeToCustomer)
        .then((newRecipe) => RouteHandler.success(res, 'You added new recipe successfully', newRecipe))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

router.get('/customer/:customerId', (req, res) => {
    RecipeController.getRecipesToCustomerFromCompany(req.userData._id, req.params.customerId)
        .then((recipes) => res.send(recipes))
        .catch((err) => RouteHandler.error(res, 409, '', err));
});

module.exports = router;
