import { useContext } from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import Chip from "../Chip";
import { formatDate } from "../../util/locale";
import { PageContext } from "../../pages/_app";
import styles from "./index.module.scss";
import Tooltip from "../Tooltip";

GameCard.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string,
  mini: PropTypes.bool,
  reverse: PropTypes.bool,
  tooltip: PropTypes.node,
  active: PropTypes.bool,
  className: PropTypes.string,
};

// Button that links to a game, showing details like thumbnail, title, etc.
export default function GameCard({
  id,
  icon,
  mini,
  reverse,
  tooltip,
  active,
  className = "",
}) {
  const { games = [] } = useContext(PageContext);

  // Find a game with a matching slug.
  const game = games.find((game) => game.slug === id);

  // If that didn't work, don't render.
  if (!game) return null;

  // Get tag type/name for component.
  let Component;
  if (active) Component = Stub;
  else Component = Link;

  // Get game details.
  let { slug, title, description, date, thumbnail, type, genre } = game;
  if (date) date = formatDate(date);

  return (
    <Component
      link={`/games/${slug}`}
      className={styles.game_card + " " + className}
      tooltip={tooltip}
      data-active={active || false}
      data-mini={mini || false}
      data-reverse={reverse || false}
    >
      {icon && <i className={icon}></i>}

      <div className={styles.image}>
        <div className={styles.frame}>
          <img src={thumbnail} alt="" />
        </div>
      </div>

      <div className={styles.text}>
        <span>{title && <span className={styles.title}>{title}</span>}</span>
        {description && !mini && (
          <span className={styles.description}>{description}</span>
        )}
        {(type !== undefined || date) && !mini && (
          <span>
            {type !== undefined && (
              <Chip text={type} mini={mini} tooltip={`In genre "${genre}"`} />
            )}
            {date && <span>{date}</span>}{" "}
          </span>
        )}
      </div>
    </Component>
  );
}

const Link = ({ link, tooltip, ...rest }) => (
  <NextLink href={link} passHref>
    <Tooltip content={tooltip}>
      <a {...rest} />
    </Tooltip>
  </NextLink>
);

const Stub = ({ ...props }) => <a {...props} />;
