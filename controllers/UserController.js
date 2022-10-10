const {comparePassword} = require("../helpers/bcrypt");
const {signToken} = require("../helpers/jwt");
const { User, School, Subscription } = require("../models");
const { sequelize } = require("../models");

class UserController {
    static async register(req, res, next) {
        try {
            const {
                fullName,
                email,
                password,
                phoneNumber,
                address,
                houseCoordinate,
                childrenName,
            } = req.body;

            const createUser = await User.create({
                fullName,
                email,
                password,
                phoneNumber,
                address,
                houseCoordinate,
                childrenName,
                balance: 0,
            });
            res.status(201).json({
                id: createUser.id,
                email: createUser.email,
            });
        } catch (err) {
            next(err);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const findUser = await User.findOne({ where: { email } });
            if (!findUser) throw { name: "invalid_email/pass" }
            const compare = comparePassword(password, findUser.password)
            if (!compare) throw { name: "invalid_email/pass" }

            const payload = { id: findUser.id }
            const access_token = signToken(payload)

            res.status(200).json({ access_token });
        } catch (err) {
            next(err);
        }
    }

    // static async postBalances(req, res, next) {
    //     try {
    //         res.status(201).json({ message: "postBalances" });
    //     } catch (err) {
    //         next(err);
    //     }
    // }
    static async getBalance(req, res, next) {
        try {
            const { userId } = req.params
            console.log(userId)
            const findUser = await User.findByPk(userId)
            res.status(200).json({ balance: findUser.balance });
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
    static async updateBalance(req, res, next) {
        try {
            const { userId } = req.params
            const { balance } = req.body
            await User.update({balance}, {where: { id: userId }})
            res.status(201).json({ message: "success update balance with user id: " + userId });
        } catch (err) {
            next(err);
        }
    }

    static async postSubscription(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { type, price, goHomeTime, toShoolTime, DriverId, SchoolId } = req.body
            let startDate = new Date()
            // let currtDate = new Date()
            let endDate = new Date()

            //TODO dayJS
            if (type == "weekly") endDate = new Date(endDate.setDate(startDate.getDate() + 7)) // disini harusnya dipikirin gimana kalo ditengah subs ada hari minggu
            else if (type == "monthly") endDate = new Date(endDate.setDate(startDate.getDate() + 30))


            const createSubs = await Subscription.create({
                type, price, goHomeTime, toShoolTime, DriverId, SchoolId, startDate, endDate, 
                status: "active"
            }, { transaction: t })

            t.commit();
            res.status(201).json({ message: "success create subscription " + createSubs.id });
        } catch (err) {
            console.log(err)
            t.rollback()
            next(err);
        }
    }
    static async getSubscription(req, res, next) {
        try {
            const { id } = req.params
            const detailSubs = await Subscription.findById(id)
            if (!detailSubs) throw { message: "notfound" }
            res.status(200).json(detailSubs);
        } catch (err) {
            next(err);
        }
    }
    static async updateSubscription(req, res, next) {
        try {
            res.status(201).json({ message: "updateSubscription" });
        } catch (err) {
            next(err);
        }
    }

    static async getUserDetail(req, res, next) {
        try {
            const { id } = req.params
            const detailUser = await User.findById(id)
            if (!detailUser) throw { message: "notfound" }
            res.status(200).json(detailUser);
        } catch (err) {
            next(err);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const { id } = req.params
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController;
