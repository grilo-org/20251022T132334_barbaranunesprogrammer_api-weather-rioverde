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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const error_1 = require("../error/error");
function tempoRioVerdeRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.get('/tempo/rioverde', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const apiKey = process.env.WEATHER_API_KEY;
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Rio Verde GOias Brazil&lang=pt&aqi=no`;
            try {
                const resposta = yield (0, node_fetch_1.default)(url);
                const dados = yield resposta.json();
                if (dados.error) {
                    const mensagem = (0, error_1.getWeatherApiError)(dados.error.code);
                    return res.status(400).send({ erro: mensagem });
                }
                const resultado = {
                    cidade: dados.location.name,
                    temperatura: dados.current.temp_c,
                    umidade: dados.current.humidity,
                    condicao: dados.current.condition.text,
                    vento_kph: dados.current.wind_kph,
                    icone: dados.current.condition.icon,
                };
                res.send(resultado);
            }
            catch (erro) {
                res.status(500).send({ erro: 'Erro ao buscar os dados climáticos.' });
            }
        }));
    });
}
exports.default = tempoRioVerdeRoutes;
