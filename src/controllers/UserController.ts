import { Request, Response } from "express";
import User from "../database/schema/User";
import Helpers from "../helpers";
import db from "../database";

class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    const allUsers = [...(await User.find())];
    const requiredUsers = [];

    allUsers.forEach((user, index) => {
      const { _id, email, firstName, lastName, updatedAt, createdAt } = user;
      requiredUsers[index] = {
        _id,
        email,
        firstName,
        lastName,
        updatedAt,
        createdAt,
      };
    });

    return res.status(200).json(requiredUsers);
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    if (await Helpers.Validators.checkIfEmailExists(req.body.email))
      return res
        .status(422)
        .json({ code: 422, message: "This email is already in use!" });

    let statusCode, dataResponse, validate;

    validate = await Helpers.Validators.isValidRegisterUser(req.body);

    const currentRegister = req.body;
    currentRegister.password =
      await Helpers.Cryptographer.passwordCryptographer(
        currentRegister.password
      );

    if (validate === true) {
      try {
        dataResponse = await db.insertOn(User, currentRegister);
        statusCode = 200;
      } catch (error) {
        console.log(error);
        statusCode = error.code;
      }
    } else {
      const { code, message } = validate;
      statusCode = code;
      dataResponse = { code, message };
    }
    return res
      .status(statusCode)
      .json(dataResponse._id ? { _id: dataResponse._id } : dataResponse);
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    let statusCode, dataResponse;
    try {
      dataResponse = await db.findByIdOn(
        User,
        req.params.id,
        "-password -createdAt -updatedAt -__v"
      );
      statusCode = 200;
    } catch (error) {
      statusCode = 500;
    }
    return res.status(statusCode).json(dataResponse ? dataResponse : null);
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    let statusCode, dataResponse;
    try {
      await db.deleteOneOn(User, { _id: req.params.id });
      dataResponse = { code: 200, message: "Successfully remove." };
      statusCode = 200;
    } catch (error) {
      statusCode = 500;
    }
    return res.status(statusCode).json(dataResponse ? dataResponse : null);
  }
}

export default new UserController();
