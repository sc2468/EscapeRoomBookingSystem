import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BookingInput = {
  name: Scalars['String'];
  contactEmail: Scalars['String'];
  contactPhoneNumber: Scalars['String'];
  numberOfPeople: Scalars['Float'];
};

export type BookingItemInput = {
  dateAndTime: Scalars['String'];
  roomId: Scalars['Float'];
};

export type BookingResponse = {
  __typename?: 'BookingResponse';
  errors?: Maybe<Array<FieldError>>;
  booking?: Maybe<BookingsEntity>;
};

export type BookingsEntity = {
  __typename?: 'BookingsEntity';
  id: Scalars['Float'];
  dateAndTime: Scalars['String'];
  roomId: Scalars['Int'];
  status: Scalars['Int'];
  team?: Maybe<TeamsEntity>;
  result?: Maybe<ResultEntity>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAvailableBooking: BookingsEntity;
  createAvailableBookings: OperationResponse;
  BookAvailableBooking: BookingResponse;
};


export type MutationCreateAvailableBookingArgs = {
  roomId: Scalars['Float'];
  dateAndTime: Scalars['String'];
};


export type MutationCreateAvailableBookingsArgs = {
  bookings: Array<BookingItemInput>;
};


export type MutationBookAvailableBookingArgs = {
  options: BookingInput;
  bookingId: Scalars['Float'];
};

export type OperationResponse = {
  __typename?: 'OperationResponse';
  errors?: Maybe<Array<FieldError>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  getBookings: Array<BookingsEntity>;
  getBooking: BookingResponse;
};


export type QueryGetBookingArgs = {
  bookingId: Scalars['Float'];
};

export type ResultEntity = {
  __typename?: 'ResultEntity';
  id: Scalars['Int'];
  escapeTime?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  booking: Scalars['Int'];
};

export type TeamsEntity = {
  __typename?: 'TeamsEntity';
  id: Scalars['Float'];
  name: Scalars['String'];
  contactEmail: Scalars['String'];
  contactPhoneNumber: Scalars['String'];
  numberOfPeople: Scalars['Int'];
};

export type BookAvailableBookingMutationVariables = Exact<{
  bookingId: Scalars['Float'];
  options: BookingInput;
}>;


export type BookAvailableBookingMutation = (
  { __typename?: 'Mutation' }
  & { BookAvailableBooking: (
    { __typename?: 'BookingResponse' }
    & { booking?: Maybe<(
      { __typename?: 'BookingsEntity' }
      & Pick<BookingsEntity, 'id' | 'dateAndTime' | 'roomId' | 'status'>
      & { team?: Maybe<(
        { __typename?: 'TeamsEntity' }
        & Pick<TeamsEntity, 'name' | 'contactEmail' | 'contactPhoneNumber' | 'numberOfPeople'>
      )> }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CreateAvailableBookingsMutationVariables = Exact<{
  createAvailableBookingsBookings: Array<BookingItemInput> | BookingItemInput;
}>;


export type CreateAvailableBookingsMutation = (
  { __typename?: 'Mutation' }
  & { createAvailableBookings: (
    { __typename?: 'OperationResponse' }
    & Pick<OperationResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type GetBookingQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetBookingQuery = (
  { __typename?: 'Query' }
  & { getBooking: (
    { __typename?: 'BookingResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )>>, booking?: Maybe<(
      { __typename?: 'BookingsEntity' }
      & Pick<BookingsEntity, 'id' | 'dateAndTime' | 'roomId' | 'status'>
    )> }
  ) }
);

export type GetBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookingsQuery = (
  { __typename?: 'Query' }
  & { getBookings: Array<(
    { __typename?: 'BookingsEntity' }
    & Pick<BookingsEntity, 'id' | 'dateAndTime' | 'roomId' | 'status'>
    & { team?: Maybe<(
      { __typename?: 'TeamsEntity' }
      & Pick<TeamsEntity, 'name' | 'contactEmail' | 'contactPhoneNumber' | 'numberOfPeople'>
    )>, result?: Maybe<(
      { __typename?: 'ResultEntity' }
      & Pick<ResultEntity, 'escapeTime' | 'notes' | 'booking'>
    )> }
  )> }
);


export const BookAvailableBookingDocument = gql`
    mutation BookAvailableBooking($bookingId: Float!, $options: BookingInput!) {
  BookAvailableBooking(options: $options, bookingId: $bookingId) {
    booking {
      id
      dateAndTime
      roomId
      status
      team {
        name
        contactEmail
        contactPhoneNumber
        numberOfPeople
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type BookAvailableBookingMutationFn = Apollo.MutationFunction<BookAvailableBookingMutation, BookAvailableBookingMutationVariables>;

/**
 * __useBookAvailableBookingMutation__
 *
 * To run a mutation, you first call `useBookAvailableBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookAvailableBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookAvailableBookingMutation, { data, loading, error }] = useBookAvailableBookingMutation({
 *   variables: {
 *      bookingId: // value for 'bookingId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useBookAvailableBookingMutation(baseOptions?: Apollo.MutationHookOptions<BookAvailableBookingMutation, BookAvailableBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookAvailableBookingMutation, BookAvailableBookingMutationVariables>(BookAvailableBookingDocument, options);
      }
export type BookAvailableBookingMutationHookResult = ReturnType<typeof useBookAvailableBookingMutation>;
export type BookAvailableBookingMutationResult = Apollo.MutationResult<BookAvailableBookingMutation>;
export type BookAvailableBookingMutationOptions = Apollo.BaseMutationOptions<BookAvailableBookingMutation, BookAvailableBookingMutationVariables>;
export const CreateAvailableBookingsDocument = gql`
    mutation CreateAvailableBookings($createAvailableBookingsBookings: [BookingItemInput!]!) {
  createAvailableBookings(bookings: $createAvailableBookingsBookings) {
    success
    errors {
      field
      message
    }
  }
}
    `;
export type CreateAvailableBookingsMutationFn = Apollo.MutationFunction<CreateAvailableBookingsMutation, CreateAvailableBookingsMutationVariables>;

/**
 * __useCreateAvailableBookingsMutation__
 *
 * To run a mutation, you first call `useCreateAvailableBookingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAvailableBookingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAvailableBookingsMutation, { data, loading, error }] = useCreateAvailableBookingsMutation({
 *   variables: {
 *      createAvailableBookingsBookings: // value for 'createAvailableBookingsBookings'
 *   },
 * });
 */
export function useCreateAvailableBookingsMutation(baseOptions?: Apollo.MutationHookOptions<CreateAvailableBookingsMutation, CreateAvailableBookingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAvailableBookingsMutation, CreateAvailableBookingsMutationVariables>(CreateAvailableBookingsDocument, options);
      }
export type CreateAvailableBookingsMutationHookResult = ReturnType<typeof useCreateAvailableBookingsMutation>;
export type CreateAvailableBookingsMutationResult = Apollo.MutationResult<CreateAvailableBookingsMutation>;
export type CreateAvailableBookingsMutationOptions = Apollo.BaseMutationOptions<CreateAvailableBookingsMutation, CreateAvailableBookingsMutationVariables>;
export const GetBookingDocument = gql`
    query getBooking($id: Float!) {
  getBooking(bookingId: $id) {
    errors {
      message
    }
    booking {
      id
      dateAndTime
      roomId
      status
    }
  }
}
    `;

/**
 * __useGetBookingQuery__
 *
 * To run a query within a React component, call `useGetBookingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBookingQuery(baseOptions: Apollo.QueryHookOptions<GetBookingQuery, GetBookingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingQuery, GetBookingQueryVariables>(GetBookingDocument, options);
      }
export function useGetBookingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingQuery, GetBookingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingQuery, GetBookingQueryVariables>(GetBookingDocument, options);
        }
export type GetBookingQueryHookResult = ReturnType<typeof useGetBookingQuery>;
export type GetBookingLazyQueryHookResult = ReturnType<typeof useGetBookingLazyQuery>;
export type GetBookingQueryResult = Apollo.QueryResult<GetBookingQuery, GetBookingQueryVariables>;
export const GetBookingsDocument = gql`
    query getBookings {
  getBookings {
    id
    dateAndTime
    roomId
    status
    team {
      name
      contactEmail
      contactPhoneNumber
      numberOfPeople
    }
    result {
      escapeTime
      notes
      booking
    }
  }
}
    `;

/**
 * __useGetBookingsQuery__
 *
 * To run a query within a React component, call `useGetBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBookingsQuery(baseOptions?: Apollo.QueryHookOptions<GetBookingsQuery, GetBookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingsQuery, GetBookingsQueryVariables>(GetBookingsDocument, options);
      }
export function useGetBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingsQuery, GetBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingsQuery, GetBookingsQueryVariables>(GetBookingsDocument, options);
        }
export type GetBookingsQueryHookResult = ReturnType<typeof useGetBookingsQuery>;
export type GetBookingsLazyQueryHookResult = ReturnType<typeof useGetBookingsLazyQuery>;
export type GetBookingsQueryResult = Apollo.QueryResult<GetBookingsQuery, GetBookingsQueryVariables>;