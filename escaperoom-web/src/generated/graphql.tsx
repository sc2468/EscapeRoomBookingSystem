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
  date: Scalars['String'];
  time: Scalars['String'];
  roomId: Scalars['Float'];
};

export type BookingResponse = {
  __typename?: 'BookingResponse';
  errors?: Maybe<Array<FieldError>>;
  booking?: Maybe<BookingsEntity>;
};

export type BookingsEntity = {
  __typename?: 'BookingsEntity';
  id: Scalars['ID'];
  time: Scalars['String'];
  date: Scalars['Float'];
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
  createAvailableBooking: BookingResponse;
  createAvailableBookings: OperationResponse;
  BookAvailableBooking: BookingResponse;
  CloseOpenBooking: OperationResponse;
  CancelBookedBooking: OperationResponse;
  CompleteBooking: BookingResponse;
};


export type MutationCreateAvailableBookingArgs = {
  roomId: Scalars['Float'];
  time: Scalars['String'];
  date: Scalars['String'];
};


export type MutationCreateAvailableBookingsArgs = {
  bookings: Array<BookingItemInput>;
};


export type MutationBookAvailableBookingArgs = {
  options: BookingInput;
  bookingId: Scalars['Float'];
};


export type MutationCloseOpenBookingArgs = {
  bookingId: Scalars['Float'];
};


export type MutationCancelBookedBookingArgs = {
  bookingId: Scalars['Float'];
};


export type MutationCompleteBookingArgs = {
  escapeTime: Scalars['Float'];
  bookingId: Scalars['Float'];
};

export type OperationResponse = {
  __typename?: 'OperationResponse';
  errors?: Maybe<Array<FieldError>>;
  success?: Maybe<Scalars['Boolean']>;
  bookingId?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  getBookings: Array<BookingsEntity>;
  getBooking: BookingResponse;
};


export type QueryGetBookingsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Float'];
};


export type QueryGetBookingArgs = {
  bookingId: Scalars['Float'];
};

export type ResultEntity = {
  __typename?: 'ResultEntity';
  id: Scalars['Int'];
  escapeTime: Scalars['Int'];
  notes?: Maybe<Scalars['String']>;
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
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, booking?: Maybe<(
      { __typename?: 'BookingsEntity' }
      & Pick<BookingsEntity, 'id' | 'time' | 'date' | 'roomId' | 'status'>
      & { team?: Maybe<(
        { __typename?: 'TeamsEntity' }
        & Pick<TeamsEntity, 'id' | 'name' | 'contactEmail' | 'contactPhoneNumber' | 'numberOfPeople'>
      )> }
    )> }
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

export type CloseOpenBookingMutationVariables = Exact<{
  bookingId: Scalars['Float'];
}>;


export type CloseOpenBookingMutation = (
  { __typename?: 'Mutation' }
  & { CloseOpenBooking: (
    { __typename?: 'OperationResponse' }
    & Pick<OperationResponse, 'success' | 'bookingId'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CancelBookedBookingMutationVariables = Exact<{
  bookingId: Scalars['Float'];
}>;


export type CancelBookedBookingMutation = (
  { __typename?: 'Mutation' }
  & { CancelBookedBooking: (
    { __typename?: 'OperationResponse' }
    & Pick<OperationResponse, 'success' | 'bookingId'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CreateAvailableBookingMutationVariables = Exact<{
  roomId: Scalars['Float'];
  bookingTime: Scalars['String'];
  bookingDate: Scalars['String'];
}>;


export type CreateAvailableBookingMutation = (
  { __typename?: 'Mutation' }
  & { createAvailableBooking: (
    { __typename?: 'BookingResponse' }
    & { booking?: Maybe<(
      { __typename?: 'BookingsEntity' }
      & Pick<BookingsEntity, 'id' | 'time' | 'date' | 'roomId' | 'status'>
      & { team?: Maybe<(
        { __typename?: 'TeamsEntity' }
        & Pick<TeamsEntity, 'id' | 'name' | 'contactEmail' | 'contactPhoneNumber' | 'numberOfPeople'>
      )>, result?: Maybe<(
        { __typename?: 'ResultEntity' }
        & Pick<ResultEntity, 'id' | 'escapeTime' | 'notes'>
      )> }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CompleteBookingMutationVariables = Exact<{
  escapeTime: Scalars['Float'];
  bookingId: Scalars['Float'];
}>;


export type CompleteBookingMutation = (
  { __typename?: 'Mutation' }
  & { CompleteBooking: (
    { __typename?: 'BookingResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, booking?: Maybe<(
      { __typename?: 'BookingsEntity' }
      & Pick<BookingsEntity, 'id' | 'time' | 'date' | 'roomId' | 'status'>
      & { team?: Maybe<(
        { __typename?: 'TeamsEntity' }
        & Pick<TeamsEntity, 'id' | 'name' | 'contactEmail' | 'contactPhoneNumber' | 'numberOfPeople'>
      )>, result?: Maybe<(
        { __typename?: 'ResultEntity' }
        & Pick<ResultEntity, 'id' | 'escapeTime' | 'notes'>
      )> }
    )> }
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
      & Pick<BookingsEntity, 'id' | 'date' | 'time' | 'roomId' | 'status'>
      & { team?: Maybe<(
        { __typename?: 'TeamsEntity' }
        & Pick<TeamsEntity, 'id' | 'name' | 'contactEmail' | 'contactPhoneNumber' | 'numberOfPeople'>
      )>, result?: Maybe<(
        { __typename?: 'ResultEntity' }
        & Pick<ResultEntity, 'id' | 'escapeTime' | 'notes'>
      )> }
    )> }
  ) }
);

export type GetBookingsQueryVariables = Exact<{
  limit: Scalars['Float'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetBookingsQuery = (
  { __typename?: 'Query' }
  & { getBookings: Array<(
    { __typename?: 'BookingsEntity' }
    & Pick<BookingsEntity, 'id' | 'date' | 'time' | 'roomId' | 'status'>
    & { team?: Maybe<(
      { __typename?: 'TeamsEntity' }
      & Pick<TeamsEntity, 'id' | 'name' | 'contactEmail' | 'contactPhoneNumber' | 'numberOfPeople'>
    )>, result?: Maybe<(
      { __typename?: 'ResultEntity' }
      & Pick<ResultEntity, 'id' | 'escapeTime' | 'notes'>
    )> }
  )> }
);


export const BookAvailableBookingDocument = gql`
    mutation BookAvailableBooking($bookingId: Float!, $options: BookingInput!) {
  BookAvailableBooking(options: $options, bookingId: $bookingId) {
    errors {
      field
      message
    }
    booking {
      id
      time
      date
      roomId
      status
      team {
        id
        name
        contactEmail
        contactPhoneNumber
        numberOfPeople
      }
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
export const CloseOpenBookingDocument = gql`
    mutation CloseOpenBooking($bookingId: Float!) {
  CloseOpenBooking(bookingId: $bookingId) {
    errors {
      field
      message
    }
    success
    bookingId
  }
}
    `;
export type CloseOpenBookingMutationFn = Apollo.MutationFunction<CloseOpenBookingMutation, CloseOpenBookingMutationVariables>;

/**
 * __useCloseOpenBookingMutation__
 *
 * To run a mutation, you first call `useCloseOpenBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseOpenBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeOpenBookingMutation, { data, loading, error }] = useCloseOpenBookingMutation({
 *   variables: {
 *      bookingId: // value for 'bookingId'
 *   },
 * });
 */
export function useCloseOpenBookingMutation(baseOptions?: Apollo.MutationHookOptions<CloseOpenBookingMutation, CloseOpenBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CloseOpenBookingMutation, CloseOpenBookingMutationVariables>(CloseOpenBookingDocument, options);
      }
export type CloseOpenBookingMutationHookResult = ReturnType<typeof useCloseOpenBookingMutation>;
export type CloseOpenBookingMutationResult = Apollo.MutationResult<CloseOpenBookingMutation>;
export type CloseOpenBookingMutationOptions = Apollo.BaseMutationOptions<CloseOpenBookingMutation, CloseOpenBookingMutationVariables>;
export const CancelBookedBookingDocument = gql`
    mutation CancelBookedBooking($bookingId: Float!) {
  CancelBookedBooking(bookingId: $bookingId) {
    errors {
      field
      message
    }
    success
    bookingId
  }
}
    `;
export type CancelBookedBookingMutationFn = Apollo.MutationFunction<CancelBookedBookingMutation, CancelBookedBookingMutationVariables>;

/**
 * __useCancelBookedBookingMutation__
 *
 * To run a mutation, you first call `useCancelBookedBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelBookedBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelBookedBookingMutation, { data, loading, error }] = useCancelBookedBookingMutation({
 *   variables: {
 *      bookingId: // value for 'bookingId'
 *   },
 * });
 */
export function useCancelBookedBookingMutation(baseOptions?: Apollo.MutationHookOptions<CancelBookedBookingMutation, CancelBookedBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelBookedBookingMutation, CancelBookedBookingMutationVariables>(CancelBookedBookingDocument, options);
      }
export type CancelBookedBookingMutationHookResult = ReturnType<typeof useCancelBookedBookingMutation>;
export type CancelBookedBookingMutationResult = Apollo.MutationResult<CancelBookedBookingMutation>;
export type CancelBookedBookingMutationOptions = Apollo.BaseMutationOptions<CancelBookedBookingMutation, CancelBookedBookingMutationVariables>;
export const CreateAvailableBookingDocument = gql`
    mutation CreateAvailableBooking($roomId: Float!, $bookingTime: String!, $bookingDate: String!) {
  createAvailableBooking(roomId: $roomId, time: $bookingTime, date: $bookingDate) {
    booking {
      id
      time
      date
      roomId
      status
      team {
        id
        name
        contactEmail
        contactPhoneNumber
        numberOfPeople
      }
      result {
        id
        escapeTime
        notes
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateAvailableBookingMutationFn = Apollo.MutationFunction<CreateAvailableBookingMutation, CreateAvailableBookingMutationVariables>;

/**
 * __useCreateAvailableBookingMutation__
 *
 * To run a mutation, you first call `useCreateAvailableBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAvailableBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAvailableBookingMutation, { data, loading, error }] = useCreateAvailableBookingMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      bookingTime: // value for 'bookingTime'
 *      bookingDate: // value for 'bookingDate'
 *   },
 * });
 */
export function useCreateAvailableBookingMutation(baseOptions?: Apollo.MutationHookOptions<CreateAvailableBookingMutation, CreateAvailableBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAvailableBookingMutation, CreateAvailableBookingMutationVariables>(CreateAvailableBookingDocument, options);
      }
export type CreateAvailableBookingMutationHookResult = ReturnType<typeof useCreateAvailableBookingMutation>;
export type CreateAvailableBookingMutationResult = Apollo.MutationResult<CreateAvailableBookingMutation>;
export type CreateAvailableBookingMutationOptions = Apollo.BaseMutationOptions<CreateAvailableBookingMutation, CreateAvailableBookingMutationVariables>;
export const CompleteBookingDocument = gql`
    mutation CompleteBooking($escapeTime: Float!, $bookingId: Float!) {
  CompleteBooking(escapeTime: $escapeTime, bookingId: $bookingId) {
    errors {
      field
      message
    }
    booking {
      id
      time
      date
      roomId
      status
      team {
        id
        name
        contactEmail
        contactPhoneNumber
        numberOfPeople
      }
      result {
        id
        escapeTime
        notes
      }
    }
  }
}
    `;
export type CompleteBookingMutationFn = Apollo.MutationFunction<CompleteBookingMutation, CompleteBookingMutationVariables>;

/**
 * __useCompleteBookingMutation__
 *
 * To run a mutation, you first call `useCompleteBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeBookingMutation, { data, loading, error }] = useCompleteBookingMutation({
 *   variables: {
 *      escapeTime: // value for 'escapeTime'
 *      bookingId: // value for 'bookingId'
 *   },
 * });
 */
export function useCompleteBookingMutation(baseOptions?: Apollo.MutationHookOptions<CompleteBookingMutation, CompleteBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteBookingMutation, CompleteBookingMutationVariables>(CompleteBookingDocument, options);
      }
export type CompleteBookingMutationHookResult = ReturnType<typeof useCompleteBookingMutation>;
export type CompleteBookingMutationResult = Apollo.MutationResult<CompleteBookingMutation>;
export type CompleteBookingMutationOptions = Apollo.BaseMutationOptions<CompleteBookingMutation, CompleteBookingMutationVariables>;
export const GetBookingDocument = gql`
    query getBooking($id: Float!) {
  getBooking(bookingId: $id) {
    errors {
      message
    }
    booking {
      id
      date
      time
      roomId
      status
      team {
        id
        name
        contactEmail
        contactPhoneNumber
        numberOfPeople
      }
      result {
        id
        escapeTime
        notes
      }
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
    query getBookings($limit: Float!, $cursor: String) {
  getBookings(limit: $limit, cursor: $cursor) {
    id
    date
    time
    roomId
    status
    team {
      id
      name
      contactEmail
      contactPhoneNumber
      numberOfPeople
    }
    result {
      id
      escapeTime
      notes
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
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetBookingsQuery(baseOptions: Apollo.QueryHookOptions<GetBookingsQuery, GetBookingsQueryVariables>) {
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