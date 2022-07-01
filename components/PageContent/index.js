import { useContext, Fragment } from "react";
import { MDXRemote } from "next-mdx-remote";
import Section from "../Section";
import components from "../";
import { PageContext } from "../../pages/_app";

// Render the main content of the MDX file (in props.source and props.content) to React.
const PageContent = () => {
  const { source, content } = useContext(PageContext);

  // If the Markdown file doesn't start with a section, wrap with section.
  let Wrapper = Fragment;
  if (!content.trim().startsWith("<Section")) {
    Wrapper = WrapWithSection;
  }

  if (!source) return null;
  return (
    <Wrapper>
      <MDXRemote
        {...source}
        components={{ ...components, wrapper: MDXWrapper }}
      />
    </Wrapper>
  );
};

function WrapWithSection({ children }) {
  return <Section width="narrow">{children}</Section>;
}

export default PageContent;

/*
  I'm using MDXWrapper in a hacky way to customize the way tooltips appear
  by manipulating the React children directly.
*/

function MDXWrapper({ children }) {
  return <div>{children}</div>;
}
