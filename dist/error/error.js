"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherApiError = exports.weatherApiErrors = void 0;
exports.weatherApiErrors = {
    1002: { httpStatus: 401, message: 'Chave de API não fornecida.' },
    1003: { httpStatus: 400, message: "Parâmetro 'q' não fornecido." },
    1005: { httpStatus: 400, message: 'O URL da solicitação de API é inválido.' },
    1006: { httpStatus: 400, message: "Nenhum local encontrado correspondente ao parâmetro 'q'." },
    2006: { httpStatus: 401, message: 'A chave de API fornecida é inválida.' },
    2007: { httpStatus: 403, message: 'A chave de API excedeu a cota de chamadas por mês.' },
    2008: { httpStatus: 403, message: 'A chave de API foi desativada.' },
    2009: { httpStatus: 403, message: 'A chave de API não tem acesso ao recurso. Verifique a página de preços para saber o que é permitido em seu plano de assinatura de API.' },
    9000: { httpStatus: 400, message: 'O corpo Json passado na solicitação em massa é inválido. Certifique-se de que é json válido com codificação utf-8.' },
    9001: { httpStatus: 400, message: 'O corpo Json contém muitos locais para solicitação em massa. Por favor, mantenha-o abaixo de 50 em uma única solicitação.' },
    9999: { httpStatus: 400, message: 'Erro interno do aplicativo.' },
};
function getWeatherApiError(code) {
    return exports.weatherApiErrors[code] || {
        httpStatus: 500,
        message: 'Erro desconhecido da WeatherAPI.',
    };
}
exports.getWeatherApiError = getWeatherApiError;
