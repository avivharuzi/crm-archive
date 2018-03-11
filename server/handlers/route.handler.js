class RouteHandler {
    static error(res, status, msg, errors = []) {
        res.status(status);
        res.send({
            response: false,
            message: msg,
            errors: errors
        });
    }

    static success(res, msg, data = []) {
        res.send({
            response: true,
            message: msg,
            data: data
        });
    }
}

module.exports = RouteHandler;
