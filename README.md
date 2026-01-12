# Cryptocurrency Market Analytics API

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kjlQ/crypto-history
cd test-assign
```

2. Install dependencies:

```bash
npm install
```

### Running the Application

#### Development Mode

```bash
npm start
```

The server will start on `http://localhost:3000` with auto-reload enabled via nodemon.

#### Run Tests

```bash
npm test
```

## API Documentation

### Get Market Analytics

Fetches and analyzes kline data for a specified cryptocurrency trading pair.

**Endpoint**: `GET /api/analytics`

**Query Parameters**:

```typescript
{
  symbol: string;
  interval: string;
  startTime: string;
  endTime: string;
}
```

**Example Request**:

```bash
curl "http://localhost:3000/api/analytics?symbol=BTCUSDT&interval=1h&startTime=1704067200000&endTime=1704153600000"
```

**Success Response** (200 OK):

```json
{
  "message": "success",
  "data": {
    "openPrices": 42150.5,
    "closePrices": 43280.75,
    "change": 1130.25,
    "changePercentage": 2.68,
    "dateOpen": "2024-01-01T00:00:00.000Z",
    "dateClose": "2024-01-02T00:00:00.000Z"
  },
  "meta": {
    "symbol": "BTCUSDT",
    "interval": "1h",
    "klines": 24
  }
}
```

#### Test Suite

1. **Valid Parameters Test**: Verifies successful response when all required parameters are valid
   - Tests with valid symbol, interval, startTime, and endTime
   - Mocks Binance API responses and analytics calculations

2. **Missing Parameters Test**: Validates proper error handling when required parameters are missing
   - Expected response: 400 Bad Request
   - Tests undefined symbol, interval, startTime, and endTime

3. **Invalid Time Parameters Test**: Checks validation of time parameter formats
   - Expected response: 400 Bad Request
   - Tests with non-numeric time values

4. **API Failure Test**: Ensures proper error handling when external API calls fail
   - Expected response: 500 Internal Server Error
   - Simulates Binance API failures
