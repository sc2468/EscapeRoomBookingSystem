import { SpinnerIcon } from '@chakra-ui/icons';
import React from 'react'
import { ReactNode } from 'react';

interface Props {
  error?: string,
  loading?: boolean,
  Component: ReactNode,
  data: any,
}

export default function Page(props: Props) {
  const { loading, error, Component, data } = props;
  return (
    <>
      {loading && <SpinnerIcon />}
      {error && <div>An Error has occurred please refresh the page</div>}
      {data && <Component data={data} />}
    </>
  )
}
