import {
  Children,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import Clickable from "../Clickable";
import Markdownify from "../Markdownify";
import Link from "next/link";
import styles from "./index.module.scss";

HomepageFeaturedContent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function HomepageFeaturedContent({ title, subtitle="", children }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>
        <Markdownify>{subtitle}</Markdownify>
      </div>
      <div className={styles.featured}>
        <Carousel>{children}</Carousel>
      </div>
    </div>
  );
}

const FeaturedItemContext = createContext({ game: null });

HomepageFeaturedItem.propTypes = {
  game: PropTypes.string.isRequired,
  caption: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export function HomepageFeaturedItem({ game, caption, children, link="" }) {
  if(link == ""){
    link = `/games/${game}`
  }
  return (
    <FeaturedItemContext.Provider value={{ game }}>
      <div>
        {game && <div className={styles.itemButtons}>
          <Clickable
            link={`${link}`}
            text="Play"
            icon="fas fa-gamepad"
          />
        </div>}

        <figure className={styles.itemFigure}>
          {children}
          <figcaption className={styles.itemCaption}>
            <Link href={link}>
              <a>{caption}</a>
            </Link>
          </figcaption>
        </figure>
      </div>
    </FeaturedItemContext.Provider>
  );
}

HomepageFeaturedGame.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.number,
};

export function HomepageFeaturedGame({
  src,
  alt = "Homepage image",
  width = 1920,
}) {
  const gameRef = useRef();

  return (
      <a className={styles.gameLink}>
        <img
          ref={gameRef}
          className={styles.game}
          alt={alt}
          width={width}
          src={src}
        >
        </img>
      </a>
  );
}

const CarouselContext = createContext({ visible: false });

function Carousel({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideCount = Children.count(children);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? slideCount - 1 : currentIndex - 1
    );
  }, [slideCount]);

  const goToNext = useCallback(() => {
    setCurrentIndex((currentIndex) =>
      currentIndex === slideCount - 1 ? 0 : currentIndex + 1
    );
  }, [slideCount]);

  // Adjust the height to match the current slide.
  const slidesRef = useRef();
  const [currentHeight, setCurrentHeight] = useState(undefined);
  useEffect(() => {
    const updateHeight = () => {
      const currentSlide = slidesRef.current.children.item(currentIndex);
      const height = currentSlide.getBoundingClientRect().height;
      setCurrentHeight(height);
    };

    updateHeight();

    // Periodically update the height to prevent a whole host
    // of hard to track down bugs.
    const interval = setInterval(updateHeight, 200);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <div className={styles.carousel}>
      <button
        className={styles.arrowLeft}
        aria-label="Previous"
        onClick={goToPrevious}
        disabled={currentIndex === 0}
      >
        <i className="fas fa-angle-left" />
      </button>
      <div
        className={styles.slides}
        ref={slidesRef}
        style={{ maxHeight: currentHeight }}
      >
        {Children.map(children, (child, index) => {
          const translate = -100 * currentIndex;
          const visible = index === currentIndex;

          return (
            <CarouselContext.Provider value={{ visible }}>
              <div
                className={styles.slide}
                data-visible={visible}
                style={{
                  transform: `translateX(${translate}%)`,
                }}
              >
                {child}
              </div>
            </CarouselContext.Provider>
          );
        })}
      </div>
      <button
        className={styles.arrowRight}
        aria-label="Next"
        onClick={goToNext}
        disabled={currentIndex === slideCount - 1}
      >
        <i className="fas fa-angle-right" />
      </button>
    </div>
  );
}