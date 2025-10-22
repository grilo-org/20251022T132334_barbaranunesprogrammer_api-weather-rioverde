"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traduzirFaseLua = void 0;
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
            return fase; // Retorna original se não encontrar tradução
    }
}
exports.traduzirFaseLua = traduzirFaseLua;
