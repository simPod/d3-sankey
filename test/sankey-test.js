import * as d3 from "../src/index.js";
import assert from "assert";
import energyJson from "./energy.json" assert {type: "json"};
import energyNodes from "./energy-nodes.json" assert {type: "json"};
import energyLinks from "./energy-links.json" assert {type: "json"};

it("sankey(energy) returns the expected results", () => {
  var sankey = d3.sankey().nodeWidth(15).nodePadding(10).extent([[1, 1], [959, 494]]),
      energy = sankey(energyJson);
  assert.deepEqual(energy.nodes.map(nodePosition), energyNodes);
  assert.deepEqual(energy.links.map(linkPosition), energyLinks);
});

function nodePosition(node) {
  return {
    x: round(node.x0),
    dx: round(node.x1 - node.x0),
    y: round(node.y0),
    dy: round(node.y1 - node.y0)
  };
}

function linkPosition(link) {
  return {
    source: nodePosition(link.source),
    target: nodePosition(link.target),
    dy: round(link.width),
    sy: round(link.y0 - link.source.y0 - link.width / 2),
    ty: round(link.y1 - link.target.y0 - link.width / 2)
  };
}

function round(x) {
  return Math.round(x * 10) / 10;
}
