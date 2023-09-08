import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.create(userData);
    return await this.save(user);
  }

  async findUserById(id: number): Promise<User | undefined> {
    return await this.findOne({ where: { id } });
  }

  async updateUser(
    id: number,
    updateUserDto: Partial<User>,
  ): Promise<User | undefined> {
    await this.update(id, updateUserDto);
    return this.findUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete(id);
  }
}
