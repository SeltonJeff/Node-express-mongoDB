import User from "../../database/schema/User";
import { compare } from "bcryptjs";

interface ValidatorsInterface {
  isValidRegisterUser: (data: object) => object | boolean;
  checkIfEmailExists: (email: string) => Promise<any>;
  checkPassword: (DBpass: string, currentPass: string) => Promise<boolean>;
}

class Validators implements ValidatorsInterface {
  public isValidRegisterUser(data): object | boolean {
    const { password, lastName, firstName, email } = data;
    if (!password || password === "")
      return { code: 422, message: "Invalid password." };
    if (!lastName || lastName === "")
      return { code: 422, message: "Invalid last name." };
    if (!firstName || firstName === "")
      return { code: 422, message: "Invalid first name." };
    if (!email || email === "") return { code: 422, message: "Invalid email." };
    return true;
  }

  public async checkIfEmailExists(email): Promise<any> {
    const emailExists = await User.findOne({ email });
    return !!emailExists;
  }

  public async checkPassword(currentPass, DBPass): Promise<boolean> {
    return await compare(currentPass, DBPass);
  }
}

export default new Validators();
