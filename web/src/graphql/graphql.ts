/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
};

export type Agenda = {
  __typename?: 'Agenda';
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  endTime: Scalars['DateTimeISO']['output'];
  id: Scalars['Int']['output'];
  isParticipating: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  organizer: User;
  organizerId: Scalars['String']['output'];
  participation: Array<Participation>;
  startTime: Scalars['DateTimeISO']['output'];
  updatedAt: Scalars['String']['output'];
  venue: Scalars['String']['output'];
};

export type AgendaInput = {
  description: Scalars['String']['input'];
  endTime: Scalars['DateTimeISO']['input'];
  name: Scalars['String']['input'];
  startTime: Scalars['DateTimeISO']['input'];
  venue: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAgenda: Agenda;
  deleteAgenda: Scalars['Boolean']['output'];
  toggleParticipation: Scalars['Boolean']['output'];
  updateAgenda?: Maybe<Agenda>;
};


export type MutationCreateAgendaArgs = {
  input: AgendaInput;
};


export type MutationDeleteAgendaArgs = {
  agendaId: Scalars['Int']['input'];
};


export type MutationToggleParticipationArgs = {
  agendaId: Scalars['Int']['input'];
  isParticipating: Scalars['Boolean']['input'];
};


export type MutationUpdateAgendaArgs = {
  agendaId: Scalars['Int']['input'];
  input: AgendaInput;
};

export type Participation = {
  __typename?: 'Participation';
  agenda?: Maybe<Agenda>;
  agendaId: Scalars['Int']['output'];
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  agenda: Agenda;
  agendas?: Maybe<Array<Agenda>>;
  me?: Maybe<User>;
};


export type QueryAgendaArgs = {
  agendaId: Scalars['Int']['input'];
};


export type QueryAgendasArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  agendas: Array<Agenda>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  participation: Array<Participation>;
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type AgendasQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type AgendasQuery = { __typename?: 'Query', agendas?: Array<{ __typename?: 'Agenda', id: number, name: string, description: string, organizerId: string, startTime: any, endTime: any, venue: string, isParticipating: boolean, organizer: { __typename?: 'User', username: string } }> | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const AgendasDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<AgendasQuery, AgendasQueryVariables>;