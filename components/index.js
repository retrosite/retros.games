import Accordion from "./Accordion";
import BlogPostList from "./BlogPostList";
import Clickable from "./Clickable";
import {
  DMCAForm,
  ContactFormReceivedMessage,
  SuggestionForm,
} from "./ContactForms";
import GameGallery from "./GameGallery";
import HomepageFeaturedContent, {
  HomepageFeaturedItem,
  HomepageFeaturedGame,
} from "./HomepageFeaturedContent";
import Section from "./Section";
import Tooltip from "./Tooltip";

// Components to automatically import into all .mdx files.
const components = {
  Accordion,
  BlogPostList,
  Clickable,
  DMCAForm,
  ContactFormReceivedMessage,
  SuggestionForm,
  GameGallery,
  HomepageFeaturedContent,
  HomepageFeaturedItem,
  HomepageFeaturedGame,
  Section,
  Tooltip,
};

export default components;
