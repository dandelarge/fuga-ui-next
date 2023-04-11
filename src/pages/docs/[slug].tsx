import DocsLayout from "@/components/Layout/DocsLayout/DocsLayout";
import { Layout } from "@/components/Layout/Layout";
import { readFileSync, readdirSync } from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult, MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { join } from "path";
import { NextPageWithLayout } from "../_app";

const DOCS_PATH = "./docs";

interface Props {
  docs: {
    title: string;
    slug: string;
    description?: string;
    tags?: string[];
  }[];
  pageContent: MDXRemoteSerializeResult;
}

const Page: NextPageWithLayout<Props> = ({ docs, pageContent }) => {
  return (
    <Layout topMenuIndex={0} title={pageContent.frontmatter.title}>
      <DocsLayout docs={docs}>
        <MDXRemote {...pageContent} />
      </DocsLayout>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const frontMatterPromises = readdirSync(DOCS_PATH)
    .map(async (path) => {
      const content = readFileSync(join(DOCS_PATH, path), "utf8");
      const mdxContent = await serialize(content, { parseFrontmatter: true });
      return mdxContent.frontmatter;
    });

  const frontmatterSources = await Promise.all(frontMatterPromises);
  const filtered = frontmatterSources.filter((source) => !!source?.title);

  const slug = params?.slug as string;
  const filePath = join(DOCS_PATH, `${slug}.mdx`);
  const pageContent = readFileSync(filePath, "utf8");
  const serialized = await serialize(pageContent, { parseFrontmatter: true });

  return {
    props: {
      docs: filtered,
      pageContent: serialized,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = readdirSync(DOCS_PATH)
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Page;