import DataLoader from 'dataloader';
import { User } from '../entities/User';
import dataSource from '../datasource';
import { In } from 'typeorm';

export const createUserLoader = () =>
  new DataLoader<string, User>(async (userIds) => {
    const users = await dataSource.manager.findBy(User, {
      id: In(userIds),
    });
    const userIdToUser: Record<string, User> = {};

    users.forEach((user) => {
      userIdToUser[user.id] = user;
    });

    const sortedUsers = userIds.map((userId) => userIdToUser[userId]);

    return sortedUsers;
  });
