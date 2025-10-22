

//formata a data em formato Br
export function formatDateBR(dateInput: Date | string): string {
  let date: Date;

  if (dateInput instanceof Date) {
    date = dateInput;
  } else if (typeof dateInput === 'string') {
    if (!isValidYMDDate(dateInput)) {
      return 'Data inválida';
    }
    date = new Date(dateInput);
  } else {
    return 'Data inválida';
  }

  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

/**
 * Valida se a string está no formato YYYY-MM-DD.
 */
export function isValidDateFormat(dateStr: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

/**
 * Valida se a data existe e corresponde ao formato.
 */
export function isValidDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateStr;
}

/**
 * Valida se a string está no formato e é uma data válida.
 */
export function isValidYMDDate(dateStr: string): boolean {
  return isValidDateFormat(dateStr) && isValidDate(dateStr);
}

/**
 * Verifica se a data está entre hoje e X dias à frente.
 */
export function isDateInRange(dateStr: string, daysAhead = 3): boolean {
  if (!isValidYMDDate(dateStr)) return false;
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= daysAhead;
}