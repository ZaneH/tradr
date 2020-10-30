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
  deleteWatcher?: Maybe<Watcher>;
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


export type MutationDeleteWatcherArgs = {
  id: Scalars['ID'];
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
