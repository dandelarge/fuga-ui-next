import DocsLayout from "@/components/Layout/DocsLayout/DocsLayout";
import { Layout } from "@/components/Layout/Layout";
import { readFileSync, readdirSync } from "fs";
import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { join } from "path";
import { NextPageWithLayout } from "./_app";

const DOCS_PATH = "./docs";

interface Props {
  docs: {
    title: string;
    slug: string;
    description?: string;
    tags?: string[];
  }[];
}

const Page: NextPageWithLayout<Props> = ({ docs }) => {
  return (
    <DocsLayout docs={docs}>
      Hello
    </DocsLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const frontMatterPromises = readdirSync(DOCS_PATH)
    .map(async (path) => {
      const content = readFileSync(join(DOCS_PATH, path), "utf8");
      const mdxContent = await serialize(content, { parseFrontmatter: true });
      return mdxContent.frontmatter;
    });

  const frontmatterSources = await Promise.all(frontMatterPromises);
  const filtered = frontmatterSources.filter((source) => !!source?.title);

  return {
    props: {
      docs: filtered,
    }
  }
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout topMenuIndex={0} title="Welcome to the Docs">
      {page}
    </Layout>
  );
};

export default Page;