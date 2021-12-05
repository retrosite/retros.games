import { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Center from "../Center";
import Clickable from "../Clickable";
import GameCard from "../GameCard";
import genres from "../../data/genres.yaml";
import { PageContext } from "../../pages/_app";
import styles from "./index.module.scss";

GameGallery.propTypes = {
  show: PropTypes.oneOf(["genre", "all", "alphabetical"]),
};

// Gallery that shows all games in various ways with tabs. Show by genre or all.
export default function GameGallery({ show = "genre" }) {
  const { games } = useContext(PageContext);
  const sorted_games = games.sort(function(a, b) {
		var nameA = a.name.toUpperCase();
		var nameB = b.name.toUpperCase();
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		return 0;
  });

  const [tab, setTab] = useState(show);

  const [searchText, setSearchText] = useState("");

  const view = searchText ? "search" : tab;

  const filteredGames = useMemo(() => {
    if (view === "alphabetical") {
      return sorted_games;
    }
    if (view === "search") {
      return sorted_games.filter((game) =>
        matchesSearch(game, searchText)
      );
    }
    // Otherwise, return all by date.
    return games;
  }, [games, view, searchText]);

  return (
    <>
      <div className={styles.tabs}>
        <Clickable
          text="Genres"
          onClick={() => {
            setTab("genre");
            setSearchText("");
          }}
          active={view === "genre"}
        />
        <Clickable
          text="By date"
          onClick={() => {
            setTab("all");
            setSearchText("");
          }}
          active={view === "all"}
        />
        <Clickable
          text="Alphabetical"
          onClick={() => {
            setTab("alphabetical");
            setSearchText("");
          }}
          active={view === "alphabetical"}
        />

        <div className={styles.search} data-active={view === "search"}>
          <i className="fas fa-search" />
          <input
            type="text"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
      </div>
      {view === "genre" && (
        <Center>
          {genres.map((genre) => (
            <GenreCard key={genre.slug} genre={genre} />
          ))}
        </Center>
      )}
      {(view === "all" || view === "search") &&
        filteredGames.map((game) => (
          <GameCard key={game.slug} id={game.slug} />
        ))}
      {(view === "all" || view === "search" || view === "alphabetical") && filteredGames.length === 0 && (
        <div className={styles.no_results}>
          <p>No games found.</p>
        </div>
      )}
      {view === "alphabetical" &&
        filteredGames.map((game) => (
          <GameCard key={game.slug} id={game.slug} />
        ))}
    </>
  );
}

const GenreCard = ({ genre }) => {
  return (
    <Link href={`/genres/${genre.slug}`}>
      <a className={styles.genre_card}>
        <img
          className={styles.image}
          src={`/images/genres/${genre.slug}.png`}
          alt={genre.name}
        />
        <span className={styles.title}>{genre.name}</span>
      </a>
    </Link>
  );
};

function matchesSearch(game, searchText) {
  const searchStrings = [
    game.title,
    game.description,
    game.slug,
    game.genre,
    game.name,
    new Date(game.date).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  ];

  return searchStrings
    .join("\n")
    .toLowerCase()
    .includes(searchText.toLowerCase());
}
