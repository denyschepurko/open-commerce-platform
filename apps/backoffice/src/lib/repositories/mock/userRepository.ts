
import { users } from "@/lib/repositories/mock/data/users";
import { UserRepository } from "../interfaces";

export const mockUserRepository: UserRepository = {
  async findAll() {
    return users;
  },

  async findById(id: string) {
    return users.find((u) => u.id === id) ?? null;
  },

  async findByEmail(email: string) {
    return users.find((u) => u.email === email) ?? null;
  },
};