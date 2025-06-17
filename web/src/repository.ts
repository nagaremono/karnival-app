import { graphql } from './graphql';
import { AgendaInput, TypedDocumentString } from './graphql/graphql';

type ExecuteOpts = {
  serverSide: boolean;
  session?: unknown | null;
  headers?: Record<string, string>;
};

export async function execute<
  TResult,
  TVariables extends Record<string, unknown>,
>(
  query: TypedDocumentString<TResult, TVariables>,
  variables?: TVariables,
  opts?: ExecuteOpts,
) {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json',
      ...opts?.headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: opts?.serverSide ? 'no-store' : 'force-cache',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const json = await response.json();
  return json.data as TResult;
}

type EventInput = AgendaInput;

export const agendasQuery = graphql(`
  query Agendas($limit: Int!, $cursor: String) {
    agendas(limit: $limit, cursor: $cursor) {
      id
      name
      description
      organizerId
      startTime
      endTime
      organizer {
        username
      }
      venue
      isParticipating
    }
  }
`);

export type GetEventsResult = ReturnType<typeof getEvents>;

export async function getEvents(
  limit?: number,
  cursor?: string,
  serverSide = false,
) {
  const agendas = await execute(
    agendasQuery,
    {
      limit: limit || 10,
      cursor,
    },
    { serverSide },
  );

  return agendas.agendas;
}

const agendaDetailQuery = graphql(`
  query Agenda($agendaId: Int!) {
    agenda(agendaId: $agendaId) {
      id
      organizerId
      name
      venue
      description
      startTime
      endTime
      organizer {
        username
      }
      participation {
        userId
        user {
          username
        }
      }
      isParticipating
    }
  }
`);

export async function getEventDetail(eventId: number, serverSide = false) {
  const agenda = await execute(
    agendaDetailQuery,
    { agendaId: eventId },
    { serverSide },
  );
  return agenda.agenda;
}

export const createAgendaMutation = graphql(`
  mutation CreateAgenda($input: AgendaInput!) {
    createAgenda(input: $input) {
      name
      description
      startTime
      endTime
      venue
    }
  }
`);

export function createEvent(input: EventInput) {
  return execute(
    createAgendaMutation,
    {
      input,
    },
    {
      serverSide: false,
    },
  );
}

export const updateAgendaMutation = graphql(`
  mutation UpdateAgenda($agendaId: Int!, $input: AgendaInput!) {
    updateAgenda(agendaId: $agendaId, input: $input) {
      name
      description
      venue
      endTime
      startTime
    }
  }
`);

export function updateEvent(eventId: number, input: EventInput) {
  return execute(
    updateAgendaMutation,
    {
      agendaId: eventId,
      input,
    },
    {
      serverSide: false,
    },
  );
}

export const deleteAgendaMutation = graphql(`
  mutation DeleteAgenda($agendaId: Int!) {
    deleteAgenda(agendaId: $agendaId)
  }
`);

export function deleteEvent(eventId: number) {
  return execute(
    deleteAgendaMutation,
    {
      agendaId: eventId,
    },
    {
      serverSide: false,
    },
  );
}

export const toggleParticipationMutation = graphql(`
  mutation toggleParticipation($agendaId: Int!) {
    toggleParticipation(agendaId: $agendaId)
  }
`);

export function toggleParticipation(eventId: number) {
  return execute(
    toggleParticipationMutation,
    {
      agendaId: eventId,
    },
    {
      serverSide: false,
    },
  );
}
