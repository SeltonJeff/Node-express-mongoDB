import { hash } from "bcryptjs";

interface CryptographerInterface {
  passwordCryptographer: (password: string) => Promise<string>;
}

class Cryptographer implements CryptographerInterface {
  public async passwordCryptographer(password) {
    const saltNumber = 9;
    return await hash(password, saltNumber);
  }
}

export default new Cryptographer();
