class UserController {
    static async register(req, res, next) {
        try {
            res.status(201).json({ message: "register" })
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        try {
            res.status(201).json({ message: "login" })
        } catch (err) {
            next(err)
        }
    }

    static async postSchools(req, res, next) {
        try {
            res.status(201).json({ message: "postSchools" })
        } catch (err) {
            next(err)
        }
    }

    static async postBalances(req, res, next) {
        try {
            res.status(201).json({ message: "postBalances" })
        } catch (err) {
            next(err)
        }
    }
    static async getBalance(req, res, next) {
        try {
            res.status(201).json({ message: "getBalance" })
        } catch (err) {
            next(err)
        }
    }
    static async updateBalance(req, res, next) {
        try {
            res.status(201).json({ message: "updateBalance" })
        } catch (err) {
            next(err)
        }
    }

    static async postSubscription(req, res, next) {
        try {
            res.status(201).json({ message: "postSubscription" })
        } catch (err) {
            next(err)
        }
    }
    static async getSubscription(req, res, next) {
        try {
            res.status(201).json({ message: "getSubscription" })
        } catch (err) {
            next(err)
        }
    }
    static async updateSubscription(req, res, next) {
        try {
            res.status(201).json({ message: "updateSubscription" })
        } catch (err) {
            next(err)
        }
    }

    static async getUserDetail(req, res, next) {
        try {
            res.status(201).json({ message: "getUserDetail" })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController