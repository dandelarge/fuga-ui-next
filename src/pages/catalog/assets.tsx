import { Layout } from "@/components/Layout/Layout";
import { Typography } from "@material-ui/core";
import { NextPageWithLayout } from "../_app";
import { CatalogLayout } from "@/components/Layout/CatalogLayout/CatalogLayout";

const Page: NextPageWithLayout = () => {
  return (
    <Typography variant="h4"></Typography>
  );
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout topMenuIndex={1} title="Assets Catalog">
      <CatalogLayout tabsMenuIndex={1} >
        {page}
      </CatalogLayout>
    </Layout>
  );
};

export default Page;