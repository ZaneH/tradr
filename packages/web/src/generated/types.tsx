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

export type Query = {
  __typename?: 'Query';
  getAddress?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
};

export type GetAddressQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAddressQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getAddress'>
);


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