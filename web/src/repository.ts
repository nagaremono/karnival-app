import { graphql } from './graphql';
import { AgendaInput, TypedDocumentString } from './graphql/graphql';
import { UserSession } from './app/auth';

type ExecuteOpts = {
  serverSide: boolean;
  session?: UserSession | null;
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
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: opts?.serverSide ? 'no-store' : 'force-cache',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const json = await response.json();
  return json.data as TResult;
}

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

export async function getAgendas(limit?: number, cursor?: string) {
  const agendas = await execute(agendasQuery, {
    limit: limit || 10,
    cursor,
  });

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

export async function getAgendaDetail(agendaId: number) {
  const agenda = await execute(agendaDetailQuery, { agendaId });
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

export function createAgenda(input: AgendaInput, session?: UserSession | null) {
  return execute(
    createAgendaMutation,
    {
      input,
    },
    { serverSide: false, session },
  );
}
