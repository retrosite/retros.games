import NormalLayout from "../../layouts/NormalLayout";
import Section from "../../components/Section";
import GenreHeader from "../../components/GenreHeader";
import GameCard from "../../components/GameCard";
import genres from "../../data/genres.yaml";
import { gameMeta } from "../../util/pages";
import Clickable from "../../components/Clickable";

export default function Genre({ genre }) {
  return (
    <NormalLayout>
      <GenreHeader genre={genre} />
      <Section width="narrow">
        <div style={{ textAlign: "left" }}>
          <Clickable
            link="/#games"
            text="Games"
            icon="fas fa-arrow-left"
            style={{ margin: 0 }}
          />
        </div>

        <div style={{ margin: "20px -20px" }}>
          {genre.games.map((slug) => (
            <GameCard key={slug} id={slug} />
          ))}
        </div>
      </Section>
    </NormalLayout>
  );
}

export async function getStaticPaths() {
  const paths = genres.map((genre) => `/genres/${genre.slug}`);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const genre = genres.find((genre) => genre.slug === params.slug);

  return {
    props: {
      genre,
      games: gameMeta,
    },
  };
}
