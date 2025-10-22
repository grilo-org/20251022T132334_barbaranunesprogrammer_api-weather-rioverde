# API Pública - Clima e Lua de Rio Verde, GO

![Status](https://img.shields.io/badge/status-ativo-success)
![License](https://img.shields.io/badge/license-MIT-blue)

Bem-vindo! Esta é uma API pública e gratuita que fornece dados meteorológicos e astronômicos para a cidade de **Rio Verde, Goiás, Brasil**.

Obtenha facilmente informações como temperatura atual, previsão do tempo para os próximos dias e as fases da lua, sem a necessidade de chaves de autenticação.

## Base URL

Todas as requisições devem ser feitas para a seguinte URL base:

```
https://api-weather-rioverde-go.onrender.com/
```

## Autenticação e Limites

-   **Autenticação**: Não é necessária nenhuma chave de API ou autenticação. A API é totalmente pública.
-   **Limite de Requisições**: Existe um limite de **1000 requisições por dia por endereço de IP**. Se você precisar de um limite maior, por favor, entre em contato.

---

## Endpoints

A seguir estão os endpoints disponíveis na API.

### 1. Clima Atual

Retorna as condições meteorológicas atuais em Rio Verde.

-   **Método**: `GET`
-   **Endpoint**: `/tempo/rioverde`

**Exemplo de requisição com `curl`:**

```bash
curl -X GET https://api-weather-rioverde-go.onrender.com/tempo/rioverde
```

**Exemplo de resposta (JSON):**

```json
{
  "cidade": "Rio Verde",
  "temperatura": 29.5,
  "umidade": 45,
  "condicao": "Céu limpo",
  "vento_kph": 12.3,
  "icone": "//cdn.weatherapi.com/weather/64x64/day/113.png"
}
```

### 2. Fase da Lua Atual

Retorna a fase da lua atual e outros dados astronômicos para Rio Verde.

-   **Método**: `GET`
-   **Endpoint**: `/rioverde/moon`

**Exemplo de requisição com `curl`:**

```bash
curl -X GET https://api-weather-rioverde-go.onrender.com/rioverde/moon
```

**Exemplo de resposta (JSON):**

```json
{
  "cidade": "Rio Verde",
  "data": "07/08/2025",
  "fase_da_lua": "Quarto Crescente",
  "iluminacao": "55%"
}
```

### 3. Previsão do Tempo Futura

Retorna a previsão do tempo e dados astronômicos para uma data específica.

> **Nota**: A previsão está limitada a até **3 dias** à frente da data atual, devido às restrições do plano gratuito da WeatherAPI.

-   **Método**: `GET`
-   **Endpoint**: `/previsao/rioverde/:data`
-   **Parâmetro**: `data` (string) - A data desejada no formato `AAAA-MM-DD`.

**Exemplo de requisição com `curl`:**

```bash
curl -X GET https://api-climb-rioverde.onrender.com/previsao/rioverde/2025-08-10
```

**Exemplo de resposta (JSON):**

```json
{
  "cidade": "Rio Verde",
  "data": "10/08/2025",
  "max_temp_c": 31.0,
  "min_temp_c": 18.5,
  "media_temp_c": 25.0,
  "vento_kph": 15.6,
  "umidade": 60,
  "condicao": "Parcialmente nublado",
  "icone": "//cdn.weatherapi.com/weather/64x64/day/116.png",
  "nascer_do_sol": "06:10 AM",
  "por_do_sol": "06:45 PM",
  "nascer_da_lua": "07:00 PM",
  "por_da_lua": "05:50 AM",
  "fase_da_lua": "Lua Cheia",
  "iluminacao_lua": "98%"
}
```

## Fonte dos Dados

Os dados meteorológicos são fornecidos pela WeatherAPI.com.

## Contato

Desenvolvido por **Bárbara Nunes**.

-   [GitHub](https://github.com/barbaranunesprogrammer)
-   [LinkedIn](https://www.linkedin.com/in/barbaranunesprogrammer/)

