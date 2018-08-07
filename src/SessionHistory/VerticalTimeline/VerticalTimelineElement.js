import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const VerticalTimelineElement = ({
  id,
  children,
  icon,
  iconStyle,
  iconOnClick,
  date,
  position,
  style,
  className
}) => (
  <div
    id={id}
    className={classNames(className, "vertical-timeline-element", {
      "vertical-timeline-element--left": position === "left",
      "vertical-timeline-element--right": position === "right",
      "vertical-timeline-element--no-children": children === ""
    })}
    style={style}
  >
    <div>
      {/* eslint-disable */}
      <span
        style={iconStyle}
        onClick={iconOnClick}
        className={`vertical-timeline-element-icon ${"bounce-in"}`}
      >
        {/* eslint-disable */}
        {icon}
      </span>
      <div className={`vertical-timeline-element-content ${"bounce-in"}`}>
        {children}
        <span className="vertical-timeline-element-date">{date}</span>
      </div>
    </div>
  </div>
);

VerticalTimelineElement.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  icon: PropTypes.element,
  iconStyle: PropTypes.shape({}),
  iconOnClick: PropTypes.func,
  style: PropTypes.shape({}),
  date: PropTypes.string,
  position: PropTypes.string
};

VerticalTimelineElement.defaultProps = {
  id: "",
  children: "",
  className: "",
  icon: null,
  iconStyle: null,
  style: null,
  date: "",
  position: "",
  iconOnClick: null
};

export default VerticalTimelineElement;
