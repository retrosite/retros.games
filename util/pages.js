import { readFileSync, statSync } from "fs";
import { basename, extname, dirname, join, relative } from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { glob } from "glob";
import rehypeSlug from "rehype-slug";
import sizeOfImage from "image-size";
import genres from "../data/genres.yaml";

// Read the MDX file, get the derived props, and return info in desired structure.
const parseMdx = (file) => {
  // Read the MDX.
  let { data, content } = matter(readFileSync(file, "utf8"));

  // There seems to be some sort of caching where the data object
  // is the exact same each time. But we want a fresh copy each time
  // so that we can modify it without affecting the result if `matter`
  // runs on the same file again.
  data = { ...data };

  // Put the dates in serializable format.
  data.date = data.date ? new Date(data.date).toISOString() : null;
  data.lastMod = new Date(statSync(file).mtime || new Date()).toISOString();

  // Info about original loaded file.
  data.slug = getSlugFromFile(file);
  data.file = "/" + file.split(/[\\/]/).slice(1).join("/");
  data.dir = "/" + file.split(/[\\/]/).slice(1, -1).join("/") + "/";

  // Get the genre of the game.
  data.genre =
    genres.find(({ games }) => games.find((game) => game === data.slug))
      ?.name || "Uncategorized";

  if (data.thumbnail) {
    // Get the absolute path to thumbnail.
    data.thumbnail =
      "/" + relative("public", join(dirname(file), data.thumbnail));
  } else {
    if (data.name) {
      // Use the game's thumbnail by default...
      data.thumbnail = `/images/games/${data.name}.png`;
    } else {
      // ...or a generic default thumbnail
      data.thumbnail = "/favicons/share-thumbnail.png";
    }
  }

  // Return desired info.
  return { content, ...data };
};

// Make a serialized file for the MDX renderer.
const serializeMdx = async ({ content, ...rest }) => {
  const source = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  });
  return { ...rest, content, source };
};

// Get the slug from filename or parent directory.
const getSlugFromFile = (file) => {
  const filename = basename(file, extname(file));
  const parentFolderName = basename(dirname(file));
  if (filename === "index") return parentFolderName;
  else return filename;
};

const getMediaDimensionsFromDir = async (directory) => {
  // Get dimensions of image files.
  const mediaFiles = glob.sync(
    `${directory}/**/*.@(jpg|jpeg|png|svg|mp4|mov|)`
  );

  function getDimensions(fileName) {
    const fileExtension = fileName.split(".").reverse()[0];
    const type = {
      jpg: "image",
      jpeg: "image",
      png: "image",
      svg: "image",
    }[fileExtension];

    return new Promise((resolve) => {
      // In the future, it would also be valuable to get the dimensions of
      // videos, but that seems a bit tricky to get working, so for now
      // it's images only. (video dimensions will be determined on the
      // client side whenever the video actually loads).
      if (type === "image") {
        sizeOfImage(fileName, (dims) => {
          resolve(dims || null);
        });
      } else {
        resolve(null);
      }
    });
  }

  let dimensionsMap = {};

  await Promise.all(
    mediaFiles.map((fileName) =>
      getDimensions(fileName).then((dims) => {
        if (dims) {
          dimensionsMap[fileName.slice(6)] = dims;
        }
      })
    )
  );

  return dimensionsMap;
};

// Search for the local location of page file and return an array of results.
const searchPageFile = (slug) =>
  glob.sync(`public/content/${slug || "!(index)*"}.mdx`);

// Local location of every page file.
const pageFiles = searchPageFile();

// Get URL paths of page files.
export const pagePaths = pageFiles.map(
  (path) => "/" + basename(path, extname(path))
);

// Search for the local location of the game file and return an array of results.
const searchGameFile = (slug) => [
  ...glob.sync(`public/content/games/*/${slug || "*"}/index.mdx`),
  ...(process.env.NODE_ENV !== "production"
    ? glob.sync(`public/content/games/${slug || "!(index)*"}.mdx`)
    : []),
];

// Local location of every game file.
const gameFiles = searchGameFile();

// Get URL paths of game files.
export const gamePaths = gameFiles
  .map(getSlugFromFile)
  .map((path) => "/games/" + path);

// Metadata for every game with frontmatter.
export const gameMeta = gameFiles
  .map(parseMdx)
  .map(({ content, ...rest }) => rest)
  .sort((b, a) => new Date(a.date) - new Date(b.date));

const searchBlogFile = (slug) =>
  glob.sync(`public/content/blog/${slug || "*"}/index.mdx`);

const blogFiles = searchBlogFile();

export const blogPaths = blogFiles
  .map(getSlugFromFile)
  .map((slug) => `/blog/${slug}`);

export const blogMeta = blogFiles
  .map(parseMdx)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// Get the desired props for pages.
export const pageProps = async (slug) => {
  const file = searchPageFile(slug)[0];
  const props = await serializeMdx(parseMdx(file));
  props.games = gameMeta;
  props.blogPosts = blogMeta;
  return { props };
};

// Get the desired props for games.
export const gameProps = async (slug) => {
  const file = searchGameFile(slug)[0];
  const props = await serializeMdx(parseMdx(file));
  props.mediaDimensions = await getMediaDimensionsFromDir(dirname(file));
  props.games = gameMeta;
  props.blogPosts = blogMeta;
  return { props };
};

// Get the desired props for blog posts.
export const blogProps = async (slug) => {
  const file = searchBlogFile(slug)[0];
  const props = await serializeMdx(parseMdx(file));
  props.mediaDimensions = await getMediaDimensionsFromDir(dirname(file));
  props.games = gameMeta;
  props.blogPosts = blogMeta;
  return { props };
};
