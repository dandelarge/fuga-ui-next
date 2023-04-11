import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, createStyles, Theme, Grid, Typography } from "@material-ui/core";

import { MDXProvider } from '@mdx-js/react';
import Container from "@material-ui/core/Container";
import Link from "next/link";
import { Prism } from "react-syntax-highlighter";
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';
import light from 'react-syntax-highlighter/dist/cjs/styles/prism/material-light';
import { CSSProperties, useCallback } from "react";

interface Props {
  children: React.ReactNode;
  docs: {
    title: string;
    slug: string;
    description?: string;
    tags?: string[];
  }[];
  themeMode?: 'light' | 'dark';
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
({
  gridItem: {
    margin: `${theme.spacing(3)}px 0}`
  },
  sideTitle: {
    marginTop: `${theme.spacing(3)}px`
  }
})
);

function getTypography(variant: string) {
  return function CustomTypography(props: any) { return <Typography variant={variant} gutterBottom {...props} /> };
}

function CodeBlock(style: { [key: string]: CSSProperties }) {
  return function CodeBlockComponent(props: any) {
    if (!props?.className) {
      return <code  {...props} />;
    }

    return <Prism language='tsx' style={style} {...props} />;
  }
}

function DocsLayout(props: Props) {
  const classes = useStyles();

  const buildComponents = useCallback((themeMode: 'light' | 'dark') => {
    const style = themeMode === 'light' ? light : dark;
    const components = {
      h1: getTypography('h1'),
      h2: getTypography('h2'),
      h3: getTypography('h3'),
      h4: getTypography('h4'),
      h5: getTypography('h5'),
      h6: getTypography('h6'),
      p: getTypography('body1'),
      code: CodeBlock(style)
    };

    return components;
  }, []);


  return (
    <Container maxWidth={false}>
      <Grid container spacing={4}>
        <Grid item xs={3} lg={2} className={classes.gridItem}>
          <Typography variant="h5">Getting Started</Typography>
          <List>
            <ListItem button component={Link} href="/docs/getting-started">Getting Started</ListItem>
          </List>
          <Divider />
          <Typography variant="h5" className={classes.sideTitle}>Patterns</Typography>
          <List>
            {props.docs.map(doc => (
              <ListItem button component={Link} href={`/docs/${doc.slug}`} key={doc.slug}>
                {doc.title}
              </ListItem>
            ))}
          </List>

        </Grid>
        <Grid item xs={9} lg={8} className={classes.gridItem}>
          <MDXProvider components={buildComponents(props.themeMode || 'dark')}>
            {props.children}
          </MDXProvider>
        </Grid>

      </Grid>
    </Container>
  );
}

export default DocsLayout;