import { FastifyInstance } from "fastify";
import fetch from "node-fetch";
import { traduzirFaseLua } from "../utils/traduction_moon.js";
import { formatDateBR } from "../utils/format_data";


export default async function moonRioVerdeRoutes(server: FastifyInstance) {
  server.get("/rioverde/moon", async (req, res) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const hoje = new Date();
  const dataISO = hoje.toISOString().split("T")[0];
  const url = `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=Rio Verde GOias Brazil&dt=${dataISO}&lang=pt`;

  try {
    const resposta = await fetch(url);
    const dados: any = await resposta.json();

    if (dados.error) {
      return res.status(400).send({ erro: dados.error.message });
    }

    const faseOriginal = dados.astronomy.astro.moon_phase;
    const faseTraduzida = traduzirFaseLua(faseOriginal);
    const dataFormatada = formatDateBR(hoje);

    res.send({
      cidade: dados.location.name,
      data: dataFormatada,
      fase_da_lua: faseTraduzida,
      iluminacao: dados.astronomy.astro.moon_illumination + "%"
    });
  } catch (erro) {
    res.status(500).send({ erro: "Erro ao buscar dados da lua." });
  }
});
}