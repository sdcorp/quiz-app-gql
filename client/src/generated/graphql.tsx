import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Category = {
   __typename?: 'Category',
  id: Scalars['ID'],
  name: Scalars['String'],
  questions?: Maybe<Array<Question>>,
  questionCount: Scalars['Int'],
};

export type CategoryCreateInput = {
  name: Scalars['String'],
};

export type CategoryUpdateInput = {
  name?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  register: Scalars['Boolean'],
  login?: Maybe<User>,
  logout: Scalars['Boolean'],
  createCategory: Category,
  updateCategory: Scalars['Boolean'],
  deleteCategory: Scalars['Boolean'],
  createQuestion: Question,
  updateQuestion: Scalars['Boolean'],
  deleteQuestion: Scalars['Boolean'],
};


export type MutationRegisterArgs = {
  userinput: UserInput
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationCreateCategoryArgs = {
  input: CategoryCreateInput
};


export type MutationUpdateCategoryArgs = {
  input: CategoryUpdateInput,
  id: Scalars['Int']
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int']
};


export type MutationCreateQuestionArgs = {
  input: QCreateInput,
  categoryId?: Maybe<Scalars['Int']>
};


export type MutationUpdateQuestionArgs = {
  catId?: Maybe<Scalars['Int']>,
  input: QUpdateInput,
  id: Scalars['Int']
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['Int']
};

export type QCreateInput = {
  title: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  me: User,
  getCategories: Array<Category>,
  getCategoryById?: Maybe<Category>,
  getQuestions: Array<Question>,
  getQuestionById?: Maybe<Question>,
};


export type QueryGetCategoryByIdArgs = {
  id?: Maybe<Scalars['Int']>
};


export type QueryGetQuestionByIdArgs = {
  id?: Maybe<Scalars['Int']>
};

export type Question = {
   __typename?: 'Question',
  id: Scalars['ID'],
  title: Scalars['String'],
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
  category?: Maybe<Category>,
};

export type QUpdateInput = {
  title?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
};

export type UserInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type GetCategoriesQueryVariables = {};


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { getCategories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'questionCount'>
  )> }
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  ) }
);


export const GetCategoriesDocument = gql`
    query getCategories {
  getCategories {
    id
    name
    questionCount
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
      }
export function useGetCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = ApolloReactCommon.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

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
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;

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
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;