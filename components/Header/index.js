import { useState } from "react";
import Link from "next/link";
import Background from "./background";
import { title } from "../../data/site.yaml";
import styles from "./index.module.scss";

// Header component to show at top of every page
const Header = () => {
  const big = false;

  return (
    <header className={styles.header} data-big={big}>
      <Background />
      <Title big={big} />
      <Nav />
    </header>
  );
};

export default Header;

// Centered site title with logo and text
const Title = ({ big }) => (
  <Link href="/">
    <a className={styles.title}>
      <Text />
    </a>
  </Link>
);

// Site title text
const Text = () => (
  <span className={styles.text}>
    {title.split("").map((char, index) => (
      <span key={index}>{char}</span>
    ))}
  </span>
);

// Mavigation bar with links
const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav} data-open={open}>
      <button className={styles.button} onClick={() => setOpen(!open)}>
        <i className={open ? "fas fa-times" : "fas fa-bars"}></i>
        <span>{open ? "Close" : "Menu"}</span>
      </button>

      <NavLink
        link="/#games"
        text="Games"
      />

      <NavLink
        link="/blog"
        text="Blog"
      />

      <div className={styles.break} />

      <NavLink
        link="/monkeys"
        text="Monkeys"
      />

      <NavLink
        link="/contact"
        text="Contact"
      />
    </nav>
  );
};

// Nav bar link
const NavLink = ({ link, text, icon }) => (
  <Link href={link} passHref>
      <a className={styles.link}>
        {text}
        {icon && <i className={icon} />}
      </a>
  </Link>
);
