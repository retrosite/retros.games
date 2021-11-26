import PropTypes from "prop-types";
import Section from "../Section";
import styles from "./index.module.scss";

GenreHeader.propTypes = {
  genre: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
};

export default function GenreHeader({ genre }) {
  return (
    <Section width="narrow" style={{ background: "#13102b" }}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={`/images/genres/${genre.slug}.png`}
          alt=""
        />
      </div>

      <div className={styles.text}>
        <h1 id={genre.slug}>{genre.name}</h1>
        {genre.description && <div>{genre.description}</div>}
      </div>
    </Section>
  );
}