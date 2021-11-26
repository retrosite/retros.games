import { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";

// Utility component to flex center the children of the component.
const Center = forwardRef(({ children }, ref) => {
  if (!children) return null;

  return (
    <div ref={ref} className={styles.center}>
      {children}
    </div>
  );
});

Center.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Center;