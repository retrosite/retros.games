import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";

// A section wrapper component that spans the entire width of the screen.
Section.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOf(["narrow", "normal", "full"]),
};

// Make sure Markdown starts and ends with this component, or don't use it at
// all. See the PageContent component.
const SectionContext = createContext({ width: "normal" });

export default function Section({ children, width = "normal", ...props }) {
  return (
    <SectionContext.Provider value={{ width }}>
      <section {...props} className={styles.section} data-width={width}>
        <div className={styles.wrapper}>{children}</div>
      </section>
    </SectionContext.Provider>
  );
}

export function useSectionWidth() {
  const { width } = useContext(SectionContext);
  return width;
}
