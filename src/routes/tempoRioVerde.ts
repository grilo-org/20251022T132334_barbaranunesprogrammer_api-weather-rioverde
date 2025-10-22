import { FastifyInstance } from "fastify";
import fetch from "node-fetch";
import { getWeatherApiError } from "../error/error"

export default async function tempoRioVerdeRoutes(server: FastifyInstance) {
  server.get('/tempo/rioverde', async (req, res) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Rio Verde GOias Brazil&lang=pt&aqi=no`;

    try {
      const resposta = await fetch(url);
      const dados: any = await resposta.json();

      if (dados.error) {
        const mensagem = getWeatherApiError(dados.error.code);
        return res.status(400).send({ erro: mensagem });
      }

      const resultado = {
        cidade: dados.location.name,
        regiao: dados.location.region,
        pais: dados.location.country,
        hora_local: dados.location.localtime,
        temperatura_c: dados.current.temp_c,
        sensacao_termica_c: dados.current.feelslike_c,
        umidade: dados.current.humidity,
        condicao: dados.current.condition.text,
        vento_kph: dados.current.wind_kph,
        direcao_vento: dados.current.wind_dir,
        pressao_mb: dados.current.pressure_mb,
        precipitacao_mm: dados.current.precip_mm,
        nebulosidade: dados.current.cloud,
        indice_uv: dados.current.uv,
        icone: dados.current.condition.icon
      };

      res.send(resultado);
    } catch (erro) {
      res.status(500).send({ erro: 'Erro ao buscar os dados climáticos.' });
    }
  });
}