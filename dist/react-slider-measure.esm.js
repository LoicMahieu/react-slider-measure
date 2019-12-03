import useComponentSize from '@rehooks/component-size';
import React, { useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import styled from 'styled-components';

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var colors = {
  bar: "#343454",
  tick: "#EDEEF2",
  grey: "#EDEEF2",
  active: "#5A2CC9"
};

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  color: ", ";\n  font-size: 18px;\n  margin: 0 5px;\n  position: relative;\n  text-align: center;\n  user-select: none;\n  width: 20px;\n  line-height: 1;\n  margin-top: 5px;\n\n  &:last-child {\n    ", " {\n      &::before,\n      &::after {\n        display: none;\n      }\n    }\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  position: relative;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  background-color: ", ";\n  border-radius: 99px;\n  bottom: -40px;\n  height: 30px;\n  left: 50%;\n  position: absolute;\n  transform: translateX(-50%);\n  width: 2px;\n\n  &::after {\n    ", "\n    right: -10px;\n  }\n\n  &::before {\n    ", "\n    right: -20px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var tickStyles = "\n  background-color: " + colors.tick + ";\n  border-radius: 99px;\n  bottom: 0;\n  content: \"\";\n  height: 15px;\n  position: absolute;\n  width: 2px;\n  z-index: 1;\n";
var Tick =
/*#__PURE__*/
styled.div(
/*#__PURE__*/
_templateObject(), colors.tick, tickStyles, tickStyles);
var Container =
/*#__PURE__*/
styled.div(
/*#__PURE__*/
_templateObject2());
var Item =
/*#__PURE__*/
styled.div(
/*#__PURE__*/
_templateObject3(), colors.grey, Tick);
var Measure =
/*#__PURE__*/
React.forwardRef(function (_ref, ref) {
  var steps = _ref.steps,
      value = _ref.value,
      _onClick = _ref.onClick,
      activeColor = _ref.activeColor;
  return React.createElement(Container, {
    ref: ref
  }, Array(steps).fill(0).map(function (number, i) {
    return React.createElement(Item, {
      key: i
    }, React.createElement("div", {
      onClick: function onClick() {
        return _onClick(i + 1);
      },
      style: {
        cursor: "pointer",
        transition: "all .2s",
        color: value === i + 1 ? activeColor || colors.active : colors.grey,
        transform: value === i + 1 ? "scale(1.3) translateY(-3px)" : "scale(1)"
      }
    }, i + 1), React.createElement(Tick, null));
  }));
});

function _templateObject2$1() {
  var data = _taggedTemplateLiteralLoose(["\n  background: ", ";\n  border-radius: 99px;\n  bottom: 0;\n  height: 30px;\n  left: 50%;\n  position: absolute;\n  width: 2px;\n  z-index: 99;\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  height: 63px;\n  overflow: hidden;\n  position: relative;\n\n  &::after {\n    background: transparent;\n    bottom: 0;\n    content: \"\";\n    cursor: ew-resize;\n    height: 30px;\n    left: 0;\n    position: absolute;\n    right: 0;\n    z-index: 100;\n  }\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var SliderContainer =
/*#__PURE__*/
styled.div(
/*#__PURE__*/
_templateObject$1());
var Bar =
/*#__PURE__*/
styled.div(
/*#__PURE__*/
_templateObject2$1(), function (p) {
  return p.activeColor ? p.activeColor : colors.active;
});

var interpolateTransform = function interpolateTransform(x, y) {
  return "translate3D(" + x + "px, " + y + "px, 0)";
};

var Slider = function Slider(_ref) {
  var steps = _ref.steps,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? 1 : _ref$value,
      onChange = _ref.onChange,
      activeColor = _ref.activeColor;
  var ref = useRef();
  var width = useComponentSize(ref).width;
  var stepWidth = width / steps;

  var _useSpring = useSpring(function () {
    return {
      xy: [0, 0]
    };
  }),
      xy = _useSpring[0].xy,
      set = _useSpring[1];

  var bind = useDrag(function (_ref2) {
    var down = _ref2.down,
        delta = _ref2.delta,
        _ref2$memo = _ref2.memo,
        memo = _ref2$memo === void 0 ? xy.getValue() : _ref2$memo;
    var x = delta[0] + memo[0];

    if (!down) {
      x = Math.min(0, Math.max(-1 * width, x));
      var newValue = Math.max(Math.round(x / stepWidth), (steps - 1) * -1);
      x = newValue * stepWidth;
      onChange(newValue * -1 + 1);
    }

    set({
      xy: [x, 0]
    });
    return memo;
  });
  useEffect(function () {
    if (width) {
      set({
        xy: [(value - 1) * stepWidth * -1, 0]
      });
    }
  }, [width, value, set, stepWidth]);
  return React.createElement(SliderContainer, Object.assign({}, bind()), React.createElement(animated.div, {
    style: {
      position: "absolute",
      top: 0,
      left: "50%",
      zIndex: 99,
      bottom: 0,
      marginLeft: -14,
      transform: xy.interpolate(interpolateTransform),
      marginTop: "auto"
    }
  }, React.createElement(Measure, {
    activeColor: activeColor,
    value: value,
    steps: steps,
    onClick: onChange,
    ref: ref
  })), React.createElement(Bar, {
    activeColor: activeColor
  }));
};

export { Slider };
//# sourceMappingURL=react-slider-measure.esm.js.map
