import { Layout } from "@/components/Layout/Layout";
import { Typography } from "@material-ui/core";
import { NextPageWithLayout } from "../_app";
import { CatalogLayout } from "@/components/Layout/CatalogLayout/CatalogLayout";

const Page: NextPageWithLayout = () => {
  return (
    <Typography variant="h4">HEllo</Typography>
  );
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout title="Artists Catalog" topMenuIndex={1}>
      <CatalogLayout tabsMenuIndex={2} >
        {page}
      </CatalogLayout>
    </Layout>
  );
};

export default Page;