import { useContext } from "react";
import NormalLayout from "./NormalLayout";
import PageContent from "../components/PageContent";
import Game from "../components/Game";
import GameDetails from "../components/GameDetails";
import { PageContext } from "../pages/_app";

// Layout for games.
const GameLayout = () => {
  const { content } = useContext(PageContext);
  return (
    <NormalLayout>
      <Game/>
      <GameDetails />
      <div />
      <PageContent />

    </NormalLayout>
  );
};

export default GameLayout;