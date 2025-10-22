"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateInRange = exports.isValidYMDDate = exports.isValidDate = exports.isValidDateFormat = exports.formatDateBR = void 0;
//formata a data em formato Br
function formatDateBR(dateInput) {
    let date;
    if (dateInput instanceof Date) {
        date = dateInput;
    }
    else if (typeof dateInput === 'string') {
        if (!isValidYMDDate(dateInput)) {
            return 'Data inválida';
        }
        date = new Date(dateInput);
    }
    else {
        return 'Data inválida';
    }
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
}
exports.formatDateBR = formatDateBR;
/**
 * Valida se a string está no formato YYYY-MM-DD.
 */
function isValidDateFormat(dateStr) {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}
exports.isValidDateFormat = isValidDateFormat;
/**
 * Valida se a data existe e corresponde ao formato.
 */
function isValidDate(dateStr) {
    const date = new Date(dateStr);
    return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateStr;
}
exports.isValidDate = isValidDate;
/**
 * Valida se a string está no formato e é uma data válida.
 */
function isValidYMDDate(dateStr) {
    return isValidDateFormat(dateStr) && isValidDate(dateStr);
}
exports.isValidYMDDate = isValidYMDDate;
/**
 * Verifica se a data está entre hoje e X dias à frente.
 */
function isDateInRange(dateStr, daysAhead = 3) {
    if (!isValidYMDDate(dateStr))
        return false;
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= daysAhead;
}
exports.isDateInRange = isDateInRange;
