import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import model from '../models';
import config from '../config';
import 'dotenv/config';
import validators from '../validators';



class AuthController {
  async SignUp(req, res, next) {
    try {
      let error = validators.auth.signUp(req, res);
      if (error) {
        res.status(config.status.BAD_REQUEST).json(error.details);
      } else {
        let user = await new model.User(req.body).save();
        let message = true;
        res.status(config.status.SUCCESS).json({ message });
      }
    }
    catch (message) {
      next({ status: config.status.SERVER_ERROR, errmsg: 'Server error' })
    }
  }

  async SignIn(req, res, next) {
    try {
      let error = validators.auth.signIn(req, res);
      if (error) {
        res.status(config.status.BAD_REQUEST).json(error.details);
      } else {
        let { email, password } = req.body,
          user = await model.User.findOne({ email });
        if (!user) res.status(config.status.UNAUTHORIZED).json([{ error: 'login or password is in correct' }]);
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const ACCESS_TOKEN = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: 1440 });
          res.json({ ACCESS_TOKEN, user });
        } else {
          res.status(config.status.UNAUTHORIZED).json([{ error: 'login or password is in correct' }]);
        }
      }
    }
    catch (err) {
      next({ status: config.status.SERVER_ERROR, errmsg: 'Server error' })
    }
  }
}

export default new AuthController();
