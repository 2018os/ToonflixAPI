import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from 'graphql';
import { Context } from '../utils/context';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Url: any;
};

export enum OrderBy {
  Asc = 'asc',
  Desc = 'desc'
}

export enum WebtoonOrderByField {
  Title = 'title'
}

export enum CollectionOrderByField {
  Title = 'title',
  UpdatedAt = 'updatedAt'
}

export enum Platform {
  Naver = 'NAVER',
  Daum = 'DAUM'
}

export type Node = {
  id: Scalars['ID'];
};

export type QueryConnection = {
  edges?: Maybe<Array<Maybe<Edge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type FieldConnection = {
  edges?: Maybe<Array<Maybe<Edge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
};

export type Edge = {
  cursor: Scalars['String'];
  node?: Maybe<Node>;
};

export type Query = {
  __typename?: 'Query';
  allAuthors: AuthorConnection;
  webtoons: WebtoonConnection;
  collections: CollectionConnection;
  webtoon: Webtoon;
  randomWebtoons?: Maybe<Array<Webtoon>>;
  search: SearchResultConnection;
  allGenres?: Maybe<Array<Maybe<Genre>>>;
};

export type QueryWebtoonsArgs = {
  page?: Maybe<Pagination>;
  ordering?: Maybe<WebtoonOrdering>;
};

export type QueryCollectionsArgs = {
  page?: Maybe<Pagination>;
  ordering?: Maybe<CollectionOrdering>;
};

export type QueryWebtoonArgs = {
  id: Scalars['ID'];
};

export type QueryRandomWebtoonsArgs = {
  take?: Maybe<Scalars['Int']>;
};

export type QuerySearchArgs = {
  keyword?: Maybe<Scalars['String']>;
  where?: Maybe<SearchFiltering>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthPayload;
  signup: AuthPayload;
  createCollection: Collection;
};

export type MutationLoginArgs = {
  input?: Maybe<LoginInput>;
};

export type MutationSignupArgs = {
  input?: Maybe<SignupInput>;
};

export type MutationCreateCollectionArgs = {
  input?: Maybe<CollectionInput>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type Webtoon = Node & {
  __typename?: 'Webtoon';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  platform: Platform;
  isFinish: Scalars['Boolean'];
  isAdult: Scalars['Boolean'];
  isPay: Scalars['Boolean'];
  thumbnail: Scalars['Url'];
  url: Scalars['Url'];
  authorsConnection: WebtoonAuthorsConnection;
  collectionsConnection: WebtoonCollectionsConnection;
  genres?: Maybe<Array<Genre>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
};

export type WebtoonAuthorsConnectionArgs = {
  page?: Maybe<Pagination>;
};

export type WebtoonCollectionsConnectionArgs = {
  page?: Maybe<Pagination>;
};

export type Author = Node & {
  __typename?: 'Author';
  id: Scalars['ID'];
  name: Scalars['String'];
  webtoonsConnection: AuthorWebtoonsConnection;
};

export type AuthorWebtoonsConnectionArgs = {
  page?: Maybe<Pagination>;
};

export type Genre = {
  __typename?: 'Genre';
  code: Scalars['String'];
  name: Scalars['String'];
  webtoonsConnection: GenreWebtoonsConnection;
};

export type GenreWebtoonsConnectionArgs = {
  page?: Maybe<Pagination>;
};

export type Collection = Node & {
  __typename?: 'Collection';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  webtoonsConnection: CollectionWebtoonsConnection;
  writer: User;
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type CollectionWebtoonsConnectionArgs = {
  page?: Maybe<Pagination>;
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  comments?: Maybe<Array<Maybe<Comment>>>;
  collections?: Maybe<Array<Maybe<Collection>>>;
};

export type Comment = {
  __typename?: 'Comment';
  message: Scalars['String'];
  writer: User;
  writtenWebtoon: Webtoon;
  subComments?: Maybe<Array<Maybe<Comment>>>;
};

export type WebtoonConnection = QueryConnection & {
  __typename?: 'WebtoonConnection';
  edges?: Maybe<Array<Maybe<WebtoonEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type CollectionConnection = QueryConnection & {
  __typename?: 'CollectionConnection';
  edges?: Maybe<Array<Maybe<CollectionEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type AuthorConnection = QueryConnection & {
  __typename?: 'AuthorConnection';
  edges?: Maybe<Array<Maybe<AuthorEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type WebtoonAuthorsConnection = FieldConnection & {
  __typename?: 'WebtoonAuthorsConnection';
  edges?: Maybe<Array<Maybe<WebtoonAuthorsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
};

export type WebtoonCollectionsConnection = FieldConnection & {
  __typename?: 'WebtoonCollectionsConnection';
  edges?: Maybe<Array<Maybe<WebtoonCollectionsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
};

export type AuthorWebtoonsConnection = FieldConnection & {
  __typename?: 'AuthorWebtoonsConnection';
  edges?: Maybe<Array<Maybe<AuthorWebtoonsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
};

export type CollectionWebtoonsConnection = FieldConnection & {
  __typename?: 'CollectionWebtoonsConnection';
  edges?: Maybe<Array<Maybe<CollectionWebtoonsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
};

export type GenreWebtoonsConnection = FieldConnection & {
  __typename?: 'GenreWebtoonsConnection';
  edges?: Maybe<Array<Maybe<GenreWebtoonsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
};

export type SearchResultWebtoonConnection = FieldConnection & {
  __typename?: 'SearchResultWebtoonConnection';
  edges?: Maybe<Array<Maybe<SearchResultWebtoonEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
};

export type SearchResultCollectionConnection = FieldConnection & {
  __typename?: 'SearchResultCollectionConnection';
  edges?: Maybe<Array<Maybe<SearchResultCollectionEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
};

export type SearchResultConnection = {
  __typename?: 'SearchResultConnection';
  webtoonResult?: Maybe<SearchResultWebtoonConnection>;
  collectionResult?: Maybe<SearchResultCollectionConnection>;
};

export type SearchResultConnectionWebtoonResultArgs = {
  page?: Maybe<Pagination>;
};

export type SearchResultConnectionCollectionResultArgs = {
  page?: Maybe<Pagination>;
};

export type WebtoonEdge = Edge & {
  __typename?: 'WebtoonEdge';
  cursor: Scalars['String'];
  node?: Maybe<Webtoon>;
};

export type CollectionEdge = Edge & {
  __typename?: 'CollectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Collection>;
};

export type AuthorEdge = Edge & {
  __typename?: 'AuthorEdge';
  cursor: Scalars['String'];
  node?: Maybe<Author>;
};

export type WebtoonAuthorsEdge = Edge & {
  __typename?: 'WebtoonAuthorsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Author>;
};

export type WebtoonCollectionsEdge = Edge & {
  __typename?: 'WebtoonCollectionsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Collection>;
};

export type AuthorWebtoonsEdge = Edge & {
  __typename?: 'AuthorWebtoonsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Webtoon>;
};

export type CollectionWebtoonsEdge = Edge & {
  __typename?: 'CollectionWebtoonsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Webtoon>;
};

export type GenreWebtoonsEdge = Edge & {
  __typename?: 'GenreWebtoonsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Webtoon>;
};

export type SearchResultWebtoonEdge = Edge & {
  __typename?: 'SearchResultWebtoonEdge';
  cursor: Scalars['String'];
  node?: Maybe<Webtoon>;
};

export type SearchResultCollectionEdge = Edge & {
  __typename?: 'SearchResultCollectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Collection>;
};

export type SignupInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Pagination = {
  take?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
};

export type WebtoonOrdering = {
  orderBy?: Maybe<OrderBy>;
  field?: Maybe<WebtoonOrderByField>;
};

export type CollectionOrdering = {
  orderBy?: Maybe<OrderBy>;
  field?: Maybe<CollectionOrderByField>;
};

export type CollectionInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  webtoons: Array<Maybe<Scalars['String']>>;
};

export type SearchFiltering = {
  isPay?: Maybe<Scalars['Boolean']>;
  isAdult?: Maybe<Scalars['Boolean']>;
  isFinish?: Maybe<Scalars['Boolean']>;
  platforms?: Maybe<Array<Maybe<Platform>>>;
  genres?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Url: ResolverTypeWrapper<Scalars['Url']>;
  OrderBy: OrderBy;
  WebtoonOrderByField: WebtoonOrderByField;
  CollectionOrderByField: CollectionOrderByField;
  Platform: Platform;
  Node:
    | ResolversTypes['Webtoon']
    | ResolversTypes['Author']
    | ResolversTypes['Collection']
    | ResolversTypes['User'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  QueryConnection:
    | ResolversTypes['WebtoonConnection']
    | ResolversTypes['CollectionConnection']
    | ResolversTypes['AuthorConnection'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  FieldConnection:
    | ResolversTypes['WebtoonAuthorsConnection']
    | ResolversTypes['WebtoonCollectionsConnection']
    | ResolversTypes['AuthorWebtoonsConnection']
    | ResolversTypes['CollectionWebtoonsConnection']
    | ResolversTypes['GenreWebtoonsConnection']
    | ResolversTypes['SearchResultWebtoonConnection']
    | ResolversTypes['SearchResultCollectionConnection'];
  Edge:
    | ResolversTypes['WebtoonEdge']
    | ResolversTypes['CollectionEdge']
    | ResolversTypes['AuthorEdge']
    | ResolversTypes['WebtoonAuthorsEdge']
    | ResolversTypes['WebtoonCollectionsEdge']
    | ResolversTypes['AuthorWebtoonsEdge']
    | ResolversTypes['CollectionWebtoonsEdge']
    | ResolversTypes['GenreWebtoonsEdge']
    | ResolversTypes['SearchResultWebtoonEdge']
    | ResolversTypes['SearchResultCollectionEdge'];
  String: ResolverTypeWrapper<Scalars['String']>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Webtoon: ResolverTypeWrapper<Webtoon>;
  Author: ResolverTypeWrapper<Author>;
  Genre: ResolverTypeWrapper<Genre>;
  Collection: ResolverTypeWrapper<Collection>;
  User: ResolverTypeWrapper<User>;
  Comment: ResolverTypeWrapper<Comment>;
  WebtoonConnection: ResolverTypeWrapper<WebtoonConnection>;
  CollectionConnection: ResolverTypeWrapper<CollectionConnection>;
  AuthorConnection: ResolverTypeWrapper<AuthorConnection>;
  WebtoonAuthorsConnection: ResolverTypeWrapper<WebtoonAuthorsConnection>;
  WebtoonCollectionsConnection: ResolverTypeWrapper<
    WebtoonCollectionsConnection
  >;
  AuthorWebtoonsConnection: ResolverTypeWrapper<AuthorWebtoonsConnection>;
  CollectionWebtoonsConnection: ResolverTypeWrapper<
    CollectionWebtoonsConnection
  >;
  GenreWebtoonsConnection: ResolverTypeWrapper<GenreWebtoonsConnection>;
  SearchResultWebtoonConnection: ResolverTypeWrapper<
    SearchResultWebtoonConnection
  >;
  SearchResultCollectionConnection: ResolverTypeWrapper<
    SearchResultCollectionConnection
  >;
  SearchResultConnection: ResolverTypeWrapper<SearchResultConnection>;
  WebtoonEdge: ResolverTypeWrapper<WebtoonEdge>;
  CollectionEdge: ResolverTypeWrapper<CollectionEdge>;
  AuthorEdge: ResolverTypeWrapper<AuthorEdge>;
  WebtoonAuthorsEdge: ResolverTypeWrapper<WebtoonAuthorsEdge>;
  WebtoonCollectionsEdge: ResolverTypeWrapper<WebtoonCollectionsEdge>;
  AuthorWebtoonsEdge: ResolverTypeWrapper<AuthorWebtoonsEdge>;
  CollectionWebtoonsEdge: ResolverTypeWrapper<CollectionWebtoonsEdge>;
  GenreWebtoonsEdge: ResolverTypeWrapper<GenreWebtoonsEdge>;
  SearchResultWebtoonEdge: ResolverTypeWrapper<SearchResultWebtoonEdge>;
  SearchResultCollectionEdge: ResolverTypeWrapper<SearchResultCollectionEdge>;
  SignupInput: SignupInput;
  LoginInput: LoginInput;
  Pagination: Pagination;
  WebtoonOrdering: WebtoonOrdering;
  CollectionOrdering: CollectionOrdering;
  CollectionInput: CollectionInput;
  SearchFiltering: SearchFiltering;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars['Date'];
  Url: Scalars['Url'];
  Node:
    | ResolversParentTypes['Webtoon']
    | ResolversParentTypes['Author']
    | ResolversParentTypes['Collection']
    | ResolversParentTypes['User'];
  ID: Scalars['ID'];
  QueryConnection:
    | ResolversParentTypes['WebtoonConnection']
    | ResolversParentTypes['CollectionConnection']
    | ResolversParentTypes['AuthorConnection'];
  Int: Scalars['Int'];
  FieldConnection:
    | ResolversParentTypes['WebtoonAuthorsConnection']
    | ResolversParentTypes['WebtoonCollectionsConnection']
    | ResolversParentTypes['AuthorWebtoonsConnection']
    | ResolversParentTypes['CollectionWebtoonsConnection']
    | ResolversParentTypes['GenreWebtoonsConnection']
    | ResolversParentTypes['SearchResultWebtoonConnection']
    | ResolversParentTypes['SearchResultCollectionConnection'];
  Edge:
    | ResolversParentTypes['WebtoonEdge']
    | ResolversParentTypes['CollectionEdge']
    | ResolversParentTypes['AuthorEdge']
    | ResolversParentTypes['WebtoonAuthorsEdge']
    | ResolversParentTypes['WebtoonCollectionsEdge']
    | ResolversParentTypes['AuthorWebtoonsEdge']
    | ResolversParentTypes['CollectionWebtoonsEdge']
    | ResolversParentTypes['GenreWebtoonsEdge']
    | ResolversParentTypes['SearchResultWebtoonEdge']
    | ResolversParentTypes['SearchResultCollectionEdge'];
  String: Scalars['String'];
  Query: {};
  Mutation: {};
  AuthPayload: AuthPayload;
  PageInfo: PageInfo;
  Boolean: Scalars['Boolean'];
  Webtoon: Webtoon;
  Author: Author;
  Genre: Genre;
  Collection: Collection;
  User: User;
  Comment: Comment;
  WebtoonConnection: WebtoonConnection;
  CollectionConnection: CollectionConnection;
  AuthorConnection: AuthorConnection;
  WebtoonAuthorsConnection: WebtoonAuthorsConnection;
  WebtoonCollectionsConnection: WebtoonCollectionsConnection;
  AuthorWebtoonsConnection: AuthorWebtoonsConnection;
  CollectionWebtoonsConnection: CollectionWebtoonsConnection;
  GenreWebtoonsConnection: GenreWebtoonsConnection;
  SearchResultWebtoonConnection: SearchResultWebtoonConnection;
  SearchResultCollectionConnection: SearchResultCollectionConnection;
  SearchResultConnection: SearchResultConnection;
  WebtoonEdge: WebtoonEdge;
  CollectionEdge: CollectionEdge;
  AuthorEdge: AuthorEdge;
  WebtoonAuthorsEdge: WebtoonAuthorsEdge;
  WebtoonCollectionsEdge: WebtoonCollectionsEdge;
  AuthorWebtoonsEdge: AuthorWebtoonsEdge;
  CollectionWebtoonsEdge: CollectionWebtoonsEdge;
  GenreWebtoonsEdge: GenreWebtoonsEdge;
  SearchResultWebtoonEdge: SearchResultWebtoonEdge;
  SearchResultCollectionEdge: SearchResultCollectionEdge;
  SignupInput: SignupInput;
  LoginInput: LoginInput;
  Pagination: Pagination;
  WebtoonOrdering: WebtoonOrdering;
  CollectionOrdering: CollectionOrdering;
  CollectionInput: CollectionInput;
  SearchFiltering: SearchFiltering;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface UrlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Url'], any> {
  name: 'Url';
}

export type NodeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']
> = {
  __resolveType: TypeResolveFn<
    'Webtoon' | 'Author' | 'Collection' | 'User',
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type QueryConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['QueryConnection'] = ResolversParentTypes['QueryConnection']
> = {
  __resolveType: TypeResolveFn<
    'WebtoonConnection' | 'CollectionConnection' | 'AuthorConnection',
    ParentType,
    ContextType
  >;
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Edge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type FieldConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['FieldConnection'] = ResolversParentTypes['FieldConnection']
> = {
  __resolveType: TypeResolveFn<
    | 'WebtoonAuthorsConnection'
    | 'WebtoonCollectionsConnection'
    | 'AuthorWebtoonsConnection'
    | 'CollectionWebtoonsConnection'
    | 'GenreWebtoonsConnection'
    | 'SearchResultWebtoonConnection'
    | 'SearchResultCollectionConnection',
    ParentType,
    ContextType
  >;
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Edge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type EdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']
> = {
  __resolveType: TypeResolveFn<
    | 'WebtoonEdge'
    | 'CollectionEdge'
    | 'AuthorEdge'
    | 'WebtoonAuthorsEdge'
    | 'WebtoonCollectionsEdge'
    | 'AuthorWebtoonsEdge'
    | 'CollectionWebtoonsEdge'
    | 'GenreWebtoonsEdge'
    | 'SearchResultWebtoonEdge'
    | 'SearchResultCollectionEdge',
    ParentType,
    ContextType
  >;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  allAuthors?: Resolver<
    ResolversTypes['AuthorConnection'],
    ParentType,
    ContextType
  >;
  webtoons?: Resolver<
    ResolversTypes['WebtoonConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryWebtoonsArgs, never>
  >;
  collections?: Resolver<
    ResolversTypes['CollectionConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryCollectionsArgs, never>
  >;
  webtoon?: Resolver<
    ResolversTypes['Webtoon'],
    ParentType,
    ContextType,
    RequireFields<QueryWebtoonArgs, 'id'>
  >;
  randomWebtoons?: Resolver<
    Maybe<Array<ResolversTypes['Webtoon']>>,
    ParentType,
    ContextType,
    RequireFields<QueryRandomWebtoonsArgs, 'take'>
  >;
  search?: Resolver<
    ResolversTypes['SearchResultConnection'],
    ParentType,
    ContextType,
    RequireFields<QuerySearchArgs, never>
  >;
  allGenres?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Genre']>>>,
    ParentType,
    ContextType
  >;
};

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  login?: Resolver<
    ResolversTypes['AuthPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, never>
  >;
  signup?: Resolver<
    ResolversTypes['AuthPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationSignupArgs, never>
  >;
  createCollection?: Resolver<
    ResolversTypes['Collection'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCollectionArgs, never>
  >;
};

export type AuthPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']
> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PageInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
  startCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  endCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WebtoonResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Webtoon'] = ResolversParentTypes['Webtoon']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  platform?: Resolver<ResolversTypes['Platform'], ParentType, ContextType>;
  isFinish?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isAdult?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPay?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['Url'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['Url'], ParentType, ContextType>;
  authorsConnection?: Resolver<
    ResolversTypes['WebtoonAuthorsConnection'],
    ParentType,
    ContextType,
    RequireFields<WebtoonAuthorsConnectionArgs, never>
  >;
  collectionsConnection?: Resolver<
    ResolversTypes['WebtoonCollectionsConnection'],
    ParentType,
    ContextType,
    RequireFields<WebtoonCollectionsConnectionArgs, never>
  >;
  genres?: Resolver<
    Maybe<Array<ResolversTypes['Genre']>>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Comment']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AuthorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webtoonsConnection?: Resolver<
    ResolversTypes['AuthorWebtoonsConnection'],
    ParentType,
    ContextType,
    RequireFields<AuthorWebtoonsConnectionArgs, never>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type GenreResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webtoonsConnection?: Resolver<
    ResolversTypes['GenreWebtoonsConnection'],
    ParentType,
    ContextType,
    RequireFields<GenreWebtoonsConnectionArgs, never>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CollectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webtoonsConnection?: Resolver<
    ResolversTypes['CollectionWebtoonsConnection'],
    ParentType,
    ContextType,
    RequireFields<CollectionWebtoonsConnectionArgs, never>
  >;
  writer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comments?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Comment']>>>,
    ParentType,
    ContextType
  >;
  collections?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Collection']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CommentResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  writer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  writtenWebtoon?: Resolver<ResolversTypes['Webtoon'], ParentType, ContextType>;
  subComments?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Comment']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WebtoonConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonConnection'] = ResolversParentTypes['WebtoonConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['WebtoonEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CollectionConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CollectionConnection'] = ResolversParentTypes['CollectionConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['CollectionEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AuthorConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthorConnection'] = ResolversParentTypes['AuthorConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['AuthorEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WebtoonAuthorsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonAuthorsConnection'] = ResolversParentTypes['WebtoonAuthorsConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['WebtoonAuthorsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WebtoonCollectionsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonCollectionsConnection'] = ResolversParentTypes['WebtoonCollectionsConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['WebtoonCollectionsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AuthorWebtoonsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthorWebtoonsConnection'] = ResolversParentTypes['AuthorWebtoonsConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['AuthorWebtoonsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CollectionWebtoonsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CollectionWebtoonsConnection'] = ResolversParentTypes['CollectionWebtoonsConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['CollectionWebtoonsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type GenreWebtoonsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['GenreWebtoonsConnection'] = ResolversParentTypes['GenreWebtoonsConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GenreWebtoonsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SearchResultWebtoonConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SearchResultWebtoonConnection'] = ResolversParentTypes['SearchResultWebtoonConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['SearchResultWebtoonEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SearchResultCollectionConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SearchResultCollectionConnection'] = ResolversParentTypes['SearchResultCollectionConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['SearchResultCollectionEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SearchResultConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SearchResultConnection'] = ResolversParentTypes['SearchResultConnection']
> = {
  webtoonResult?: Resolver<
    Maybe<ResolversTypes['SearchResultWebtoonConnection']>,
    ParentType,
    ContextType,
    RequireFields<SearchResultConnectionWebtoonResultArgs, never>
  >;
  collectionResult?: Resolver<
    Maybe<ResolversTypes['SearchResultCollectionConnection']>,
    ParentType,
    ContextType,
    RequireFields<SearchResultConnectionCollectionResultArgs, never>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WebtoonEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonEdge'] = ResolversParentTypes['WebtoonEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Webtoon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CollectionEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CollectionEdge'] = ResolversParentTypes['CollectionEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AuthorEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthorEdge'] = ResolversParentTypes['AuthorEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WebtoonAuthorsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonAuthorsEdge'] = ResolversParentTypes['WebtoonAuthorsEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WebtoonCollectionsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonCollectionsEdge'] = ResolversParentTypes['WebtoonCollectionsEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AuthorWebtoonsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthorWebtoonsEdge'] = ResolversParentTypes['AuthorWebtoonsEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Webtoon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CollectionWebtoonsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CollectionWebtoonsEdge'] = ResolversParentTypes['CollectionWebtoonsEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Webtoon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type GenreWebtoonsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['GenreWebtoonsEdge'] = ResolversParentTypes['GenreWebtoonsEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Webtoon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SearchResultWebtoonEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SearchResultWebtoonEdge'] = ResolversParentTypes['SearchResultWebtoonEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Webtoon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SearchResultCollectionEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SearchResultCollectionEdge'] = ResolversParentTypes['SearchResultCollectionEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = Context> = {
  Date?: GraphQLScalarType;
  Url?: GraphQLScalarType;
  Node?: NodeResolvers<ContextType>;
  QueryConnection?: QueryConnectionResolvers<ContextType>;
  FieldConnection?: FieldConnectionResolvers<ContextType>;
  Edge?: EdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Webtoon?: WebtoonResolvers<ContextType>;
  Author?: AuthorResolvers<ContextType>;
  Genre?: GenreResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  WebtoonConnection?: WebtoonConnectionResolvers<ContextType>;
  CollectionConnection?: CollectionConnectionResolvers<ContextType>;
  AuthorConnection?: AuthorConnectionResolvers<ContextType>;
  WebtoonAuthorsConnection?: WebtoonAuthorsConnectionResolvers<ContextType>;
  WebtoonCollectionsConnection?: WebtoonCollectionsConnectionResolvers<
    ContextType
  >;
  AuthorWebtoonsConnection?: AuthorWebtoonsConnectionResolvers<ContextType>;
  CollectionWebtoonsConnection?: CollectionWebtoonsConnectionResolvers<
    ContextType
  >;
  GenreWebtoonsConnection?: GenreWebtoonsConnectionResolvers<ContextType>;
  SearchResultWebtoonConnection?: SearchResultWebtoonConnectionResolvers<
    ContextType
  >;
  SearchResultCollectionConnection?: SearchResultCollectionConnectionResolvers<
    ContextType
  >;
  SearchResultConnection?: SearchResultConnectionResolvers<ContextType>;
  WebtoonEdge?: WebtoonEdgeResolvers<ContextType>;
  CollectionEdge?: CollectionEdgeResolvers<ContextType>;
  AuthorEdge?: AuthorEdgeResolvers<ContextType>;
  WebtoonAuthorsEdge?: WebtoonAuthorsEdgeResolvers<ContextType>;
  WebtoonCollectionsEdge?: WebtoonCollectionsEdgeResolvers<ContextType>;
  AuthorWebtoonsEdge?: AuthorWebtoonsEdgeResolvers<ContextType>;
  CollectionWebtoonsEdge?: CollectionWebtoonsEdgeResolvers<ContextType>;
  GenreWebtoonsEdge?: GenreWebtoonsEdgeResolvers<ContextType>;
  SearchResultWebtoonEdge?: SearchResultWebtoonEdgeResolvers<ContextType>;
  SearchResultCollectionEdge?: SearchResultCollectionEdgeResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
