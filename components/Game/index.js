import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { PageContext } from "../../pages/_app";
import Section from "../Section";
import genres from "../../data/genres.yaml";
import styles from "./index.module.scss";

export default function Game({ defaultToWide }) {
  const { name: url, genre: genreName } = useContext(PageContext);

  const genre = genres.find(({ name }) => name === genreName);

  const [wideGame] = useState(defaultToWide);

  if (!url && !genre) return null;

  return (
    <Section id="game-section" width={wideGame ? "wide" : "narrow"}>
      <div className={styles.gameArea}>
        {genre && (
          <Link href={`/genres/${genre.slug}`}>
            <a className={styles.genreLink}>
              <i className="fas fa-arrow-left"></i>
              {genreName}
            </a>
          </Link>
        )}

        {url && (
          <div className={styles.game}>
            <div className={styles.frame}>
              <iframe
                className={styles.iframe}
                src={`/cdn/games/${url}/index.html`}
              />
            </div>
          </div>
        )}
      </div>
      {wideGame && <div className={styles.bottomSpacer} />}
    </Section>
  );
}
