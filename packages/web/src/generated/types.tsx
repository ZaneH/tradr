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
};

export type Mutation = {
  __typename?: 'Mutation';
  createWatcher?: Maybe<Watcher>;
  setActiveWatcher?: Maybe<Watcher>;
};


export type MutationCreateWatcherArgs = {
  fromTokenAmount: Scalars['Float'];
  toTokenAmount: Scalars['Float'];
  fromTokenId: Scalars['ID'];
  toTokenId: Scalars['ID'];
};


export type MutationSetActiveWatcherArgs = {
  id: Scalars['ID'];
  active: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  getAddress?: Maybe<Scalars['String']>;
  getSupportedTokens?: Maybe<Array<Maybe<Token>>>;
  getWatchers?: Maybe<Array<Maybe<Watcher>>>;
};

export type Token = {
  __typename?: 'Token';
  id: Scalars['String'];
  contract: Scalars['String'];
  symbol: Scalars['String'];
};

export type Watcher = {
  __typename?: 'Watcher';
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  fromAmount: Scalars['Float'];
  fromToken: Token;
  toAmount: Scalars['Float'];
  toToken: Token;
};

export type GetAddressQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAddressQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getAddress'>
);

export type GetSupportedTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSupportedTokensQuery = (
  { __typename?: 'Query' }
  & { getSupportedTokens?: Maybe<Array<Maybe<(
    { __typename?: 'Token' }
    & TokenFragmentFragment
  )>>> }
);

export type TokenFragmentFragment = (
  { __typename?: 'Token' }
  & Pick<Token, 'id' | 'symbol' | 'contract'>
);

export type WatcherFragmentFragment = (
  { __typename?: 'Watcher' }
  & Pick<Watcher, 'id' | 'isActive' | 'fromAmount' | 'toAmount'>
  & { toToken: (
    { __typename?: 'Token' }
    & TokenFragmentFragment
  ), fromToken: (
    { __typename?: 'Token' }
    & TokenFragmentFragment
  ) }
);

export type CreateWatcherMutationVariables = Exact<{
  fromTokenId: Scalars['ID'];
  toTokenId: Scalars['ID'];
  fromTokenAmount: Scalars['Float'];
  toTokenAmount: Scalars['Float'];
}>;


export type CreateWatcherMutation = (
  { __typename?: 'Mutation' }
  & { createWatcher?: Maybe<(
    { __typename?: 'Watcher' }
    & WatcherFragmentFragment
  )> }
);

export type SetActiveWatcherMutationVariables = Exact<{
  id: Scalars['ID'];
  active: Scalars['Boolean'];
}>;


export type SetActiveWatcherMutation = (
  { __typename?: 'Mutation' }
  & { setActiveWatcher?: Maybe<(
    { __typename?: 'Watcher' }
    & WatcherFragmentFragment
  )> }
);

export type GetWatchersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWatchersQuery = (
  { __typename?: 'Query' }
  & { getWatchers?: Maybe<Array<Maybe<(
    { __typename?: 'Watcher' }
    & WatcherFragmentFragment
  )>>> }
);

export const TokenFragmentFragmentDoc = gql`
    fragment TokenFragment on Token {
  id
  symbol
  contract
}
    `;
export const WatcherFragmentFragmentDoc = gql`
    fragment WatcherFragment on Watcher {
  id
  isActive
  fromAmount
  toAmount
  toToken {
    ...TokenFragment
  }
  fromToken {
    ...TokenFragment
  }
}
    ${TokenFragmentFragmentDoc}`;
export const GetAddressDocument = gql`
    query GetAddress {
  getAddress
}
    `;

/**
 * __useGetAddressQuery__
 *
 * To run a query within a React component, call `useGetAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAddressQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAddressQuery(baseOptions?: Apollo.QueryHookOptions<GetAddressQuery, GetAddressQueryVariables>) {
        return Apollo.useQuery<GetAddressQuery, GetAddressQueryVariables>(GetAddressDocument, baseOptions);
      }
export function useGetAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAddressQuery, GetAddressQueryVariables>) {
          return Apollo.useLazyQuery<GetAddressQuery, GetAddressQueryVariables>(GetAddressDocument, baseOptions);
        }
export type GetAddressQueryHookResult = ReturnType<typeof useGetAddressQuery>;
export type GetAddressLazyQueryHookResult = ReturnType<typeof useGetAddressLazyQuery>;
export type GetAddressQueryResult = Apollo.QueryResult<GetAddressQuery, GetAddressQueryVariables>;
export function refetchGetAddressQuery(variables?: GetAddressQueryVariables) {
      return { query: GetAddressDocument, variables: variables }
    }
export const GetSupportedTokensDocument = gql`
    query GetSupportedTokens {
  getSupportedTokens {
    ...TokenFragment
  }
}
    ${TokenFragmentFragmentDoc}`;

/**
 * __useGetSupportedTokensQuery__
 *
 * To run a query within a React component, call `useGetSupportedTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSupportedTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSupportedTokensQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSupportedTokensQuery(baseOptions?: Apollo.QueryHookOptions<GetSupportedTokensQuery, GetSupportedTokensQueryVariables>) {
        return Apollo.useQuery<GetSupportedTokensQuery, GetSupportedTokensQueryVariables>(GetSupportedTokensDocument, baseOptions);
      }
export function useGetSupportedTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSupportedTokensQuery, GetSupportedTokensQueryVariables>) {
          return Apollo.useLazyQuery<GetSupportedTokensQuery, GetSupportedTokensQueryVariables>(GetSupportedTokensDocument, baseOptions);
        }
export type GetSupportedTokensQueryHookResult = ReturnType<typeof useGetSupportedTokensQuery>;
export type GetSupportedTokensLazyQueryHookResult = ReturnType<typeof useGetSupportedTokensLazyQuery>;
export type GetSupportedTokensQueryResult = Apollo.QueryResult<GetSupportedTokensQuery, GetSupportedTokensQueryVariables>;
export function refetchGetSupportedTokensQuery(variables?: GetSupportedTokensQueryVariables) {
      return { query: GetSupportedTokensDocument, variables: variables }
    }
export const CreateWatcherDocument = gql`
    mutation CreateWatcher($fromTokenId: ID!, $toTokenId: ID!, $fromTokenAmount: Float!, $toTokenAmount: Float!) {
  createWatcher(fromTokenId: $fromTokenId, toTokenId: $toTokenId, fromTokenAmount: $fromTokenAmount, toTokenAmount: $toTokenAmount) {
    ...WatcherFragment
  }
}
    ${WatcherFragmentFragmentDoc}`;
export type CreateWatcherMutationFn = Apollo.MutationFunction<CreateWatcherMutation, CreateWatcherMutationVariables>;

/**
 * __useCreateWatcherMutation__
 *
 * To run a mutation, you first call `useCreateWatcherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWatcherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWatcherMutation, { data, loading, error }] = useCreateWatcherMutation({
 *   variables: {
 *      fromTokenId: // value for 'fromTokenId'
 *      toTokenId: // value for 'toTokenId'
 *      fromTokenAmount: // value for 'fromTokenAmount'
 *      toTokenAmount: // value for 'toTokenAmount'
 *   },
 * });
 */
export function useCreateWatcherMutation(baseOptions?: Apollo.MutationHookOptions<CreateWatcherMutation, CreateWatcherMutationVariables>) {
        return Apollo.useMutation<CreateWatcherMutation, CreateWatcherMutationVariables>(CreateWatcherDocument, baseOptions);
      }
export type CreateWatcherMutationHookResult = ReturnType<typeof useCreateWatcherMutation>;
export type CreateWatcherMutationResult = Apollo.MutationResult<CreateWatcherMutation>;
export type CreateWatcherMutationOptions = Apollo.BaseMutationOptions<CreateWatcherMutation, CreateWatcherMutationVariables>;
export const SetActiveWatcherDocument = gql`
    mutation SetActiveWatcher($id: ID!, $active: Boolean!) {
  setActiveWatcher(id: $id, active: $active) {
    ...WatcherFragment
  }
}
    ${WatcherFragmentFragmentDoc}`;
export type SetActiveWatcherMutationFn = Apollo.MutationFunction<SetActiveWatcherMutation, SetActiveWatcherMutationVariables>;

/**
 * __useSetActiveWatcherMutation__
 *
 * To run a mutation, you first call `useSetActiveWatcherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetActiveWatcherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setActiveWatcherMutation, { data, loading, error }] = useSetActiveWatcherMutation({
 *   variables: {
 *      id: // value for 'id'
 *      active: // value for 'active'
 *   },
 * });
 */
export function useSetActiveWatcherMutation(baseOptions?: Apollo.MutationHookOptions<SetActiveWatcherMutation, SetActiveWatcherMutationVariables>) {
        return Apollo.useMutation<SetActiveWatcherMutation, SetActiveWatcherMutationVariables>(SetActiveWatcherDocument, baseOptions);
      }
export type SetActiveWatcherMutationHookResult = ReturnType<typeof useSetActiveWatcherMutation>;
export type SetActiveWatcherMutationResult = Apollo.MutationResult<SetActiveWatcherMutation>;
export type SetActiveWatcherMutationOptions = Apollo.BaseMutationOptions<SetActiveWatcherMutation, SetActiveWatcherMutationVariables>;
export const GetWatchersDocument = gql`
    query GetWatchers {
  getWatchers {
    ...WatcherFragment
  }
}
    ${WatcherFragmentFragmentDoc}`;

/**
 * __useGetWatchersQuery__
 *
 * To run a query within a React component, call `useGetWatchersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWatchersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWatchersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWatchersQuery(baseOptions?: Apollo.QueryHookOptions<GetWatchersQuery, GetWatchersQueryVariables>) {
        return Apollo.useQuery<GetWatchersQuery, GetWatchersQueryVariables>(GetWatchersDocument, baseOptions);
      }
export function useGetWatchersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWatchersQuery, GetWatchersQueryVariables>) {
          return Apollo.useLazyQuery<GetWatchersQuery, GetWatchersQueryVariables>(GetWatchersDocument, baseOptions);
        }
export type GetWatchersQueryHookResult = ReturnType<typeof useGetWatchersQuery>;
export type GetWatchersLazyQueryHookResult = ReturnType<typeof useGetWatchersLazyQuery>;
export type GetWatchersQueryResult = Apollo.QueryResult<GetWatchersQuery, GetWatchersQueryVariables>;
export function refetchGetWatchersQuery(variables?: GetWatchersQueryVariables) {
      return { query: GetWatchersDocument, variables: variables }
    }