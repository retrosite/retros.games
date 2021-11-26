import PropTypes from "prop-types";
import styles from "./index.module.scss";

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

// A simple wrapper component for main section of page.
export default function Main({ children }) {
  return <main className={styles.main}>{children}</main>;
}