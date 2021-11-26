import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

// Latest version of react-markdown only supports remark 13.
// Latest version of MDX only supports remark 12.
// Thus, have separate 12 and 13 remark versions.
// Use 13 for this component, 12 for everything else (MDX).

Markdownify.propTypes = {
  children: PropTypes.node.isRequired,
  noParagraph: PropTypes.bool,
};

// Component to turn plain string into markdown, useful for making components
// accept markdown as props.
export default function Markdownify({ children, noParagraph = false }) {
  if (typeof children === "string") {
    return (
      <ReactMarkdown
        components={noParagraph ? { p: "span" } : {}}
      >
        {children}
      </ReactMarkdown>
    );
  } else return children;
}