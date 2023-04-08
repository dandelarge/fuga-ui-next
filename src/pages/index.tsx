import { Layout } from '@/components/Layout/Layout';
import { Typography } from '@material-ui/core';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';

const Page: NextPageWithLayout = () => {
  return (<Typography variant='h3' > Indexu</Typography>);
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Page