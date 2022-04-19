import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface AuthenticatorsMiddlewaresInterface {
  isAuthenticated: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<any> | void>;
}

class AuthenticatorsMiddlewares implements AuthenticatorsMiddlewaresInterface {
  public async isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authToken = req.headers.authorization;
    if (!authToken) {
      return res.status(401).json({ code: 401, message: "Token is missing." });
    }

    const [bearer, token] = authToken.split(" ");
    try {
      await verify(token, process.env.TOKEN_KEY);
      return next();
    } catch (error) {
      res.status(401).json({ code: 401, message: "Invalid token." });
    }
  }
}

export default new AuthenticatorsMiddlewares();
