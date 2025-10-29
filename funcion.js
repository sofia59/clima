const API_KEY = "fab76acb4e92bb3931960dd5fda08f1d";

async function buscarClima() {
  const ciudad = document.getElementById("city").value.trim();
  if (!ciudad) return;
  
  try {
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${API_KEY}&units=metric&lang=es`
    );
    
    if (!resp.ok) throw new Error("Ciudad no encontrada");
    
    const datos = await resp.json();
    const { main, coord, weather } = datos;
    const temp = main.temp;
    const hum = main.humidity;
    const desc = weather[0].description;
  
    const respUV = await fetch(
      `https://api.openweathermap.org/data/2.5/uvi?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}`
    );
    const uvData = await respUV.json();
    const uv = uvData.value;
    
    document.getElementById("resultado").innerHTML = `
      <strong>${ciudad}</strong><br>
      Estado: ${desc}<br>
      🌡️ Temperatura: ${temp} °C<br>
      💧 Humedad: ${hum} %<br>
      ☀️ Índice UV: ${uv}
    `;
  } catch (err) {
    document.getElementById("resultado").textContent = "Error: " + err.message;
  }
}