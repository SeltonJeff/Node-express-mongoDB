import { Request, Response } from "express";
import User from "../database/schema/User";
import Helpers from "../helpers";
import db from "../database";
import { sign } from "jsonwebtoken";

class AuthController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    async function getUserAndCheckEmail() {
      const currentUser = await db.findOneOn(User, { email });
      if (!currentUser) {
        return res
          .status(422)
          .json({ code: 422, message: "Incorrect email and/or password." });
      }
      return currentUser;
    }

    async function checkPassword(currentPassword) {
      const passwordOk = await Helpers.Validators.checkPassword(
        password,
        currentPassword
      );
      if (!passwordOk) {
        res
          .status(422)
          .json({ code: 422, message: "Incorrect email and/or password." });
      }
    }

    function generateToken(currentUser) {
      const token = sign(
        { firstName: currentUser.firstName, lastName: currentUser.lastName },
        process.env.TOKEN_KEY,
        {
          subject: currentUser._id.toString(),
          expiresIn: "30m",
        }
      );
      return token;
    }

    try {
      const currentUser = await getUserAndCheckEmail();
      await checkPassword(currentUser.password);
      const token = generateToken(currentUser);

      res.status(200).json({ token });
    } catch (error) {
      res.status(error.code).json({ code: error.code, message: error.message });
    }
    return;
  }
}

export default new AuthController();
