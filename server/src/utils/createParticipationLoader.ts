import DataLoader from 'dataloader';
import { Participation } from '../entities/Participation';
import dataSource from '..//datasource';
import { In } from 'typeorm';

export const createParticipationLoader = () =>
  new DataLoader<
    { userId: string; agendaId: number },
    Participation | null | undefined
  >(async (keys) => {
    const participations = await dataSource.manager.findBy(Participation, {
      userId: In(keys.map((k) => k.userId)),
      agendaId: In(keys.map((k) => k.agendaId)),
    });
    const participationMappedById: Record<string, Participation> = {};

    participations.forEach((p) => {
      participationMappedById[`${p.agendaId}|${p.userId}`] = p;
    });

    const orderedParticipations = keys.map(
      (k) => participationMappedById[`${k.agendaId}|${k.userId}`],
    );

    return orderedParticipations;
  });
