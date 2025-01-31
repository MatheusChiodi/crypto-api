# Crypto API

Crypto API é uma API desenvolvida em Node.js utilizando Express que permite consultar informações sobre criptomoedas, incluindo lista de moedas disponíveis, preços, histórico de mercado, cotação do dólar e funcionalidades para favoritos e alertas de preço.

## Tecnologias Utilizadas

- Node.js
- Express
- Axios
- Body-Parser

## Instalação

Para instalar e rodar o projeto localmente, siga os passos abaixo:

1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/crypto-api.git
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd crypto-api
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Inicie o servidor:
   ```sh
   node index.js
   ```
   O servidor será iniciado na porta **3000**.

## Endpoints

### 1. Obter lista de moedas
**GET /**

Retorna uma lista de criptomoedas disponíveis na API.

**Resposta de Exemplo:**
```json
{
  "moedas_disponiveis": ["bitcoin", "ethereum", "dogecoin"]
}
```

### 2. Obter preços de criptomoedas
**POST /precos**

**Parâmetros:**
```json
{
  "moedas": ["bitcoin", "ethereum"],
  "moedaBase": "usd"
}
```

**Resposta de Exemplo:**
```json
{
  "precos": {
    "bitcoin": { "usd": 50000, "usd_24h_change": -2.5 },
    "ethereum": { "usd": 3000, "usd_24h_change": 1.2 }
  }
}
```

### 3. Obter histórico de uma moeda
**GET /historico/:moeda?dias=30**

Obtém o histórico de preços da criptomoeda especificada.

**Resposta de Exemplo:**
```json
{
  "moeda": "bitcoin",
  "historico": [[1700000000000, 50000], [1700100000000, 51000]]
}
```

### 4. Criar um alerta de preço
**POST /alerta**

**Parâmetros:**
```json
{
  "moeda": "bitcoin",
  "preco_desejado": 45000,
  "email": "usuario@email.com"
}
```

**Resposta:**
```json
{
  "status": "Alerta criado",
  "moeda": "bitcoin",
  "preco_desejado": 45000
}
```

### 5. Adicionar moedas aos favoritos
**POST /favoritos**

**Parâmetros:**
```json
{
  "usuario_id": "12345",
  "moedas": ["bitcoin", "ethereum"]
}
```

**Resposta:**
```json
{
  "status": "Favoritos atualizados",
  "favoritos": ["bitcoin", "ethereum"]
}
```

### 6. Obter moedas favoritas
**GET /favoritos/:usuario_id**

Retorna as moedas favoritas do usuário.

**Resposta de Exemplo:**
```json
{
  "usuario_id": "12345",
  "favoritos": ["bitcoin", "ethereum"]
}
```

### 7. Comparar moedas
**POST /comparar**

**Parâmetros:**
```json
{
  "moedas": ["bitcoin", "ethereum"]
}
```

**Resposta:**
```json
{
  "comparacao": {
    "bitcoin": { "usd": 50000 },
    "ethereum": { "usd": 3000 }
  }
}
```

### 8. Obter cotação do dólar
**GET /cotacao**

Obtém a cotação do dólar em relação ao real.

**Resposta:**
```json
{
  "cotacao_dolar": 5.20
}
```

## Contribuição

Sinta-se à vontade para contribuir com melhorias para este projeto! Para isso:
1. Faça um fork do repositório.
2. Crie um branch para suas modificações: `git checkout -b minha-mudanca`
3. Commit suas alterações: `git commit -m "Minha melhoria"`
4. Faça um push para o branch: `git push origin minha-mudanca`
5. Abra um Pull Request.

## Licença

Este projeto está sob a licença MIT. Para mais informações, consulte o arquivo LICENSE.

---

Se precisar de alguma alteração ou melhorias na documentação, é só avisar!

