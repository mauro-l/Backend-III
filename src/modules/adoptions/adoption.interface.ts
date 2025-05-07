import { Types } from "mongoose";

export interface IAdoption {
  owner: Types.ObjectId;
  pet: Types.ObjectId;
}
