/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Agendas($limit: Int!, $cursor: String) {\n    agendas(limit: $limit, cursor: $cursor) {\n      id\n      name\n      description\n      organizerId\n      startTime\n      endTime\n      organizer {\n        username\n      }\n      venue\n      isParticipating\n    }\n  }\n": typeof types.AgendasDocument,
    "\n  query Agenda($agendaId: Int!) {\n    agenda(agendaId: $agendaId) {\n      id\n      organizerId\n      name\n      venue\n      description\n      startTime\n      endTime\n      organizer {\n        username\n      }\n      participation {\n        userId\n        user {\n          username\n        }\n      }\n      isParticipating\n    }\n  }\n": typeof types.AgendaDocument,
    "\n  mutation CreateAgenda($input: AgendaInput!) {\n    createAgenda(input: $input) {\n      name\n      description\n      startTime\n      endTime\n      venue\n    }\n  }\n": typeof types.CreateAgendaDocument,
};
const documents: Documents = {
    "\n  query Agendas($limit: Int!, $cursor: String) {\n    agendas(limit: $limit, cursor: $cursor) {\n      id\n      name\n      description\n      organizerId\n      startTime\n      endTime\n      organizer {\n        username\n      }\n      venue\n      isParticipating\n    }\n  }\n": types.AgendasDocument,
    "\n  query Agenda($agendaId: Int!) {\n    agenda(agendaId: $agendaId) {\n      id\n      organizerId\n      name\n      venue\n      description\n      startTime\n      endTime\n      organizer {\n        username\n      }\n      participation {\n        userId\n        user {\n          username\n        }\n      }\n      isParticipating\n    }\n  }\n": types.AgendaDocument,
    "\n  mutation CreateAgenda($input: AgendaInput!) {\n    createAgenda(input: $input) {\n      name\n      description\n      startTime\n      endTime\n      venue\n    }\n  }\n": types.CreateAgendaDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Agendas($limit: Int!, $cursor: String) {\n    agendas(limit: $limit, cursor: $cursor) {\n      id\n      name\n      description\n      organizerId\n      startTime\n      endTime\n      organizer {\n        username\n      }\n      venue\n      isParticipating\n    }\n  }\n"): typeof import('./graphql').AgendasDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Agenda($agendaId: Int!) {\n    agenda(agendaId: $agendaId) {\n      id\n      organizerId\n      name\n      venue\n      description\n      startTime\n      endTime\n      organizer {\n        username\n      }\n      participation {\n        userId\n        user {\n          username\n        }\n      }\n      isParticipating\n    }\n  }\n"): typeof import('./graphql').AgendaDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAgenda($input: AgendaInput!) {\n    createAgenda(input: $input) {\n      name\n      description\n      startTime\n      endTime\n      venue\n    }\n  }\n"): typeof import('./graphql').CreateAgendaDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
