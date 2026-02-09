# ⚡ Fleet Energy Ingestion

A high-performance system for ingesting and analyzing EV fleet telemetry.

## Steps to Start 

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Rajuk75/fei_api.git
    ```

2.  **Go to Directory**
    ```bash
    cd fie_api
    ```

3.  **Run with Docker**
    ```bash
    docker compose up --build
    ```
    *Wait for it to start. The API will be available at `http://localhost:3000`.*

---

## Testing the API

You can use Postman or `curl` to test.

### 1. Ingest Vehicle Data (DC)
**POST** `http://localhost:3000/v1/telemetry/vehicle`
```json
{
  "vehicleId": "EV-TEST-001",
  "soc": 85.5,
  "kwhDeliveredDc": 120.5,
  "voltage": 400,
  "current": 100,
  "temperature": 30,
  "speed": 0,
  "odometer": 5000,
  "location": {"latitude": 28.5, "longitude": 77.2}
}
```

### 2. Ingest Meter Data (AC)
**POST** `http://localhost:3000/v1/telemetry/meter`
```json
{
  "meterId": "METER-001",
  "energyConsumed": 140.0,
  "voltage": 230,
  "power": 11,
  "current": 48,
  "status": "charging",
  "timestamp": "2023-10-27T10:00:00Z"
}
```

### 3. Check Performance
**GET** `http://localhost:3000/v1/analytics/performance/EV-TEST-001`

---

## Tech Stack 
-   **PostgreSQL** (Database)
-   **Docker** (Containerization)

---

##  Architecture 

We made a few key decisions to make this system fast and scalable:

1.  **Dual Storage (Hot & Cold Store):**
    *   **Hot Store:** We keep a separate table just for the *latest* status. This makes checking "Current Status" instant, instead of searching millions of history records.
    *   **Cold Store:** We save *every single* data point in a history table for deep analysis later.

2.  **Efficient Analytics:**
    *   We use SQL aggregation to calculate efficiency (DC vs AC) directly in the database, avoiding slow loops in the code.

3.  **Dockerized:**
    *   The entire app and database run in containers, so it works on any machine without "it works on my machine" issues.
