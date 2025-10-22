const BASE_URL = 'https://api-weather-rioverde-go.onrender.com';

async function buscarClima() {
  const resultadoEl = document.getElementById('resultado-clima');
  try {
    const resp = await fetch(`${BASE_URL}/tempo/rioverde`);
    if (!resp.ok) throw new Error(`Erro na requisição: ${resp.status}`);
    const dados = await resp.json();
    resultadoEl.textContent = JSON.stringify(dados, null, 2);
  } catch (e) {
    resultadoEl.textContent = 'Erro: ' + e.message;
  }
}

async function buscarEndpoint() {
  const resultadoEl = document.getElementById('resultado-exemplo');
  const caminho = document.getElementById('caminho-input').value.trim();
  try {
    const resp = await fetch(BASE_URL + caminho);
    if (!resp.ok) throw new Error('Erro ao buscar: ' + resp.status);
    const dados = await resp.json();
    resultadoEl.textContent = JSON.stringify(dados, null, 2);
  } catch (e) {
    resultadoEl.textContent = 'Erro: ' + e.message;
  }
}
async function buscarPrevisao() {
    const data = document.getElementById('data-previsao').value;
    if (!data) {
        document.getElementById('resultado-previsao').textContent = 'Escolha uma data!';
        return;
    }
    document.getElementById('resultado-previsao').textContent = 'Carregando...';
    try {
        const resp = await fetch(`${BASE_URL}/previsao/rioverde/${data}`);
        const dados = await resp.json();
        document.getElementById('resultado-previsao').textContent = JSON.stringify(dados, null, 2);
    } catch (e) {
        document.getElementById('resultado-previsao').textContent = 'Erro ao buscar previsão: ' + e;
    }
}
