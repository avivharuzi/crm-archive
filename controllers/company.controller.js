const Company = require('./../models/company.model');

const ValidationHandler = require('./../handlers/validation.handler');
const FileHandler = require('./../handlers/file.handler');

class CompanyController {
    static saveCompany(company) {
        return new Promise((resolve, reject) => {
            company.customers = [];
            company.recipes = [];
            company.description = null;

            Company.create(company, (err, newCompany) => {
                if (err) {
                    reject(['There was problem by creating company']);
                } else {
                    resolve(newCompany);
                }
            });
        });
    }

    static validateCompany(company, files) {
        return new Promise((resolve, reject) => {
            company.files = files;

            let errors = [];

            if (!ValidationHandler.regex(company.name.toLowerCase(), /^[a-z0-9_ ]{2,55}$/)) {
                errors.push('Company name is invalid');
            } else {
                company.name = company.name.toLowerCase();
            }

            if (!ValidationHandler.regex(company.username.toLowerCase(), /^[a-z0-9_]{2,55}$/)) {
                errors.push('Company username is invalid');
            } else {
                company.username = company.username.toLowerCase();
            }

            if (!ValidationHandler.regex(company.number, /^[0-9]{2,55}$/)) {
                errors.push('Company number is invalid');
            }

            if (!ValidationHandler.regex(company.password, /^[A-Za-z0-9!@#$%^&*()_]{3,55}$/)) {
                errors.push('Company password is invalid');
            }
			
			if (!ValidationHandler.regex(company.city, /^[A-Za-z0-9.-_ ]{3,55}$/)) {
                errors.push('Company city is invalid');
            }

			
			if (!ValidationHandler.regex(company.street, /^[A-Za-z0-9.-_ ]{3,55}$/)) {
                errors.push('Company street is invalid');
            }
			
			if (!ValidationHandler.regex(company.country, /^[A-Za-z0-9.-_ ]{3,55}$/)) {
                errors.push('Company country is invalid');
            }


            if (errors.length) {
                reject(errors);
            } else {
                CompanyController.checkCompanyByName(company)
                    .then(CompanyController.checkCompanyByUsername)
                    .then(CompanyController.checkCompanyByNumber)
                    .then(CompanyController.checkCompanyImage)
                    .then((newCompany) => resolve(newCompany))
                    .catch(err => reject(err));
            }
        });
    }

    static checkCompanyImage(company) {
        return new Promise((resolve, reject) => {
            FileHandler.checkFilesErrors(company.files.image, 'image', 2)
                .then(FileHandler.uploadFileToAmazonS3)
                .then((newFileName) => {
                    company.image = newFileName;
                    resolve(company);
                })
                .catch((err) => reject(err));
        });
    }

    static checkUserCompany(user) {
        return new Promise((resolve, reject) => {
            Company.findOne({
                username: user.username.toLowerCase()
            }, (err, userExist) => {
                if (err) {
                    reject(['There was problem by finding the user']);
                } else if (userExist !== null) {
                    userExist.comparePassword(user.password, (error, isMatch) => {
                        if (error) {
                            reject(error);
                        } else if (isMatch) {
                            resolve(userExist);
                        }
                        reject(['The username or password you have entered is invalid']);
                    });
                } else {
                    reject(['The username or password you have entered is invalid']);
                }
            });
        });
    }

    static checkCompanyByName(company) {
        return new Promise((resolve, reject) => {
            Company.findOne({
                name: company.name.toLowerCase()
            }, (err, companyExist) => {
                if (err) {
                    reject(err);
                } else {
                    if (companyExist !== null) {
                        reject(['This company name is already in used']);
                    } else {
                        resolve(company);
                    }
                }
            });
        });
    }

    static checkCompanyByUsername(company) {
        return new Promise((resolve, reject) => {
            Company.findOne({
                username: company.username.toLowerCase()
            }, (err, companyExist) => {
                if (err) {
                    reject(err);
                } else {
                    if (companyExist !== null) {
                        reject(['This username is already in used']);
                    } else {
                        resolve(company);
                    }
                }
            });
        });
    }

    static checkCompanyByNumber(company) {
        return new Promise((resolve, reject) => {
            Company.findOne({
                number: company.number
            }, (err, companyExist) => {
                if (err) {
                    reject(err);
                } else {
                    if (companyExist !== null) {
                        reject(['This company number is already in used']);
                    } else {
                        resolve(company);
                    }
                }
            });
        });
    }

    static getCompaniesWithoutCurrent(id) {
        return new Promise((resolve, reject) => {
            Company.find()
                .exec((err, companies) => {
                    if (err) {
                        reject(['There was problem by finding companies']);
                    } else {
                        companies = companies.filter(company => company._id != id);
                        resolve(companies);
                    }
                });
        });
    }

    static getCompanyCustomers(id) {
        return new Promise((resolve, reject) => {
            Company.findById(id)
                .populate('customers')
                .exec((err, companyCustomers) => {
                    if (err) {
                        reject(['There was problem by finding company customers']);
                    } else {
                        if (companyCustomers) {
                            resolve(companyCustomers.customers);
                        } else {
                            resolve([]);
                        }
                    }
                });
        });
    }

    static checkIfCompanyCustomerExist(id, customerId) {
        return new Promise((resolve, reject) => {
            CompanyController.getCompanyCustomers(id)
                .then((customers) => {
                    let isExist = false;

                    if (customers.length) {
                        for (let customer of customers) {
                            if (customer._id == customerId) {
                                isExist = true;
                                break;
                            }
                        }
                    }

                    if (isExist) {
                        reject(['This customer is already in your list']);
                    } else {
                        CompanyController.updateCompaniesCustomers(id, customerId)
                        .then((updatedCompany) => resolve(updatedCompany))
                        .catch((err) => reject(err));
                    }
                });
        });
    }

    static updateCompaniesCustomers(id, customerId) {
        return new Promise((resolve, reject) => {
            Company.findByIdAndUpdate(id, {
                "$push": {
                    "customers": customerId
                } 
            }, (err, updatedCompany) => {
                if (err) {
                    reject(['There was problem by update company customers']);
                } else {
                    resolve(updatedCompany);
                }
            });
        });
    }

    static getCompanyByName(name) {
        return new Promise((resolve, reject) => {
            Company.findOne({
                name: name
            })
            .exec((err, company) => {
                if (err) {
                    reject(['There was problem by finding company']);
                } else {
                    resolve(company);
                }
            });
        });
    }

    static addRecipeToCustomer(newRecipe) {
        return new Promise((resolve, reject) => {
            Company.findByIdAndUpdate(newRecipe.customerId, {
                "$push": {
                    "recipes": newRecipe._id
                } 
            }, (err, updatedCompany) => {
                if (err) {
                    reject(['There was problem by update company customers']);
                } else {
                    resolve(newRecipe);
                }
            });
        });
    }

    static getRecipesForCompany(companyId) {
        return new Promise((resolve, reject) => {
            Company.findById(companyId)
                .populate('recipes')
                .exec((err, company) => {
                    if (err) {
                        reject(['There was problem to find recipes']);
                    } else {
                        resolve(company.recipes);
                    }
                });
        });
    }
}

module.exports = CompanyController;
