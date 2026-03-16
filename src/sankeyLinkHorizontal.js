import {path as d3Path} from "d3-path";
import {linkHorizontal} from "d3-shape";

function horizontalSource(d) {
  return [d.source.x1, d.y0];
}

function horizontalTarget(d) {
  return [d.target.x0, d.y1];
}

export default function() {
  return linkHorizontal()
      .source(horizontalSource)
      .target(horizontalTarget);
}

/** @type {Function} [linkWidth=d => '0.9'] - A function to return a float to scale the link width. */
let linkWidth = () => 0.9;

/**
 * This function is a drop in replacement for d3.sankeyLinkHorizontal().
 * Except any accessors/options.
 * @param {Object} link - Link object.
 * @param {Number} link.y0 - y coordinate for the start of the link.
 * @param {Number} link.y1 - y coordinate for the end of the link.
 * @param {Number} link.width - Width of the link.
 * @param {Object} link.source - Source node object.
 * @param {Number} link.source.x1 - x coordinate for the start of the link.
 * @param {Object} link.target - Target node object.
 * @param {Number} link.target.x0 - x coordinate for the end of the link.
 **/
export function sankeyLinkPathHorizontal(link) {
  // Start and end of the link
  let sx1 = link.source.x1;
  let tx0 = link.target.x0 + 1;

  // All four outer corners of the link
  // where e.g. lsy0 is the upper corner of the link on the source side
  let lsy0 = link.y0 - (link.width / 2) * linkWidth(link);
  let lsy1 = link.y0 + (link.width / 2) * linkWidth(link);
  let lty0 = link.y1 - (link.width / 2) * linkWidth(link);
  let lty1 = link.y1 + (link.width / 2) * linkWidth(link);

  // Center (x) of the link
  let lcx = sx1 + (tx0 - sx1) / 2;

  // Define outline of link as path
  let path = d3Path();
  path.moveTo(sx1, lsy0);
  path.bezierCurveTo(lcx, lsy0, lcx, lty0, tx0, lty0);
  path.lineTo(tx0, lty1);
  path.bezierCurveTo(lcx, lty1, lcx, lsy1, sx1, lsy1);
  path.lineTo(sx1, lsy0);
  return path.toString();
}

/**
 * This function is a drop in replacement for d3.sankeyLinkVertical().
 * Except any accessors/options.
 * @param {Object} link - Link object.
 * @param {Number} link.y0 - y coordinate for the start of the link.
 * @param {Number} link.y1 - y coordinate for the end of the link.
 * @param {Number} link.width - Width of the link.
 * @param {Object} link.source - Source node object.
 * @param {Number} link.source.x1 - x coordinate for the start of the link.
 * @param {Object} link.target - Target node object.
 * @param {Number} link.target.x0 - x coordinate for the end of the link.
 **/
export function sankeyLinkPathVertical(link) {
  // Start and end of the link
  let sy1 = link.source.x1;
  let ty0 = link.target.x0 + 1;

  // All four outer corners of the link
  // where e.g. lsx0 is the right corner of the link on the source side
  let lsx0 = link.y0 - (link.width / 2) * linkWidth(link);
  let lsx1 = link.y0 + (link.width / 2) * linkWidth(link);
  let ltx0 = link.y1 - (link.width / 2) * linkWidth(link);
  let ltx1 = link.y1 + (link.width / 2) * linkWidth(link);

  // Center (y) of the link
  let lcy = sy1 + (ty0 - sy1) / 2;

  // Define outline of link as path
  let path = d3Path();
  path.moveTo(lsx0, sy1);
  path.bezierCurveTo(lsx0, lcy, ltx0, lcy, ltx0, ty0);
  path.lineTo(ltx1, ty0);
  path.bezierCurveTo(ltx1, lcy, lsx1, lcy, lsx1, sy1);
  path.lineTo(lsx0, sy1);
  return path.toString();
}
