import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.create(userData);
    return await this.save(user);
  }

  async findUserById(user_id: string): Promise<UserEntity | undefined> {
    return await this.findOne({ where: { user_id } });
  }

  async updateUser(
    user_id: string,
    updateUserDto: Partial<UserEntity>,
  ): Promise<UserEntity | undefined> {
    await this.update(user_id, updateUserDto);
    return this.findUserById(user_id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete(id);
  }

  async findUserProfileById(user_id: string): Promise<UserEntity | undefined> {
    // Assuming that you have a column in your User entity named 'id'
    return await this.findUserById(user_id);
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

    if (type === 'artists') {
      // Add conditions for fetching top artists
      queryBuilder.innerJoin('user.artists', 'artist'); // Join with artists table
      // Apply filters specific to fetching top artists
      queryBuilder.where('artist.popularity > :popularityThreshold', {
        popularityThreshold: 80,
      });
    } else if (type === 'tracks') {
      // Add conditions for fetching top tracks
      queryBuilder.innerJoin('user.tracks', 'track'); // Join with tracks table
      // Apply filters specific to fetching top tracks
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      queryBuilder.where('track.release_date > :oneYearAgo', { oneYearAgo });
    }

    // Limit the result to the specified 'limit'
    queryBuilder.take(limit);

    // Execute the query and return the results
    const users = await queryBuilder.getMany();
    return users;
  }

  async followPlaylist(
    userId: number,
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
}
