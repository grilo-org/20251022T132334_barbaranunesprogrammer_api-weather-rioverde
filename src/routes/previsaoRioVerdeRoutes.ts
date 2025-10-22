import { FastifyInstance } from "fastify";
import { formatDateBR, isDateInRange, isValidDate, isValidDateFormat } from "../utils/format_data";
import { traduzirFaseLua } from "../utils/traduction_moon";
import { getWeatherApiError } from "../error/error";


export default async function previsaoRioVerdeRoutes(server: FastifyInstance) {
server.get("/previsao/rioverde/:data", async (req, res) => {
  const { data } = req.params as { data: string };
  const apiKey = process.env.WEATHER_API_KEY;

  // Validação de formato
  if (!isValidDateFormat(data)) {
    return res.status(400).send({ erro: "Formato de data inválido. Use YYYY-MM-DD." });
  }
  // Validação de existência
  if (!isValidDate(data)) {
    return res.status(400).send({ erro: "Data inválida." });
  }
  // Validação de range (hoje até 3 dias à frente)
  if (!isDateInRange(data, 3)) {
    return res.status(400).send({ erro: "A data deve estar entre hoje e até 3 dias à frente." });
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Rio Verde GOias Brazil&dt=${data}&lang=pt&aqi=no`;

  try {
    const resposta = await fetch(url);
    const dados: any = await resposta.json();

    if (dados.error) {
      const mensagem = getWeatherApiError(dados.error.code);
      return res.status(400).send({ erro: mensagem });
    }
    const forecast = dados.forecast.forecastday[0];
    const dia = forecast.day;
    const astro = forecast.astro;

    const resultado = {
      cidade: dados.location.name,
      data: formatDateBR(new Date(data)),
      max_temp_c: dia.maxtemp_c,
      min_temp_c: dia.mintemp_c,
      media_temp_c: dia.avgtemp_c,
      vento_kph: dia.maxwind_kph,
      umidade: dia.avghumidity,
      condicao: dia.condition.text,
      icone: dia.condition.icon,
      nascer_do_sol: astro.sunrise,
      por_do_sol: astro.sunset,
      nascer_da_lua: astro.moonrise,
      por_da_lua: astro.moonset,
      fase_da_lua: traduzirFaseLua(astro.moon_phase),
      iluminacao_lua: astro.moon_illumination + "%",
    };

    res.send(resultado);
  } catch (erro) {
    res.status(500).send({ erro: "Erro ao buscar previsão futura." });
  }
})
}
