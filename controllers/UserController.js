const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, School, Subscription } = require("../models");
const { sequelize } = require("../models");
const midtransClient = require("midtrans-client");

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
      if (!findUser) throw { message: "invalid_email/pass" };
      const compare = comparePassword(password, findUser.password);
      if (!compare) throw { message: "invalid_email/pass" };

      const payload = { id: findUser.id };
      const access_token = signToken(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async postBalances(req, res, next) {
    try {
      const order = req.body.order;
      const gross = req.body.gross;

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-degeBoSA2XjP6Yf9u6u8wMLL",
      });

      let parameter = {
        transaction_details: {
          order_id: order,
          gross_amount: gross,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: "hahahaha",
          last_name: "",
          email: "test@mail.com",
          phone: "087777777",
        },
      };
      snap.createTransaction(parameter).then((transaction) => {
        res.status(201).json(transaction);
      });
    } catch (err) {
      next(err);
    }
  }

  static async getBalance(req, res, next) {
    try {
      const { userId } = req.params;
      const findUser = await User.findById(userId);
      res.status(200).json({ balance: findUser.balance });
    } catch (err) {
      next(err);
    }
  }
  static async updateBalance(req, res, next) {
    try {
      console.log(req.body);
      const id = req.user.id;

      //   const { userId } = req.params;
      //   const { balance } = req.body;
      //   await User.update({ balance }, { where: { id: userId } });
      //   res
      //     .status(201)
      //     .json({ message: "success update balance with user id: " + userId });
    } catch (err) {
      next(err);
    }
  }

  static async postSubscription(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { type, price, goHomeTime, toShoolTime, DriverId } = req.body;
      let { SchoolId } = req.body;
      let startDate = new Date();
      let endDate;

      if (!SchoolId) {
        const { name, coordinate, address } = req.body;
        const createSchool = await School.create(
          { name, coordinate, address },
          { transaction: t }
        );
        SchoolId = createSchool.id;
      }
      if (type == "weekly") endDate = startDate.setDate(date.getDate() + 7);
      // disini harusnya dipikirin gimana kalo ditengah subs ada hari minggu
      else if (type == "monthly")
        endDate = startDate.setDate(date.getDate() + 30);

      const createSubs = await Subscription(
        {
          type,
          price,
          goHomeTime,
          toShoolTime,
          DriverId,
          SchoolId,
          startDate,
          endDate,
          status: "active",
        },
        { transaction: t }
      );

      t.commit();
      res
        .status(201)
        .json({ message: "success create subscription " + createSubs.id });
    } catch (err) {
      t.rollback();
      next(err);
    }
  }
  static async getSubscription(req, res, next) {
    try {
      const { id } = req.params;
      const detailSubs = await Subscription.findById(id);
      if (!detailSubs) throw { message: "notfound" };
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
      const { id } = req.params;
      const detailUser = await User.findById(id);
      if (!detailUser) throw { message: "notfound" };
      res.status(200).json(detailUser);
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
