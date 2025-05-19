import { faker } from '@faker-js/faker';
import { User } from '../src/entities/User';
import { Agenda } from '../src/entities/Agenda';
import { DataSource } from 'typeorm';
import { Participation } from '../src/entities/Participation';

const DEFAULT_USER = 'c0a60c4b-1316-4064-b435-22c0bd474821';

const datasource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [User, Agenda, Participation],
});

async function main() {
  await datasource.initialize();

  await datasource.manager.transaction(async (tx) => {
    const user = tx.create(User, {
      id: DEFAULT_USER,
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'test-user',
      email: 'test-user@test.com',
    });

    await tx.upsert(User, user, {
      conflictPaths: ['id'],
    });

    for (let i = 0; i < 50; i++) {
      const startTime = faker.date.past();
      const endTime = faker.date.future({ refDate: startTime });

      await tx.upsert(
        Agenda,
        {
          name: faker.word.noun({ length: { min: 2, max: 4 } }),
          description: faker.word.words({ count: { min: 5, max: 25 } }),
          venue: faker.location.streetAddress(),
          startTime: startTime,
          endTime: endTime,
          organizerId: DEFAULT_USER,
          createdAt: faker.date.past(),
          updatedAt: faker.date.past(),
        },
        {
          conflictPaths: ['name'],
        },
      );
    }
  });
}
main()
  .then(() => {
    console.log('Seed done');
  })
  .catch((err) => {
    console.error(err);
  });
