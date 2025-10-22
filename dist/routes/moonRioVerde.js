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
const traduction_moon_js_1 = require("../utils/traduction_moon.js");
const format_data_1 = require("../utils/format_data");
function moonRioVerdeRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.get("/rioverde/moon", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const apiKey = process.env.WEATHER_API_KEY;
            const hoje = new Date();
            const dataISO = hoje.toISOString().split("T")[0];
            const url = `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=Rio Verde GOias Brazil&dt=${dataISO}&lang=pt`;
            try {
                const resposta = yield (0, node_fetch_1.default)(url);
                const dados = yield resposta.json();
                if (dados.error) {
                    return res.status(400).send({ erro: dados.error.message });
                }
                const faseOriginal = dados.astronomy.astro.moon_phase;
                const faseTraduzida = (0, traduction_moon_js_1.traduzirFaseLua)(faseOriginal);
                const dataFormatada = (0, format_data_1.formatDateBR)(hoje);
                res.send({
                    cidade: dados.location.name,
                    data: dataFormatada,
                    fase_da_lua: faseTraduzida,
                    iluminacao: dados.astronomy.astro.moon_illumination + "%"
                });
            }
            catch (erro) {
                res.status(500).send({ erro: "Erro ao buscar dados da lua." });
            }
        }));
    });
}
exports.default = moonRioVerdeRoutes;
