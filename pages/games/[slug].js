import GameLayout from "../../layouts/GameLayout";
import { gamePaths, gameProps } from "../../util/pages";

export default GameLayout;

export const getStaticPaths = async () => ({
  paths: gamePaths,
  fallback: false,
});

export const getStaticProps = async ({ params }) =>
  await gameProps(params.slug);