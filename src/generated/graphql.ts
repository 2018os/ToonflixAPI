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

export enum Platform {
  Naver = 'NAVER',
  Daum = 'DAUM'
}

export enum CollectionType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Node = {
  id: Scalars['ID'];
};

export type Connection = {
  edges?: Maybe<Array<Maybe<Edge>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
  count: Scalars['Int'];
};

export type Edge = {
  cursor: Scalars['String'];
  node?: Maybe<Node>;
};

export type Query = {
  __typename?: 'Query';
  authors: AuthorsConnection;
  webtoons: WebtoonsConnection;
  collections: CollectionsConnection;
  genres?: Maybe<Array<Maybe<Genre>>>;
  users: UsersConnection;
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
  where?: Maybe<CollectionFiltering>;
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
  deleteCollection: User;
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

export type MutationDeleteCollectionArgs = {
  collectionId: Scalars['ID'];
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

export type UserStatus = {
  __typename?: 'UserStatus';
  commentsCount: Scalars['Int'];
  collectionsCount: Scalars['Int'];
  likedCollectionsCount: Scalars['Int'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  webtoonResult?: Maybe<SearchResultWebtoonsConnection>;
  collectionResult?: Maybe<SearchResultCollectionsConnection>;
};

export type SearchResultWebtoonResultArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type SearchResultCollectionResultArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
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
  authors: AuthorsConnection;
  collections: CollectionsConnection;
  genres?: Maybe<Array<Genre>>;
  comments: CommentsConnection;
};

export type WebtoonAuthorsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type WebtoonCollectionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type WebtoonCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type Author = Node & {
  __typename?: 'Author';
  id: Scalars['ID'];
  name: Scalars['String'];
  webtoons: WebtoonsConnection;
};

export type AuthorWebtoonsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type Genre = {
  __typename?: 'Genre';
  code: Scalars['String'];
  name: Scalars['String'];
  webtoons: WebtoonsConnection;
};

export type GenreWebtoonsArgs = {
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
  webtoons: WebtoonsConnection;
  comments: CommentsConnection;
  writer: User;
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type CollectionWebtoonsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type CollectionCommentsArgs = {
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
  status: UserStatus;
  likedCollections: CollectionsConnection;
  myCollections: CollectionsConnection;
  comments: CommentsConnection;
};

export type UserLikedCollectionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
  where?: Maybe<CollectionFiltering>;
};

export type UserMyCollectionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
  where?: Maybe<CollectionFiltering>;
};

export type UserCommentsArgs = {
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
  comments: CommentsConnection;
};

export type CommentCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};

export type CommentsConnection = Connection & {
  __typename?: 'CommentsConnection';
  edges?: Maybe<Array<Maybe<CommentEdge>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
  count: Scalars['Int'];
};

export type UsersConnection = Connection & {
  __typename?: 'UsersConnection';
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
  count: Scalars['Int'];
};

export type WebtoonsConnection = Connection & {
  __typename?: 'WebtoonsConnection';
  edges?: Maybe<Array<Maybe<WebtoonEdge>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
  count: Scalars['Int'];
};

export type CollectionsConnection = Connection & {
  __typename?: 'CollectionsConnection';
  edges?: Maybe<Array<Maybe<CollectionEdge>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
  count: Scalars['Int'];
};

export type AuthorsConnection = Connection & {
  __typename?: 'AuthorsConnection';
  edges?: Maybe<Array<Maybe<AuthorEdge>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
  count: Scalars['Int'];
};

export type SearchResultWebtoonsConnection = Connection & {
  __typename?: 'SearchResultWebtoonsConnection';
  edges?: Maybe<Array<Maybe<SearchResultWebtoonsEdge>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
  count: Scalars['Int'];
};

export type SearchResultCollectionsConnection = Connection & {
  __typename?: 'SearchResultCollectionsConnection';
  edges?: Maybe<Array<Maybe<SearchResultCollectionsEdge>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
  count: Scalars['Int'];
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

export type UserEdge = Edge & {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type CommentEdge = Edge & {
  __typename?: 'CommentEdge';
  cursor: Scalars['String'];
  node?: Maybe<Comment>;
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
  webtoonIds: Array<Maybe<Scalars['ID']>>;
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

export type CollectionFiltering = {
  keyword?: Maybe<Scalars['String']>;
  containWebtoonIds?: Maybe<Array<Scalars['ID']>>;
};

export type SearchFiltering = {
  isPay?: Maybe<Scalars['Boolean']>;
  isAdult?: Maybe<Scalars['Boolean']>;
  isFinish?: Maybe<Scalars['Boolean']>;
  platforms?: Maybe<Array<Platform>>;
  genres?: Maybe<Array<Maybe<Scalars['String']>>>;
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
    | ResolversTypes['CommentsConnection']
    | ResolversTypes['UsersConnection']
    | ResolversTypes['WebtoonsConnection']
    | ResolversTypes['CollectionsConnection']
    | ResolversTypes['AuthorsConnection']
    | ResolversTypes['SearchResultWebtoonsConnection']
    | ResolversTypes['SearchResultCollectionsConnection'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Edge:
    | ResolversTypes['WebtoonEdge']
    | ResolversTypes['CollectionEdge']
    | ResolversTypes['AuthorEdge']
    | ResolversTypes['UserEdge']
    | ResolversTypes['CommentEdge']
    | ResolversTypes['SearchResultWebtoonsEdge']
    | ResolversTypes['SearchResultCollectionsEdge'];
  String: ResolverTypeWrapper<Scalars['String']>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  UserStatus: ResolverTypeWrapper<UserStatus>;
  SearchResult: ResolverTypeWrapper<SearchResult>;
  Webtoon: ResolverTypeWrapper<Webtoon>;
  Author: ResolverTypeWrapper<Author>;
  Genre: ResolverTypeWrapper<Genre>;
  Collection: ResolverTypeWrapper<Collection>;
  User: ResolverTypeWrapper<User>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentsConnection: ResolverTypeWrapper<CommentsConnection>;
  UsersConnection: ResolverTypeWrapper<UsersConnection>;
  WebtoonsConnection: ResolverTypeWrapper<WebtoonsConnection>;
  CollectionsConnection: ResolverTypeWrapper<CollectionsConnection>;
  AuthorsConnection: ResolverTypeWrapper<AuthorsConnection>;
  SearchResultWebtoonsConnection: ResolverTypeWrapper<
    SearchResultWebtoonsConnection
  >;
  SearchResultCollectionsConnection: ResolverTypeWrapper<
    SearchResultCollectionsConnection
  >;
  WebtoonEdge: ResolverTypeWrapper<WebtoonEdge>;
  CollectionEdge: ResolverTypeWrapper<CollectionEdge>;
  AuthorEdge: ResolverTypeWrapper<AuthorEdge>;
  UserEdge: ResolverTypeWrapper<UserEdge>;
  CommentEdge: ResolverTypeWrapper<CommentEdge>;
  SearchResultWebtoonsEdge: ResolverTypeWrapper<SearchResultWebtoonsEdge>;
  SearchResultCollectionsEdge: ResolverTypeWrapper<SearchResultCollectionsEdge>;
  SignupInput: SignupInput;
  LoginInput: LoginInput;
  CreateCollectionInput: CreateCollectionInput;
  UpdateCollectionInput: UpdateCollectionInput;
  CommentInput: CommentInput;
  CollectionFiltering: CollectionFiltering;
  SearchFiltering: SearchFiltering;
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
    | ResolversParentTypes['CommentsConnection']
    | ResolversParentTypes['UsersConnection']
    | ResolversParentTypes['WebtoonsConnection']
    | ResolversParentTypes['CollectionsConnection']
    | ResolversParentTypes['AuthorsConnection']
    | ResolversParentTypes['SearchResultWebtoonsConnection']
    | ResolversParentTypes['SearchResultCollectionsConnection'];
  Int: Scalars['Int'];
  Edge:
    | ResolversParentTypes['WebtoonEdge']
    | ResolversParentTypes['CollectionEdge']
    | ResolversParentTypes['AuthorEdge']
    | ResolversParentTypes['UserEdge']
    | ResolversParentTypes['CommentEdge']
    | ResolversParentTypes['SearchResultWebtoonsEdge']
    | ResolversParentTypes['SearchResultCollectionsEdge'];
  String: Scalars['String'];
  Query: {};
  Mutation: {};
  AuthPayload: AuthPayload;
  PageInfo: PageInfo;
  Boolean: Scalars['Boolean'];
  UserStatus: UserStatus;
  SearchResult: SearchResult;
  Webtoon: Webtoon;
  Author: Author;
  Genre: Genre;
  Collection: Collection;
  User: User;
  Comment: Comment;
  CommentsConnection: CommentsConnection;
  UsersConnection: UsersConnection;
  WebtoonsConnection: WebtoonsConnection;
  CollectionsConnection: CollectionsConnection;
  AuthorsConnection: AuthorsConnection;
  SearchResultWebtoonsConnection: SearchResultWebtoonsConnection;
  SearchResultCollectionsConnection: SearchResultCollectionsConnection;
  WebtoonEdge: WebtoonEdge;
  CollectionEdge: CollectionEdge;
  AuthorEdge: AuthorEdge;
  UserEdge: UserEdge;
  CommentEdge: CommentEdge;
  SearchResultWebtoonsEdge: SearchResultWebtoonsEdge;
  SearchResultCollectionsEdge: SearchResultCollectionsEdge;
  SignupInput: SignupInput;
  LoginInput: LoginInput;
  CreateCollectionInput: CreateCollectionInput;
  UpdateCollectionInput: UpdateCollectionInput;
  CommentInput: CommentInput;
  CollectionFiltering: CollectionFiltering;
  SearchFiltering: SearchFiltering;
}>;

export type AuthDirectiveArgs = {};

export type AuthDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = AuthDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

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
    | 'CommentsConnection'
    | 'UsersConnection'
    | 'WebtoonsConnection'
    | 'CollectionsConnection'
    | 'AuthorsConnection'
    | 'SearchResultWebtoonsConnection'
    | 'SearchResultCollectionsConnection',
    ParentType,
    ContextType
  >;
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Edge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type EdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    | 'WebtoonEdge'
    | 'CollectionEdge'
    | 'AuthorEdge'
    | 'UserEdge'
    | 'CommentEdge'
    | 'SearchResultWebtoonsEdge'
    | 'SearchResultCollectionsEdge',
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
    ResolversTypes['AuthorsConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryAuthorsArgs, never>
  >;
  webtoons?: Resolver<
    ResolversTypes['WebtoonsConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryWebtoonsArgs, never>
  >;
  collections?: Resolver<
    ResolversTypes['CollectionsConnection'],
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
    ResolversTypes['UsersConnection'],
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
  deleteCollection?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCollectionArgs, 'collectionId'>
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

export type UserStatusResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserStatus'] = ResolversParentTypes['UserStatus']
> = ResolversObject<{
  commentsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  collectionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  likedCollectionsCount?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SearchResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']
> = ResolversObject<{
  webtoonResult?: Resolver<
    Maybe<ResolversTypes['SearchResultWebtoonsConnection']>,
    ParentType,
    ContextType,
    RequireFields<SearchResultWebtoonResultArgs, never>
  >;
  collectionResult?: Resolver<
    Maybe<ResolversTypes['SearchResultCollectionsConnection']>,
    ParentType,
    ContextType,
    RequireFields<SearchResultCollectionResultArgs, never>
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
  authors?: Resolver<
    ResolversTypes['AuthorsConnection'],
    ParentType,
    ContextType,
    RequireFields<WebtoonAuthorsArgs, never>
  >;
  collections?: Resolver<
    ResolversTypes['CollectionsConnection'],
    ParentType,
    ContextType,
    RequireFields<WebtoonCollectionsArgs, never>
  >;
  genres?: Resolver<
    Maybe<Array<ResolversTypes['Genre']>>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<
    ResolversTypes['CommentsConnection'],
    ParentType,
    ContextType,
    RequireFields<WebtoonCommentsArgs, never>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AuthorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webtoons?: Resolver<
    ResolversTypes['WebtoonsConnection'],
    ParentType,
    ContextType,
    RequireFields<AuthorWebtoonsArgs, never>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type GenreResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']
> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webtoons?: Resolver<
    ResolversTypes['WebtoonsConnection'],
    ParentType,
    ContextType,
    RequireFields<GenreWebtoonsArgs, never>
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
  webtoons?: Resolver<
    ResolversTypes['WebtoonsConnection'],
    ParentType,
    ContextType,
    RequireFields<CollectionWebtoonsArgs, never>
  >;
  comments?: Resolver<
    ResolversTypes['CommentsConnection'],
    ParentType,
    ContextType,
    RequireFields<CollectionCommentsArgs, never>
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
  status?: Resolver<ResolversTypes['UserStatus'], ParentType, ContextType>;
  likedCollections?: Resolver<
    ResolversTypes['CollectionsConnection'],
    ParentType,
    ContextType,
    RequireFields<UserLikedCollectionsArgs, never>
  >;
  myCollections?: Resolver<
    ResolversTypes['CollectionsConnection'],
    ParentType,
    ContextType,
    RequireFields<UserMyCollectionsArgs, never>
  >;
  comments?: Resolver<
    ResolversTypes['CommentsConnection'],
    ParentType,
    ContextType,
    RequireFields<UserCommentsArgs, never>
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
  comments?: Resolver<
    ResolversTypes['CommentsConnection'],
    ParentType,
    ContextType,
    RequireFields<CommentCommentsArgs, never>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CommentsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CommentsConnection'] = ResolversParentTypes['CommentsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['CommentEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UsersConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UsersConnection'] = ResolversParentTypes['UsersConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['UserEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WebtoonsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WebtoonsConnection'] = ResolversParentTypes['WebtoonsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['WebtoonEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CollectionsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CollectionsConnection'] = ResolversParentTypes['CollectionsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['CollectionEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AuthorsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthorsConnection'] = ResolversParentTypes['AuthorsConnection']
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['AuthorEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type UserEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CommentEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CommentEdge'] = ResolversParentTypes['CommentEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
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
  UserStatus?: UserStatusResolvers<ContextType>;
  SearchResult?: SearchResultResolvers<ContextType>;
  Webtoon?: WebtoonResolvers<ContextType>;
  Author?: AuthorResolvers<ContextType>;
  Genre?: GenreResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CommentsConnection?: CommentsConnectionResolvers<ContextType>;
  UsersConnection?: UsersConnectionResolvers<ContextType>;
  WebtoonsConnection?: WebtoonsConnectionResolvers<ContextType>;
  CollectionsConnection?: CollectionsConnectionResolvers<ContextType>;
  AuthorsConnection?: AuthorsConnectionResolvers<ContextType>;
  SearchResultWebtoonsConnection?: SearchResultWebtoonsConnectionResolvers<
    ContextType
  >;
  SearchResultCollectionsConnection?: SearchResultCollectionsConnectionResolvers<
    ContextType
  >;
  WebtoonEdge?: WebtoonEdgeResolvers<ContextType>;
  CollectionEdge?: CollectionEdgeResolvers<ContextType>;
  AuthorEdge?: AuthorEdgeResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  CommentEdge?: CommentEdgeResolvers<ContextType>;
  SearchResultWebtoonsEdge?: SearchResultWebtoonsEdgeResolvers<ContextType>;
  SearchResultCollectionsEdge?: SearchResultCollectionsEdgeResolvers<
    ContextType
  >;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  exp?: ExpDirectiveResolver<any, any, ContextType>;
}>;

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = Context> = DirectiveResolvers<
  ContextType
>;
