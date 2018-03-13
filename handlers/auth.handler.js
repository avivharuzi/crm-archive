const jwt = require('jsonwebtoken');

class AuthHandler {
    static authenticate(req, res, next) {
        if (req.method === 'OPTIONS') {
            res.end();
        }
    
        if (req.headers.authorization !== undefined) {
            let token = req.headers.authorization

            AuthHandler.checkUserToken(token)
                .then((decoded) => {
                    req.userData = decoded;
                    next();
                })
                .catch(() => res.status(401).end());
        } else {
            res.status(401).send();
        }
    }

    static signUserToJwt(user) {
        return new Promise((resolve, reject) => {
            jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    reject(['There was problem by sign the user with token']);
                } else {
                    resolve(token);
                }
            }); 
        });
    }

    static checkUserToken(token) {
        return new Promise((resolve,reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }
}

module.exports = AuthHandler;
