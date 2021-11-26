import styles from "./index.module.scss";

// Footer component to show at bottom of every page.
const Footer = () => (
  <footer className={styles.footer}>
    <Copyright />
    <a className={styles.discord} href="https://discord.gg/jMD9VBnRjK"><i className="fab fa-discord"></i></a>
  </footer>
);

export default Footer;

// Left copyright col.
const Copyright = () => (
  <div className={styles.copyright}>
    &copy; {new Date().getFullYear()} retros.games
  </div>
);