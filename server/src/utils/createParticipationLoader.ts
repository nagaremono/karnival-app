import DataLoader from 'dataloader';
import { Participation } from '../entities/Participation';

export const createParticipationLoader = () =>
  new DataLoader<
    { userId: number; agendaId: number },
    Participation | null | undefined
  >(async (keys) => {
    const participations = await Participation.findByIds(keys as any);

    const participationMappedById: Record<string, Participation> = {};

    participations.forEach((p) => {
      participationMappedById[`${p.agendaId}|${p.userId}`] = p;
    });

    const orderedParticipations = keys.map(
      (k) => participationMappedById[`${k.agendaId}|${k.userId}`]
    );

    return orderedParticipations;
  });
