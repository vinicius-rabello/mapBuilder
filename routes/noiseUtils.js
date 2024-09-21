const noisejs = require("noisejs");
const fs = require("fs");

// função que pega o valor do noise na coordenada (x,y)
function getNoiseValue(noise, x, y, scale, octaves, persistence, lacunarity) {
  let amplitude = 1;
  let frequency = 1;
  let noiseValue = 0;

  for (let i = 0; i < octaves; i++) {
    noiseValue +=
      amplitude * noise.perlin2(x * frequency * scale, y * frequency * scale);
    amplitude *= persistence;
    frequency *= lacunarity;
  }

  return noiseValue;
}

// this function checks the treshold and color values from a style json file and then maps
// the passed noise value to a color and changes the indexes corresponding to that pixel in the image
function mapNoiseValueToColor(
  index,
  value,
  imageData,
  style,
) {
  // check each threshold
  for (const [threshold, rgb] of Object.entries(style)) {
    if (value > threshold) {
      imageData.data[index] = rgb[0];
      imageData.data[index + 1] = rgb[1];
      imageData.data[index + 2] = rgb[2];
      imageData.data[index + 3] = 255;
      return;
    }
  }
}

// iterates over every pixel in image and then changes them to the corresponding color in style dict
function paintNoise(
  noise,
  scale,
  octaves,
  persistence,
  lacunarity,
  imageData,
  style,
  ctx
) {
  // changing each pixel in canvas to noise
  for (var x = 0; x < 512; x++) {
    for (var y = 0; y < 512; y++) {
      var value = getNoiseValue(
        noise,
        x / 100,
        y / 100,
        parseFloat(scale),
        parseFloat(octaves),
        parseFloat(persistence),
        parseFloat(lacunarity)
      );
      value = (value + 1) / 2;
      const index = (x + y * 512) * 4;
      mapNoiseValueToColor(index, value, imageData, style, x, y, 32, ctx);
    }
  }
}

function drawMap(
  canvas,
  ctx,
  imageData,
  scale = 0.6,
  octaves = 4,
  persistence = 0.5,
  lacunarity = 2,
  seed = 0,
  style_num = 1
) {
  // initializing noise object
  var noise = new noisejs.Noise(seed);

  // reading json file with thresh and color values
  const style = JSON.parse(
    fs.readFileSync(`./public/assets/style${style_num}.json`, "utf8")
  );
  paintNoise(
    noise,
    scale,
    octaves,
    persistence,
    lacunarity,
    imageData,
    style,
    ctx
  );
  ctx.putImageData(imageData, 0, 0);
  return canvas.toBuffer("image/png");
}

module.exports = { drawMap };
