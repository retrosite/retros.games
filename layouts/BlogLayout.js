import NormalLayout from "./NormalLayout";
import PageContent from "../components/PageContent";
import Section from "../components/Section";
import { formatDate } from "../util/locale";

// Layout for blog posts.
const BlogLayout = ({ title, date }) => {
  return (
    <NormalLayout>
      <Section width="narrow">
        <h1 id="title" style={{ marginTop: 0 }}>
          {title}
        </h1>
        {date && <div style={{ fontStyle: "italic" }}>{formatDate(date)}</div>}
      </Section>
      <div />
      <PageContent />
    </NormalLayout>
  );
};

export default BlogLayout;
