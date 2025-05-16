import { Agenda, TypedDocumentString } from './graphql/graphql';
import { agendasQuery } from './graphql/queries';

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

export async function getAgendas(
  limit?: number,
  cursor?: number,
): Promise<Agenda[]> {
  const agendas = await execute(agendasQuery, {
    limit: limit || 10,
    cursor,
  });

  return agendas as Agenda[];
}
