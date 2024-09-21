function updateValue(id) {
    document.getElementById(id + "Value").innerText = document.getElementById(id).value;
    generateNoise();
  }
  
  function generateNoise() {
    const scale = document.getElementById("scale").value;
    const octaves = document.getElementById("octaves").value;
    const persistence = document.getElementById("persistence").value;
    const lacunarity = document.getElementById("lacunarity").value;
    const seed = document.getElementById("seed").value;
    const style_num = document.getElementById("style").value;
    fetch(
      `/noise?scale=${scale}&octaves=${octaves}&persistence=${persistence}&lacunarity=${lacunarity}&seed=${seed}&style_num=${style_num}`
    )
      .then((response) => response.blob())
      .then((blob) => {
        const img = document.getElementById("map");
        const url = URL.createObjectURL(blob);
        img.src = url;
      })
      .catch((error) => {
        console.error("Error generating noise:", error);
      });
  }
  
  window.onload = generateNoise;  