const Canvas = require("canvas");

function initializeCanvas(width=512, height=512) {
  // initializing canvas object
  const canvas = Canvas.createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const imageData = ctx.createImageData(width, height);

  return { canvas, ctx, imageData };
}

module.exports = { initializeCanvas };