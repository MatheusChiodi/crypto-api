# Crypto API

Crypto API is a Node.js-based REST API that provides real-time cryptocurrency data, including price tracking, historical market trends, currency conversion, and user-defined alerts.

## Technologies Used

- Node.js
- Express
- Axios
- Body-Parser

## Installation

To install and run the project locally, follow these steps:

1. Clone this repository:
   ```sh
   git clone https://github.com/your-username/crypto-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd crypto-api
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   node index.js
   ```
   The server will run on port **3000**.

## Endpoints

### 1. Get List of Cryptocurrencies

**GET /coins**

Returns a list of available cryptocurrencies.

**Example Response:**

```json
{
  "available_coins": ["bitcoin", "ethereum", "dogecoin"]
}
```

### 2. Get Cryptocurrency Prices

**POST /coins/prices**

**Request Parameters:**

```json
{
  "coins": ["bitcoin", "ethereum"],
  "baseCurrency": "usd"
}
```

**Example Response:**

```json
{
  "prices": {
    "bitcoin": { "usd": 50000, "usd_24h_change": -2.5 },
    "ethereum": { "usd": 3000, "usd_24h_change": 1.2 }
  }
}
```

### 3. Get Historical Data

**GET /coins/history/:coin?days=30**

Fetches the historical price data for the specified cryptocurrency.

**Example Response:**

```json
{
  "coin": "bitcoin",
  "history": [
    [1700000000000, 50000],
    [1700100000000, 51000]
  ]
}
```

### 4. Set Price Alert

**POST /alerts**

**Request Parameters:**

```json
{
  "coin": "bitcoin",
  "target_price": 45000,
  "email": "user@email.com"
}
```

**Response:**

```json
{
  "status": "Alert created",
  "coin": "bitcoin",
  "target_price": 45000
}
```

### 5. Manage Favorite Coins

**POST /favorites**

**Request Parameters:**

```json
{
  "user_id": "12345",
  "coins": ["bitcoin", "ethereum"]
}
```

**Response:**

```json
{
  "status": "Favorites updated",
  "favorites": ["bitcoin", "ethereum"]
}
```

### 6. Retrieve Favorite Coins

**GET /favorites/:user_id**

Returns the favorite cryptocurrencies for a user.

**Example Response:**

```json
{
  "user_id": "12345",
  "favorites": ["bitcoin", "ethereum"]
}
```

### 7. Compare Cryptocurrency Prices

**POST /compare**

**Request Parameters:**

```json
{
  "coins": ["bitcoin", "ethereum"]
}
```

**Response:**

```json
{
  "comparison": {
    "bitcoin": { "usd": 50000 },
    "ethereum": { "usd": 3000 }
  }
}
```

## Contribution

Feel free to contribute to this project! To do so:

1. Fork the repository.
2. Create a branch for your changes: `git checkout -b my-change`
3. Commit your changes: `git commit -m "My improvement"`
4. Push to the branch: `git push origin my-change`
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

If you need any modifications or improvements to the documentation, just let me know!
