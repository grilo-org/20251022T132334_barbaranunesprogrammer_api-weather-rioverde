"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const format_data_1 = require("../utils/format_data");
const traduction_moon_1 = require("../utils/traduction_moon");
const error_1 = require("../error/error");
function previsaoRioVerdeRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.get("/previsao/rioverde/:data", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { data } = req.params;
            const apiKey = process.env.WEATHER_API_KEY;
            // Validação de formato
            if (!(0, format_data_1.isValidDateFormat)(data)) {
                return res.status(400).send({ erro: "Formato de data inválido. Use YYYY-MM-DD." });
            }
            // Validação de existência
            if (!(0, format_data_1.isValidDate)(data)) {
                return res.status(400).send({ erro: "Data inválida." });
            }
            // Validação de range (hoje até 3 dias à frente)
            if (!(0, format_data_1.isDateInRange)(data, 3)) {
                return res.status(400).send({ erro: "A data deve estar entre hoje e até 3 dias à frente." });
            }
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Rio Verde GOias Brazil&dt=${data}&lang=pt&aqi=no`;
            try {
                const resposta = yield fetch(url);
                const dados = yield resposta.json();
                if (dados.error) {
                    const mensagem = (0, error_1.getWeatherApiError)(dados.error.code);
                    return res.status(400).send({ erro: mensagem });
                }
                const forecast = dados.forecast.forecastday[0];
                const dia = forecast.day;
                const astro = forecast.astro;
                const resultado = {
                    cidade: dados.location.name,
                    data: (0, format_data_1.formatDateBR)(new Date(data)),
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
                    fase_da_lua: (0, traduction_moon_1.traduzirFaseLua)(astro.moon_phase),
                    iluminacao_lua: astro.moon_illumination + "%",
                };
                res.send(resultado);
            }
            catch (erro) {
                res.status(500).send({ erro: "Erro ao buscar previsão futura." });
            }
        }));
    });
}
exports.default = previsaoRioVerdeRoutes;
