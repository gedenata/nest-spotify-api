import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.create(userData);
    return await this.save(user);
  }

  async findUserById(id: string): Promise<User | undefined> {
    return await this.findOne({ where: { id } });
  }

  async updateUser(
    id: string,
    updateUserDto: Partial<User>,
  ): Promise<User | undefined> {
    await this.update(id, updateUserDto);
    return this.findUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete(id);
  }

  async findUserProfileById(id: string): Promise<User | undefined> {
    // Assuming that you have a column in your User entity named 'id'
    return await this.findUserById(id);
  }

  async getUserTopItems(
    userId: string,
    type: string,
    limit: number,
  ): Promise<User[]> {
    const queryBuilder = this.createQueryBuilder('user')
      .select(['user.id', 'user.display_name', 'user.email'])
      .leftJoinAndSelect('user.images', 'image')
      .where('user.id = :userId', { userId })
      .orderBy('your_order_column', 'DESC'); // Specify the column for ordering

    // Add additional conditions based on the 'type' parameter
    if (type === 'artists') {
      // Add conditions for fetching top artists
      // For example, you can join with related tables and apply filters
    } else if (type === 'tracks') {
      // Add conditions for fetching top tracks
      // For example, you can join with related tables and apply filters
    }

    // Limit the result to the specified 'limit'
    queryBuilder.take(limit);

    // Execute the query and return the results
    const users = await queryBuilder.getMany();
    return users;
  }
}
