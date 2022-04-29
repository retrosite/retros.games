import styles from "./background.module.scss";

const cells = 40; // Width/height of grid in minor cells.
const major = 4; // Every this many minor cells becomes major.
const size = 50; // Size of cell in svg units.

const bound = (cells * size) / 2; // Grid boundary from origin.

// Minor grid lines.
const Minor = () => {
  const from = -cells / 2;
  const to = cells / 2;
  const h = [];
  const v = [];

  for (let i = from; i <= to; i++) {
    h.push(
      <line
        key={i}
        className={styles.line}
        x1={i * size}
        x2={i * size}
        y1={-bound}
        y2={bound}
      />
    );
    v.push(
      <line
        key={i}
        className={styles.line}
        x1={-bound}
        x2={bound}
        y1={i * size}
        y2={i * size}
      />
    );
  }

  return (
    <g fill="none" stroke="#355477" strokeWidth="2">
      <g>{h}</g>
      <g>{v}</g>
    </g>
  );
};

// Major grid lines.
const Major = () => {
  const from = -cells / major / 2;
  const to = cells / major / 2;
  const h = [];
  const v = [];

  for (let i = from; i <= to; i++) {
    h.push(
      <line
        key={i}
        className={styles.line}
        x1={major * i * size}
        x2={major * i * size}
        y1={-bound}
        y2={bound}
      />
    );
    v.push(
      <line
        key={i}
        className={styles.line}
        x1={-bound}
        x2={bound}
        y1={major * i * size}
        y2={major * i * size}
      />
    );
  }

  return (
    <g fill="none" stroke="#ed0696" strokeWidth="4">
      <g>{h}</g>
      <g>{v}</g>
    </g>
  );
};

// Grid visualization for the header.
const Background = () => (
  <div className={styles.background}>
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`-${bound} -${bound} ${bound * 2} ${bound * 2}`}
    >
      <Minor />
      <Major />
    </svg>
  </div>
);

export default Background;
