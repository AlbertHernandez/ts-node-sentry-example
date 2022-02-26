import { User } from "../models";

export interface UserRepository {
  getAllUsers(): User[];
}
