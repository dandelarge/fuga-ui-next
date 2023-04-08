import { Layout } from "@/components/Layout/Layout";
import { Typography } from "@material-ui/core";
import { NextPageWithLayout } from "../_app";
import { CatalogLayout } from "@/components/Layout/CatalogLayout/CatalogLayout";

const Page: NextPageWithLayout = () => {
  return (
    <Typography variant="h4">Hi</Typography>
  );
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout topMenuIndex={1} title="Products Catalog">
      <CatalogLayout tabsMenuIndex={0}>
        {page}
      </CatalogLayout>
    </Layout>
  );
};

export default Page;