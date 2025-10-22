"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_dotenv = __toESM(require("dotenv"));
var import_cors = __toESM(require("@fastify/cors"));
var import_static = __toESM(require("@fastify/static"));
var import_path = __toESM(require("path"));

// src/routes/tempoRioVerde.ts
var import_node_fetch = __toESM(require("node-fetch"));

// src/error/error.ts
var weatherApiErrors = {
  1002: { httpStatus: 401, message: "Chave de API n\xE3o fornecida." },
  1003: { httpStatus: 400, message: "Par\xE2metro 'q' n\xE3o fornecido." },
  1005: { httpStatus: 400, message: "O URL da solicita\xE7\xE3o de API \xE9 inv\xE1lido." },
  1006: { httpStatus: 400, message: "Nenhum local encontrado correspondente ao par\xE2metro 'q'." },
  2006: { httpStatus: 401, message: "A chave de API fornecida \xE9 inv\xE1lida." },
  2007: { httpStatus: 403, message: "A chave de API excedeu a cota de chamadas por m\xEAs." },
  2008: { httpStatus: 403, message: "A chave de API foi desativada." },
  2009: { httpStatus: 403, message: "A chave de API n\xE3o tem acesso ao recurso. Verifique a p\xE1gina de pre\xE7os para saber o que \xE9 permitido em seu plano de assinatura de API." },
  9e3: { httpStatus: 400, message: "O corpo Json passado na solicita\xE7\xE3o em massa \xE9 inv\xE1lido. Certifique-se de que \xE9 json v\xE1lido com codifica\xE7\xE3o utf-8." },
  9001: { httpStatus: 400, message: "O corpo Json cont\xE9m muitos locais para solicita\xE7\xE3o em massa. Por favor, mantenha-o abaixo de 50 em uma \xFAnica solicita\xE7\xE3o." },
  9999: { httpStatus: 400, message: "Erro interno do aplicativo." }
};
function getWeatherApiError(code) {
  return weatherApiErrors[code] || {
    httpStatus: 500,
    message: "Erro desconhecido da WeatherAPI."
  };
}

// src/routes/tempoRioVerde.ts
function tempoRioVerdeRoutes(server2) {
  return __async(this, null, function* () {
    server2.get("/tempo/rioverde", (req, res) => __async(null, null, function* () {
      const apiKey = process.env.WEATHER_API_KEY;
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Rio Verde GOias Brazil&lang=pt&aqi=no`;
      try {
        const resposta = yield (0, import_node_fetch.default)(url);
        const dados = yield resposta.json();
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
        res.status(500).send({ erro: "Erro ao buscar os dados clim\xE1ticos." });
      }
    }));
  });
}

// src/routes/moonRioVerde.ts
var import_node_fetch2 = __toESM(require("node-fetch"));

// src/utils/traduction_moon.ts
function traduzirFaseLua(fase) {
  switch (fase.toLowerCase()) {
    case "new moon":
      return "Lua Nova";
    case "waxing crescent":
      return "Crescente";
    case "first quarter":
      return "Quarto Crescente- entre Lua Nova e Lua Cheia";
    case "waxing gibbous":
      return "Gibosa Crescente - entre Lua Nova e Quarto Crescente";
    case "full moon":
      return "Lua Cheia";
    case "waning gibbous":
      return "Gibosa Minguante - entre Lua Cheia e Quarto Minguante";
    case "last quarter":
      return "Quarto Minguante";
    case "waning crescent":
      return "Minguante";
    default:
      return fase;
  }
}

// src/utils/format_data.ts
function formatDateBR(dateInput) {
  let date;
  if (dateInput instanceof Date) {
    date = dateInput;
  } else if (typeof dateInput === "string") {
    if (!isValidYMDDate(dateInput)) {
      return "Data inv\xE1lida";
    }
    date = new Date(dateInput);
  } else {
    return "Data inv\xE1lida";
  }
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
function isValidDateFormat(dateStr) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}
function isValidDate(dateStr) {
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateStr;
}
function isValidYMDDate(dateStr) {
  return isValidDateFormat(dateStr) && isValidDate(dateStr);
}
function isDateInRange(dateStr, daysAhead = 3) {
  if (!isValidYMDDate(dateStr)) return false;
  const date = new Date(dateStr);
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const diff = (date.getTime() - today.getTime()) / (1e3 * 60 * 60 * 24);
  return diff >= 0 && diff <= daysAhead;
}

// src/routes/moonRioVerde.ts
function moonRioVerdeRoutes(server2) {
  return __async(this, null, function* () {
    server2.get("/rioverde/moon", (req, res) => __async(null, null, function* () {
      const apiKey = process.env.WEATHER_API_KEY;
      const hoje = /* @__PURE__ */ new Date();
      const dataISO = hoje.toISOString().split("T")[0];
      const url = `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=Rio Verde GOias Brazil&dt=${dataISO}&lang=pt`;
      try {
        const resposta = yield (0, import_node_fetch2.default)(url);
        const dados = yield resposta.json();
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
    }));
  });
}

// src/routes/previsaoRioVerdeRoutes.ts
function previsaoRioVerdeRoutes(server2) {
  return __async(this, null, function* () {
    server2.get("/previsao/rioverde/:data", (req, res) => __async(null, null, function* () {
      const { data } = req.params;
      const apiKey = process.env.WEATHER_API_KEY;
      if (!isValidDateFormat(data)) {
        return res.status(400).send({ erro: "Formato de data inv\xE1lido. Use YYYY-MM-DD." });
      }
      if (!isValidDate(data)) {
        return res.status(400).send({ erro: "Data inv\xE1lida." });
      }
      if (!isDateInRange(data, 3)) {
        return res.status(400).send({ erro: "A data deve estar entre hoje e at\xE9 3 dias \xE0 frente." });
      }
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Rio Verde GOias Brazil&dt=${data}&lang=pt&aqi=no`;
      try {
        const resposta = yield fetch(url);
        const dados = yield resposta.json();
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
          iluminacao_lua: astro.moon_illumination + "%"
        };
        res.send(resultado);
      } catch (erro) {
        res.status(500).send({ erro: "Erro ao buscar previs\xE3o futura." });
      }
    }));
  });
}

// src/server.ts
import_dotenv.default.config();
var server = (0, import_fastify.default)({ logger: true });
server.register(import_cors.default, { origin: "*" });
server.register(import_static.default, {
  root: import_path.default.join(process.cwd(), "public"),
  prefix: "/"
  // Serve na raiz
});
server.get("/healthz", (request, reply) => __async(null, null, function* () {
  return { status: "ok" };
}));
server.register(tempoRioVerdeRoutes);
server.register(moonRioVerdeRoutes);
server.register(previsaoRioVerdeRoutes);
var PORT = Number(process.env.PORT) || 3333;
server.listen({ port: PORT, host: "0.0.0.0" }, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
