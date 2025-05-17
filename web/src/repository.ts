import { graphql } from './graphql';
import { TypedDocumentString } from './graphql/graphql';

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await fetch('https://graphql.org/graphql/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json() as TResult;
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
