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

export enum CollectionType {
  Private = 'Private',
  Public = 'Public'
}

export type Node = {
  id: Scalars['ID'];
};

export type Connection = {
  edges?: Maybe<Array<Maybe<Edge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type Edge = {
  cursor: Scalars['String'];
  node?: Maybe<Node>;
};

export type Query = {
  __typename?: 'Query';
  authors: AuthorConnection;
  webtoons: WebtoonConnection;
  collections: CollectionConnection;
  genres?: Maybe<Array<Maybe<Genre>>>;
  users: UserConnection;
  user: User;
  me: User;
  webtoon: Webtoon;
  randomWebtoons?: Maybe<Array<Webtoon>>;
  search: SearchResult;
  collection: Collection;
};

export type QueryAuthorsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type QueryWebtoonsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type QueryCollectionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
  keyword?: Maybe<Scalars['String']>;
};

export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
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
  webtoonPaging?: Maybe<Paging>;
  collectionPaging?: Maybe<Paging>;
};

export type QueryCollectionArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthPayload;
  signup: AuthPayload;
  createCollection: Collection;
  updateCollection: Collection;
  likeCollection: User;
  dislikeCollection: User;
  postComment: Comment;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationSignupArgs = {
  input: SignupInput;
};

export type MutationCreateCollectionArgs = {
  input: CreateCollectionInput;
};

export type MutationUpdateCollectionArgs = {
  input: UpdateCollectionInput;
};

export type MutationLikeCollectionArgs = {
  collectionId: Scalars['ID'];
};

export type MutationDislikeCollectionArgs = {
  collectionId: Scalars['ID'];
};

export type MutationPostCommentArgs = {
  input: CommentInput;
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
  commentsConnection: WebtoonCommentsConnection;
};

export type WebtoonAuthorsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type WebtoonCollectionsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type WebtoonCommentsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type Author = Node & {
  __typename?: 'Author';
  id: Scalars['ID'];
  name: Scalars['String'];
  webtoonsConnection: AuthorWebtoonsConnection;
};

export type AuthorWebtoonsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type Genre = {
  __typename?: 'Genre';
  code: Scalars['String'];
  name: Scalars['String'];
  webtoonsConnection: GenreWebtoonsConnection;
};

export type GenreWebtoonsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type Collection = Node & {
  __typename?: 'Collection';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  type: CollectionType;
  webtoonsConnection: CollectionWebtoonsConnection;
  commentsConnection: CollectionCommentsConnection;
  writer: User;
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type CollectionWebtoonsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type CollectionCommentsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  level: Scalars['Int'];
  exp: Scalars['Int'];
  likedCollections: UserCollectionsConnection;
  myCollections: UserCollectionsConnection;
  commentsConnection: UserCommentsConnection;
};

export type UserLikedCollectionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type UserMyCollectionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type UserCommentsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type Comment = Node & {
  __typename?: 'Comment';
  id: Scalars['ID'];
  message: Scalars['String'];
  writer: User;
  createdAt: Scalars['Date'];
  commentsConnection: CommentCommentsConnection;
};

export type CommentCommentsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type UserConnection = Connection & {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type WebtoonConnection = Connection & {
  __typename?: 'WebtoonConnection';
  edges?: Maybe<Array<Maybe<WebtoonEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type CollectionConnection = Connection & {
  __typename?: 'CollectionConnection';
  edges?: Maybe<Array<Maybe<CollectionEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type AuthorConnection = Connection & {
  __typename?: 'AuthorConnection';
  edges?: Maybe<Array<Maybe<AuthorEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type WebtoonAuthorsConnection = Connection & {
  __typename?: 'WebtoonAuthorsConnection';
  edges?: Maybe<Array<Maybe<WebtoonAuthorsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type WebtoonCollectionsConnection = Connection & {
  __typename?: 'WebtoonCollectionsConnection';
  edges?: Maybe<Array<Maybe<WebtoonCollectionsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type WebtoonCommentsConnection = Connection & {
  __typename?: 'WebtoonCommentsConnection';
  edges?: Maybe<Array<Maybe<WebtoonCommentsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type AuthorWebtoonsConnection = Connection & {
  __typename?: 'AuthorWebtoonsConnection';
  edges?: Maybe<Array<Maybe<AuthorWebtoonsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type CollectionWebtoonsConnection = Connection & {
  __typename?: 'CollectionWebtoonsConnection';
  edges?: Maybe<Array<Maybe<CollectionWebtoonsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type CollectionCommentsConnection = Connection & {
  __typename?: 'CollectionCommentsConnection';
  edges?: Maybe<Array<Maybe<CollectionCommentsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type GenreWebtoonsConnection = Connection & {
  __typename?: 'GenreWebtoonsConnection';
  edges?: Maybe<Array<Maybe<GenreWebtoonsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type SearchResultWebtoonsConnection = Connection & {
  __typename?: 'SearchResultWebtoonsConnection';
  edges?: Maybe<Array<Maybe<SearchResultWebtoonsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type SearchResultCollectionsConnection = Connection & {
  __typename?: 'SearchResultCollectionsConnection';
  edges?: Maybe<Array<Maybe<SearchResultCollectionsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type UserCollectionsConnection = Connection & {
  __typename?: 'UserCollectionsConnection';
  edges?: Maybe<Array<Maybe<UserCollectionsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type UserCommentsConnection = Connection & {
  __typename?: 'UserCommentsConnection';
  edges?: Maybe<Array<Maybe<UserCommentsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type CommentCommentsConnection = Connection & {
  __typename?: 'CommentCommentsConnection';
  edges?: Maybe<Array<Maybe<CommentCommentsEdge>>>;
  pageInfo: PageInfo;
  totalCounts: Scalars['Int'];
  counts: Scalars['Int'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  webtoonResult?: Maybe<SearchResultWebtoonsConnection>;
  collectionResult?: Maybe<SearchResultCollectionsConnection>;
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

export type WebtoonCommentsEdge = Edge & {
  __typename?: 'WebtoonCommentsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Comment>;
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

export type CollectionCommentsEdge = Edge & {
  __typename?: 'CollectionCommentsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Comment>;
};

export type GenreWebtoonsEdge = Edge & {
  __typename?: 'GenreWebtoonsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Webtoon>;
};

export type SearchResultWebtoonsEdge = Edge & {
  __typename?: 'SearchResultWebtoonsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Webtoon>;
};

export type SearchResultCollectionsEdge = Edge & {
  __typename?: 'SearchResultCollectionsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Collection>;
};

export type UserEdge = Edge & {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type UserCollectionsEdge = Edge & {
  __typename?: 'UserCollectionsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Collection>;
};

export type UserCommentsEdge = Edge & {
  __typename?: 'UserCommentsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Comment>;
};

export type CommentCommentsEdge = Edge & {
  __typename?: 'CommentCommentsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Comment>;
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

export type CreateCollectionInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  webtoonIds: Array<Scalars['ID']>;
};

export type UpdateCollectionInput = {
  collectionId: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  webtoonIds?: Maybe<Array<Scalars['ID']>>;
};

export type CommentInput = {
  message: Scalars['String'];
  webtoonId?: Maybe<Scalars['ID']>;
  collectionId?: Maybe<Scalars['ID']>;
  commentId?: Maybe<Scalars['ID']>;
};

export type SearchFiltering = {
  isPay?: Maybe<Scalars['Boolean']>;
  isAdult?: Maybe<Scalars['Boolean']>;
  isFinish?: Maybe<Scalars['Boolean']>;
  platforms?: Maybe<Array<Platform>>;
  genres?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Paging = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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
export type ResolversTypes = ResolversObject<{
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Url: ResolverTypeWrapper<Scalars['Url']>;
  OrderBy: OrderBy;
  WebtoonOrderByField: WebtoonOrderByField;
  CollectionOrderByField: CollectionOrderByField;
  Platform: Platform;
  CollectionType: CollectionType;
  Node:
    | ResolversTypes['Webtoon']
    | ResolversTypes['Author']
    | ResolversTypes['Collection']
    | ResolversTypes['User']
    | ResolversTypes['Comment'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Connection:
    | ResolversTypes['UserConnection']
    | ResolversTypes['WebtoonConnection']
    | ResolversTypes['CollectionConnection']
    | ResolversTypes['AuthorConnection']
    | ResolversTypes['WebtoonAuthorsConnection']
    | ResolversTypes['WebtoonCollectionsConnection']
    | ResolversTypes['WebtoonCommentsConnection']
    | ResolversTypes['AuthorWebtoonsConnection']
    | ResolversTypes['CollectionWebtoonsConnection']
    | ResolversTypes['CollectionCommentsConnection']
    | ResolversTypes['GenreWebtoonsConnection']
    | ResolversTypes['SearchResultWebtoonsConnection']
    | ResolversTypes['SearchResultCollectionsConnection']
    | ResolversTypes['UserCollectionsConnection']
    | ResolversTypes['UserCommentsConnection']
    | ResolversTypes['CommentCommentsConnection'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Edge:
    | ResolversTypes['WebtoonEdge']
    | ResolversTypes['CollectionEdge']
    | ResolversTypes['AuthorEdge']
    | ResolversTypes['WebtoonAuthorsEdge']
    | ResolversTypes['WebtoonCollectionsEdge']
    | ResolversTypes['WebtoonCommentsEdge']
    | ResolversTypes['AuthorWebtoonsEdge']
    | ResolversTypes['CollectionWebtoonsEdge']
    | ResolversTypes['CollectionCommentsEdge']
    | ResolversTypes['GenreWebtoonsEdge']
    | ResolversTypes['SearchResultWebtoonsEdge']
    | ResolversTypes['SearchResultCollectionsEdge']
    | ResolversTypes['UserEdge']
    | ResolversTypes['UserCollectionsEdge']
    | ResolversTypes['UserCommentsEdge']
    | ResolversTypes['CommentCommentsEdge'];
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
  UserConnection: ResolverTypeWrapper<UserConnection>;
  WebtoonConnection: ResolverTypeWrapper<WebtoonConnection>;
  CollectionConnection: ResolverTypeWrapper<CollectionConnection>;
  AuthorConnection: ResolverTypeWrapper<AuthorConnection>;
  WebtoonAuthorsConnection: ResolverTypeWrapper<WebtoonAuthorsConnection>;
  WebtoonCollectionsConnection: ResolverTypeWrapper<
    WebtoonCollectionsConnection
  >;
  WebtoonCommentsConnection: ResolverTypeWrapper<WebtoonCommentsConnection>;
  AuthorWebtoonsConnection: ResolverTypeWrapper<AuthorWebtoonsConnection>;
  CollectionWebtoonsConnection: ResolverTypeWrapper<
    CollectionWebtoonsConnection
  >;
  CollectionCommentsConnection: ResolverTypeWrapper<
    CollectionCommentsConnection
  >;
  GenreWebtoonsConnection: ResolverTypeWrapper<GenreWebtoonsConnection>;
  SearchResultWebtoonsConnection: ResolverTypeWrapper<
    SearchResultWebtoonsConnection
  >;
  SearchResultCollectionsConnection: ResolverTypeWrapper<
    SearchResultCollectionsConnection
  >;
  UserCollectionsConnection: ResolverTypeWrapper<UserCollectionsConnection>;
  UserCommentsConnection: ResolverTypeWrapper<UserCommentsConnection>;
  CommentCommentsConnection: ResolverTypeWrapper<CommentCommentsConnection>;
  SearchResult: ResolverTypeWrapper<SearchResult>;
  WebtoonEdge: ResolverTypeWrapper<WebtoonEdge>;
  CollectionEdge: ResolverTypeWrapper<CollectionEdge>;
  AuthorEdge: ResolverTypeWrapper<AuthorEdge>;
  WebtoonAuthorsEdge: ResolverTypeWrapper<WebtoonAuthorsEdge>;
  WebtoonCollectionsEdge: ResolverTypeWrapper<WebtoonCollectionsEdge>;
  WebtoonCommentsEdge: ResolverTypeWrapper<WebtoonCommentsEdge>;
  AuthorWebtoonsEdge: ResolverTypeWrapper<AuthorWebtoonsEdge>;
  CollectionWebtoonsEdge: ResolverTypeWrapper<CollectionWebtoonsEdge>;
  CollectionCommentsEdge: ResolverTypeWrapper<CollectionCommentsEdge>;
  GenreWebtoonsEdge: ResolverTypeWrapper<GenreWebtoonsEdge>;
  SearchResultWebtoonsEdge: ResolverTypeWrapper<SearchResultWebtoonsEdge>;
  SearchResultCollectionsEdge: ResolverTypeWrapper<SearchResultCollectionsEdge>;
  UserEdge: ResolverTypeWrapper<UserEdge>;
  UserCollectionsEdge: ResolverTypeWrapper<UserCollectionsEdge>;
  UserCommentsEdge: ResolverTypeWrapper<UserCommentsEdge>;
  CommentCommentsEdge: ResolverTypeWrapper<CommentCommentsEdge>;
  SignupInput: SignupInput;
  LoginInput: LoginInput;
  CreateCollectionInput: CreateCollectionInput;
  UpdateCollectionInput: UpdateCollectionInput;
  CommentInput: CommentInput;
  SearchFiltering: SearchFiltering;
  Paging: Paging;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Date: Scalars['Date'];
  Url: Scalars['Url'];
  Node:
    | ResolversParentTypes['Webtoon']
    | ResolversParentTypes['Author']
    | ResolversParentTypes['Collection']
    | ResolversParentTypes['User']
    | ResolversParentTypes['Comment'];
  ID: Scalars['ID'];
  Connection:
    | ResolversParentTypes['UserConnection']
    | ResolversParentTypes['WebtoonConnection']
    | ResolversParentTypes['CollectionConnection']
    | ResolversParentTypes['AuthorConnection']
    | ResolversParentTypes['WebtoonAuthorsConnection']
    | ResolversParentTypes['WebtoonCollectionsConnection']
    | ResolversParentTypes['WebtoonCommentsConnection']
    | ResolversParentTypes['AuthorWebtoonsConnection']
    | ResolversParentTypes['CollectionWebtoonsConnection']
    | ResolversParentTypes['CollectionCommentsConnection']
    | ResolversParentTypes['GenreWebtoonsConnection']
    | ResolversParentTypes['SearchResultWebtoonsConnection']
    | ResolversParentTypes['SearchResultCollectionsConnection']
    | ResolversParentTypes['UserCollectionsConnection']
    | ResolversParentTypes['UserCommentsConnection']
    | ResolversParentTypes['CommentCommentsConnection'];
  Int: Scalars['Int'];
  Edge:
    | ResolversParentTypes['WebtoonEdge']
    | ResolversParentTypes['CollectionEdge']
    | ResolversParentTypes['AuthorEdge']
    | ResolversParentTypes['WebtoonAuthorsEdge']
    | ResolversParentTypes['WebtoonCollectionsEdge']
    | ResolversParentTypes['WebtoonCommentsEdge']
    | ResolversParentTypes['AuthorWebtoonsEdge']
    | ResolversParentTypes['CollectionWebtoonsEdge']
    | ResolversParentTypes['CollectionCommentsEdge']
    | ResolversParentTypes['GenreWebtoonsEdge']
    | ResolversParentTypes['SearchResultWebtoonsEdge']
    | ResolversParentTypes['SearchResultCollectionsEdge']
    | ResolversParentTypes['UserEdge']
    | ResolversParentTypes['UserCollectionsEdge']
    | ResolversParentTypes['UserCommentsEdge']
    | ResolversParentTypes['CommentCommentsEdge'];
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
  UserConnection: UserConnection;
  WebtoonConnection: WebtoonConnection;
  CollectionConnection: CollectionConnection;
  AuthorConnection: AuthorConnection;
  WebtoonAuthorsConnection: WebtoonAuthorsConnection;
  WebtoonCollectionsConnection: WebtoonCollectionsConnection;
  WebtoonCommentsConnection: WebtoonCommentsConnection;
  AuthorWebtoonsConnection: AuthorWebtoonsConnection;
  CollectionWebtoonsConnection: CollectionWebtoonsConnection;
  CollectionCommentsConnection: CollectionCommentsConnection;
  GenreWebtoonsConnection: GenreWebtoonsConnection;
  SearchResultWebtoonsConnection: SearchResultWebtoonsConnection;
  SearchResultCollectionsConnection: SearchResultCollectionsConnection;
  UserCollectionsConnection: UserCollectionsConnection;
  UserCommentsConnection: UserCommentsConnection;
  CommentCommentsConnection: CommentCommentsConnection;
  SearchResult: SearchResult;
  WebtoonEdge: WebtoonEdge;
  CollectionEdge: CollectionEdge;
  AuthorEdge: AuthorEdge;
  WebtoonAuthorsEdge: WebtoonAuthorsEdge;
  WebtoonCollectionsEdge: WebtoonCollectionsEdge;
  WebtoonCommentsEdge: WebtoonCommentsEdge;
  AuthorWebtoonsEdge: AuthorWebtoonsEdge;
  CollectionWebtoonsEdge: CollectionWebtoonsEdge;
  CollectionCommentsEdge: CollectionCommentsEdge;
  GenreWebtoonsEdge: GenreWebtoonsEdge;
  SearchResultWebtoonsEdge: SearchResultWebtoonsEdge;
  SearchResultCollectionsEdge: SearchResultCollectionsEdge;
  UserEdge: UserEdge;
  UserCollectionsEdge: UserCollectionsEdge;
  UserCommentsEdge: UserCommentsEdge;
  CommentCommentsEdge: CommentCommentsEdge;
  SignupInput: SignupInput;
  LoginInput: LoginInput;
  CreateCollectionInput: CreateCollectionInput;
  UpdateCollectionInput: UpdateCollectionInput;
  CommentInput: CommentInput;
  SearchFiltering: SearchFiltering;
  Paging: Paging;
}>;

export type ExpDirectiveArgs = { point?: Maybe<Scalars['Int']> };

export type ExpDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = ExpDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

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
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'Webtoon' | 'Author' | 'Collection' | 'User' | 'Comment',
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type ConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    | 'UserConnection'
    | 'WebtoonConnection'
    | 'CollectionConnection'
    | 'AuthorConnection'
    | 'WebtoonAuthorsConnection'
    | 'WebtoonCollectionsConnection'
    | 'WebtoonCommentsConnection'
    | 'AuthorWebtoonsConnection'
    | 'CollectionWebtoonsConnection'
    | 'CollectionCommentsConnection'
    | 'GenreWebtoonsConnection'
    | 'SearchResultWebtoonsConnection'
    | 'SearchResultCollectionsConnection'
    | 'UserCollectionsConnection'
    | 'UserCommentsConnection'
    | 'CommentCommentsConnection',
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
}>;

export type EdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    | 'WebtoonEdge'
    | 'CollectionEdge'
    | 'AuthorEdge'
    | 'WebtoonAuthorsEdge'
    | 'WebtoonCollectionsEdge'
    | 'WebtoonCommentsEdge'
    | 'AuthorWebtoonsEdge'
    | 'CollectionWebtoonsEdge'
    | 'CollectionCommentsEdge'
    | 'GenreWebtoonsEdge'
    | 'SearchResultWebtoonsEdge'
    | 'SearchResultCollectionsEdge'
    | 'UserEdge'
    | 'UserCollectionsEdge'
    | 'UserCommentsEdge'
    | 'CommentCommentsEdge',
    ParentType,
    ContextType
  >;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  authors?: Resolver<
    ResolversTypes['AuthorConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryAuthorsArgs, never>
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
  genres?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Genre']>>>,
    ParentType,
    ContextType
  >;
  users?: Resolver<
    ResolversTypes['UserConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryUsersArgs, never>
  >;
  user?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'id'>
  >;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
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
    ResolversTypes['SearchResult'],
    ParentType,
    ContextType,
    RequireFields<QuerySearchArgs, never>
  >;
  collection?: Resolver<
    ResolversTypes['Collection'],
    ParentType,
    ContextType,
    RequireFields<QueryCollectionArgs, 'id'>
  >;
}>;

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  login?: Resolver<
    ResolversTypes['AuthPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'input'>
  >;
  signup?: Resolver<
    ResolversTypes['AuthPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationSignupArgs, 'input'>
  >;
  createCollection?: Resolver<
    ResolversTypes['Collection'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCollectionArgs, 'input'>
  >;
  updateCollection?: Resolver<
    ResolversTypes['Collection'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCollectionArgs, 'input'>
  >;
  likeCollection?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationLikeCollectionArgs, 'collectionId'>
  >;
  dislikeCollection?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationDislikeCollectionArgs, 'collectionId'>
  >;
  postComment?: Resolver<
    ResolversTypes['Comment'],
    ParentType,
    ContextType,
    RequireFields<MutationPostCommentArgs, 'input'>
  >;
}>;

export type AuthPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']
> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type PageInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = ResolversObject<{
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
}>;

export type WebtoonResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Webtoon'] = ResolversParentTypes['Webtoon']
> = ResolversObject<{
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
  commentsConnection?: Resolver<
    ResolversTypes['WebtoonCommentsConnection'],
    ParentType,
    ContextType,
    RequireFields<WebtoonCommentsConnectionArgs, never>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AuthorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webtoonsConnection?: Resolver<
    ResolversTypes['AuthorWebtoonsConnection'],
    ParentType,
    ContextType,
    RequireFields<AuthorWebtoonsConnectionArgs, never>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type GenreResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']
> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webtoonsConnection?: Resolver<
    ResolversTypes['GenreWebtoonsConnection'],
    ParentType,
    ContextType,
    RequireFields<GenreWebtoonsConnectionArgs, never>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CollectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['CollectionType'], ParentType, ContextType>;
  webtoonsConnection?: Resolver<
    ResolversTypes['CollectionWebtoonsConnection'],
    ParentType,
    ContextType,
    RequireFields<CollectionWebtoonsConnectionArgs, never>
  >;
  commentsConnection?: Resolver<
    ResolversTypes['CollectionCommentsConnection'],
    ParentType,
    ContextType,
    RequireFields<CollectionCommentsConnectionArgs, never>
  >;
  writer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  exp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  likedCollections?: Resolver<
    ResolversTypes['UserCollectionsConnection'],
    ParentType,
    ContextType,
    RequireFields<UserLikedCollectionsArgs, never>
  >;
  myCollections?: Resolver<
    ResolversTypes['UserCollectionsConnection'],
    ParentType,
    ContextType,
    RequireFields<UserMyCollectionsArgs, never>
  >;
  commentsConnection?: Resolver<
    ResolversTypes['UserCommentsConnection'],
    ParentType,
    ContextType,
    RequireFields<UserCommentsConnectionArgs, never>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CommentResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  writer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  commentsConnection?: Resolver<
    ResolversTypes['CommentCommentsConnection'],
    ParentType,
    ContextType,
    RequireFields<CommentCommentsConnectionArgs, never>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['UserEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WebtoonConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonConnection'] = ResolversParentTypes['WebtoonConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['WebtoonEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CollectionConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CollectionConnection'] = ResolversParentTypes['CollectionConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['CollectionEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AuthorConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthorConnection'] = ResolversParentTypes['AuthorConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['AuthorEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WebtoonAuthorsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonAuthorsConnection'] = ResolversParentTypes['WebtoonAuthorsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['WebtoonAuthorsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WebtoonCollectionsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonCollectionsConnection'] = ResolversParentTypes['WebtoonCollectionsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['WebtoonCollectionsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WebtoonCommentsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonCommentsConnection'] = ResolversParentTypes['WebtoonCommentsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['WebtoonCommentsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AuthorWebtoonsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthorWebtoonsConnection'] = ResolversParentTypes['AuthorWebtoonsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['AuthorWebtoonsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CollectionWebtoonsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CollectionWebtoonsConnection'] = ResolversParentTypes['CollectionWebtoonsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['CollectionWebtoonsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CollectionCommentsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CollectionCommentsConnection'] = ResolversParentTypes['CollectionCommentsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['CollectionCommentsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type GenreWebtoonsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['GenreWebtoonsConnection'] = ResolversParentTypes['GenreWebtoonsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GenreWebtoonsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SearchResultWebtoonsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SearchResultWebtoonsConnection'] = ResolversParentTypes['SearchResultWebtoonsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['SearchResultWebtoonsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SearchResultCollectionsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SearchResultCollectionsConnection'] = ResolversParentTypes['SearchResultCollectionsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['SearchResultCollectionsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserCollectionsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserCollectionsConnection'] = ResolversParentTypes['UserCollectionsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['UserCollectionsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserCommentsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserCommentsConnection'] = ResolversParentTypes['UserCommentsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['UserCommentsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CommentCommentsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CommentCommentsConnection'] = ResolversParentTypes['CommentCommentsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['CommentCommentsEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCounts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  counts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SearchResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']
> = ResolversObject<{
  webtoonResult?: Resolver<
    Maybe<ResolversTypes['SearchResultWebtoonsConnection']>,
    ParentType,
    ContextType
  >;
  collectionResult?: Resolver<
    Maybe<ResolversTypes['SearchResultCollectionsConnection']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WebtoonEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonEdge'] = ResolversParentTypes['WebtoonEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Webtoon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CollectionEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CollectionEdge'] = ResolversParentTypes['CollectionEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AuthorEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthorEdge'] = ResolversParentTypes['AuthorEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WebtoonAuthorsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonAuthorsEdge'] = ResolversParentTypes['WebtoonAuthorsEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WebtoonCollectionsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonCollectionsEdge'] = ResolversParentTypes['WebtoonCollectionsEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WebtoonCommentsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonCommentsEdge'] = ResolversParentTypes['WebtoonCommentsEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AuthorWebtoonsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthorWebtoonsEdge'] = ResolversParentTypes['AuthorWebtoonsEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Webtoon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CollectionWebtoonsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CollectionWebtoonsEdge'] = ResolversParentTypes['CollectionWebtoonsEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Webtoon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CollectionCommentsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CollectionCommentsEdge'] = ResolversParentTypes['CollectionCommentsEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type GenreWebtoonsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['GenreWebtoonsEdge'] = ResolversParentTypes['GenreWebtoonsEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Webtoon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SearchResultWebtoonsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SearchResultWebtoonsEdge'] = ResolversParentTypes['SearchResultWebtoonsEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Webtoon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SearchResultCollectionsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SearchResultCollectionsEdge'] = ResolversParentTypes['SearchResultCollectionsEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserCollectionsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserCollectionsEdge'] = ResolversParentTypes['UserCollectionsEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserCommentsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserCommentsEdge'] = ResolversParentTypes['UserCommentsEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CommentCommentsEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CommentCommentsEdge'] = ResolversParentTypes['CommentCommentsEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Date?: GraphQLScalarType;
  Url?: GraphQLScalarType;
  Node?: NodeResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
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
  UserConnection?: UserConnectionResolvers<ContextType>;
  WebtoonConnection?: WebtoonConnectionResolvers<ContextType>;
  CollectionConnection?: CollectionConnectionResolvers<ContextType>;
  AuthorConnection?: AuthorConnectionResolvers<ContextType>;
  WebtoonAuthorsConnection?: WebtoonAuthorsConnectionResolvers<ContextType>;
  WebtoonCollectionsConnection?: WebtoonCollectionsConnectionResolvers<
    ContextType
  >;
  WebtoonCommentsConnection?: WebtoonCommentsConnectionResolvers<ContextType>;
  AuthorWebtoonsConnection?: AuthorWebtoonsConnectionResolvers<ContextType>;
  CollectionWebtoonsConnection?: CollectionWebtoonsConnectionResolvers<
    ContextType
  >;
  CollectionCommentsConnection?: CollectionCommentsConnectionResolvers<
    ContextType
  >;
  GenreWebtoonsConnection?: GenreWebtoonsConnectionResolvers<ContextType>;
  SearchResultWebtoonsConnection?: SearchResultWebtoonsConnectionResolvers<
    ContextType
  >;
  SearchResultCollectionsConnection?: SearchResultCollectionsConnectionResolvers<
    ContextType
  >;
  UserCollectionsConnection?: UserCollectionsConnectionResolvers<ContextType>;
  UserCommentsConnection?: UserCommentsConnectionResolvers<ContextType>;
  CommentCommentsConnection?: CommentCommentsConnectionResolvers<ContextType>;
  SearchResult?: SearchResultResolvers<ContextType>;
  WebtoonEdge?: WebtoonEdgeResolvers<ContextType>;
  CollectionEdge?: CollectionEdgeResolvers<ContextType>;
  AuthorEdge?: AuthorEdgeResolvers<ContextType>;
  WebtoonAuthorsEdge?: WebtoonAuthorsEdgeResolvers<ContextType>;
  WebtoonCollectionsEdge?: WebtoonCollectionsEdgeResolvers<ContextType>;
  WebtoonCommentsEdge?: WebtoonCommentsEdgeResolvers<ContextType>;
  AuthorWebtoonsEdge?: AuthorWebtoonsEdgeResolvers<ContextType>;
  CollectionWebtoonsEdge?: CollectionWebtoonsEdgeResolvers<ContextType>;
  CollectionCommentsEdge?: CollectionCommentsEdgeResolvers<ContextType>;
  GenreWebtoonsEdge?: GenreWebtoonsEdgeResolvers<ContextType>;
  SearchResultWebtoonsEdge?: SearchResultWebtoonsEdgeResolvers<ContextType>;
  SearchResultCollectionsEdge?: SearchResultCollectionsEdgeResolvers<
    ContextType
  >;
  UserEdge?: UserEdgeResolvers<ContextType>;
  UserCollectionsEdge?: UserCollectionsEdgeResolvers<ContextType>;
  UserCommentsEdge?: UserCommentsEdgeResolvers<ContextType>;
  CommentCommentsEdge?: CommentCommentsEdgeResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  exp?: ExpDirectiveResolver<any, any, ContextType>;
}>;

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = Context> = DirectiveResolvers<
  ContextType
>;
