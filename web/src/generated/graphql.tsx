import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  agenda: Agenda;
  agendas?: Maybe<Array<Agenda>>;
};


export type QueryAgendaArgs = {
  agendaId: Scalars['Float'];
};


export type QueryAgendasArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  agendas: Array<Agenda>;
  participation: Array<Participation>;
};

export type Agenda = {
  __typename?: 'Agenda';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  venue: Scalars['String'];
  participation: Array<Participation>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  organizer: User;
  organizerId: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  isParticipating: Scalars['Boolean'];
};

export type Participation = {
  __typename?: 'Participation';
  userId: Scalars['Float'];
  agendaId: Scalars['Float'];
  user?: Maybe<User>;
  agenda?: Maybe<Agenda>;
};


export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  cancelParticipate: Scalars['Boolean'];
  participate: Scalars['Boolean'];
  createAgenda: Agenda;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCancelParticipateArgs = {
  agendaId: Scalars['Int'];
};


export type MutationParticipateArgs = {
  agendaId: Scalars['Float'];
};


export type MutationCreateAgendaArgs = {
  input: AgendaInput;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmpassword: Scalars['String'];
};

export type AgendaInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  venue: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
};

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'username' | 'id'>
);

export type CreateAgendaMutationVariables = Exact<{
  input: AgendaInput;
}>;


export type CreateAgendaMutation = (
  { __typename?: 'Mutation' }
  & { createAgenda: (
    { __typename?: 'Agenda' }
    & Pick<Agenda, 'name' | 'description' | 'startTime' | 'endTime'>
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  confirmpassword: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type AgendasQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type AgendasQuery = (
  { __typename?: 'Query' }
  & { agendas?: Maybe<Array<(
    { __typename?: 'Agenda' }
    & Pick<Agenda, 'name' | 'description' | 'id' | 'startTime' | 'endTime' | 'venue' | 'isParticipating'>
    & { organizer: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  username
  id
}
    `;
export const CreateAgendaDocument = gql`
    mutation CreateAgenda($input: AgendaInput!) {
  createAgenda(input: $input) {
    name
    description
    startTime
    endTime
  }
}
    `;
export type CreateAgendaMutationFn = Apollo.MutationFunction<CreateAgendaMutation, CreateAgendaMutationVariables>;

/**
 * __useCreateAgendaMutation__
 *
 * To run a mutation, you first call `useCreateAgendaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAgendaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAgendaMutation, { data, loading, error }] = useCreateAgendaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAgendaMutation(baseOptions?: Apollo.MutationHookOptions<CreateAgendaMutation, CreateAgendaMutationVariables>) {
        return Apollo.useMutation<CreateAgendaMutation, CreateAgendaMutationVariables>(CreateAgendaDocument, baseOptions);
      }
export type CreateAgendaMutationHookResult = ReturnType<typeof useCreateAgendaMutation>;
export type CreateAgendaMutationResult = Apollo.MutationResult<CreateAgendaMutation>;
export type CreateAgendaMutationOptions = Apollo.BaseMutationOptions<CreateAgendaMutation, CreateAgendaMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    user {
      ...UserFragment
    }
    errors {
      field
      message
    }
  }
}
    ${UserFragmentFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $confirmpassword: String!, $email: String!) {
  register(input: {username: $username, password: $password, confirmpassword: $confirmpassword, email: $email}) {
    user {
      ...UserFragment
    }
    errors {
      field
      message
    }
  }
}
    ${UserFragmentFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      confirmpassword: // value for 'confirmpassword'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const AgendasDocument = gql`
    query Agendas($limit: Int!, $cursor: String) {
  agendas(limit: $limit, cursor: $cursor) {
    name
    description
    id
    startTime
    endTime
    organizer {
      username
    }
    venue
    isParticipating
  }
}
    `;

/**
 * __useAgendasQuery__
 *
 * To run a query within a React component, call `useAgendasQuery` and pass it any options that fit your needs.
 * When your component renders, `useAgendasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAgendasQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useAgendasQuery(baseOptions?: Apollo.QueryHookOptions<AgendasQuery, AgendasQueryVariables>) {
        return Apollo.useQuery<AgendasQuery, AgendasQueryVariables>(AgendasDocument, baseOptions);
      }
export function useAgendasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AgendasQuery, AgendasQueryVariables>) {
          return Apollo.useLazyQuery<AgendasQuery, AgendasQueryVariables>(AgendasDocument, baseOptions);
        }
export type AgendasQueryHookResult = ReturnType<typeof useAgendasQuery>;
export type AgendasLazyQueryHookResult = ReturnType<typeof useAgendasLazyQuery>;
export type AgendasQueryResult = Apollo.QueryResult<AgendasQuery, AgendasQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;