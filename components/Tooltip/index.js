import {
  useState,
  useEffect,
  useRef,
  isValidElement,
  cloneElement,
  forwardRef,
  Children,
} from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { usePopper } from "react-popper";
import Markdownify from "../Markdownify";
import classNames from "./index.module.scss";

// Settings.
const placement = "top";
const delay = 100;

// Tooltip component that wraps around a target element (children) and displays
// a popup over it with content.
const Tooltip = forwardRef(({ content, children, ...rest }, ref) => {
  // Popper elements.
  const [target, setTarget] = useState(null);
  const [popper, setPopper] = useState(null);
  const [arrow, setArrow] = useState(null);

  // Open state.
  const [isOpen, setOpen] = useState(false);

  // Open delay timer.
  const timer = useRef();

  // Open tooltip.
  const open = () => {
    // Don't open if there's no content.
    if (!content) return;
    window.clearTimeout(timer?.current);
    timer.current = window.setTimeout(() => setOpen(true), delay);
  };

  // Close tooltip.
  const close = () => {
    window.clearTimeout(timer?.current);
    setOpen(false);
  };

  // Popper.js options.
  let options = {
    placement,
    modifiers: [
      { name: "computeStyles", options: { adaptive: false } },
      { name: "offset", options: { offset: [0, 10] } },
      { name: "arrow", options: { element: arrow, padding: 10 } },
    ],
  };

  // Get positioning from Popper.js.
  const { styles, attributes, forceUpdate } = usePopper(
    target,
    popper,
    options
  );
  // Nudge the tooltip 1px to left to avoid a Popper.js bug causing screen overflow.
  styles.popper.left = Number(styles.popper.left) - 1;

  // Update popper position when the content changes.
  useEffect(() => {
    if (forceUpdate) forceUpdate();
  }, [content, forceUpdate]);

  // Attach props to child.
  const props = {
    ...rest,
    onMouseEnter: open,
    onMouseLeave: close,
    onFocus: open,
    onBlur: close,
    ref: (el) => {
      setTarget(el);
      return ref;
    },
  };
  children = Children.map(children, (element, index) => {
    // Only attach props to first child.
    if (index > 0) return element;
    // If the child is a React element.
    if (isValidElement(element)) return cloneElement(element, props);
    // If the child is plain text.
    if (typeof element === "string") {
      return (
        <span
          {...props}
          tabIndex="0"
          className={
            classNames.span + (props.className ? ` ${props.className}` : "")
          }
        >
          {element}
        </span>
      );
    }
    // Otherwise, pass the child through untouched.
    return element;
  });

  // If the child no longer exists, close tooltip.
  if (!children) close();

  // If content is plain string, convert to markdown and wrap.
  if (typeof content === "string")
    content = (
      <div className={classNames.content}>
        <Markdownify>{content}</Markdownify>
      </div>
    );

  return (
    <>
      {children}
      {isOpen &&
        content &&
        createPortal(
          <div
            ref={setPopper}
            className={classNames.tooltip}
            style={{ ...styles.popper }}
            {...attributes.popper}
          >
            {content}
            <div
              ref={setArrow}
              className={classNames.arrow}
              style={styles.arrow}
            />
          </div>,
          document.body
        )}
    </>
  );
});

Tooltip.propTypes = {
  content: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default Tooltip;
