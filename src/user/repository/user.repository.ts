import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.create(userData);
    return await this.save(user);
  }

  async findUserById(id: string): Promise<UserEntity | undefined> {
    return await this.findOne({ where: { id } });
  }

  async updateUser(
    id: string,
    updateUserDto: Partial<UserEntity>,
  ): Promise<UserEntity | undefined> {
    await this.update(id, updateUserDto);
    return this.findUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete(id);
  }

  async findUserProfileById(id: string): Promise<UserEntity | undefined> {
    // Assuming that you have a column in your User entity named 'id'
    return await this.findUserById(id);
  }

  async getUserTopItems(
    userId: string,
    type: string,
    limit: number,
  ): Promise<UserEntity[]> {
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

  async followPlaylist(
    userId: string,
    playlistId: string,
    isPublic: boolean,
  ): Promise<UserEntity | null> {
    const user = await this.findOne({ where: { id: userId } });
    if (!user) {
      return null;
    }

    user.followedPlaylists.push(playlistId);

    if (isPublic) {
      user.publicFollowedPlaylists.push(playlistId);
    }
    await this.save(user);

    return user;
  }

  async unfollowPlaylist(userId: string, playlistId: string): Promise<void> {
    const user = await this.findOne({ where: { id: userId } });
    if (!user) {
      return null;
    }

    if (user.followedPlaylists.includes(playlistId)) {
      user.followedPlaylists = user.followedPlaylists.filter(
        (id) => id !== playlistId,
      );

      try {
        await this.save(user);
      } catch (error) {
        throw error;
      }
    }
  }
}
