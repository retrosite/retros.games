import { useContext } from "react";
import Link from "next/link";
import Chip from "../Chip";
import Section from "../Section";
import { formatDate } from "../../util/locale";
import styles from "./index.module.scss";
import creditsInfo from "../../data/credits.yaml";
import { PageContext } from "../../pages/_app";

// Details to show at the top of a game, with icons and text.
const GameDetails = () => (
  <Section width="narrow">
    <Title />
    <div className={styles.metadata}>
      <Published />
      <br />
      <Credits />
      <br />
      <Source />
    </div>
  </Section>
);

export default GameDetails;

// Game title.
const Title = () => {
  const { title, chapter } = useContext(PageContext);
  return (
    <h1 id="title">
      {chapter !== undefined && <Chip text={`Chapter ${chapter}`} />}
      {title}
    </h1>
  );
};

// Source.
const Source = () => {
  const { name } = useContext(PageContext);
  return (
    <>
      {name && (
        <div>
          <i className="fas fa-desktop"></i>
            <span>
              {name && (
                <Link href={`/cdn/games/${name}/index.html`}>
                  <a>Fullscreen</a>
                </Link>
              )}
            </span>
        </div>
      )}
    </>
  );
};

// Date when the game was first added to the site.
const Published = () => {
  const { date } = useContext(PageContext);
  return (
    <>
      {date && (
        <div>
          <i className="far fa-calendar"></i>
          <span>Published {formatDate(date)}</span>
        </div>
      )}
    </>
  );
};

// List of credits for the game.
const Credits = () => {
  let { credits = [] } = useContext(PageContext);

  // Get list of names.
  const names = creditsInfo.map((c) => c.name);
  // RegEx to split the string by names.
  const regex = new RegExp(`(${names.join("|")})`, "gi");

  // Assemble list of credits with before text, name with link, and after text.
  credits = credits.map((credit) => {
    const [before = "", name = "", after = ""] = credit.split(regex);
    const link = creditsInfo.find((info) => info.name === name)?.link || "";
    return { before, name, link, after };
  });

  return (
    <>
      {credits.map(({ before, name, link, after }, index) => {
        return (
          <div key={index}>
            <i className="fas fa-desktop"></i>
            <span>
              {before}
              {name && (
                <Link href={link}>
                  <a>{name}</a>
                </Link>
              )}
              {after && after}
            </span>
          </div>
        );
      })}
    </>
  );
};