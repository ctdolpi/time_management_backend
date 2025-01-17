import { IUser } from "../../models/UserModel";
import { Request } from "express";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUser;
//     }
//   }
// }

export interface URequest extends Request {
  user?: IUser;
}
