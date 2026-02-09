# Fleet Energy Ingestion Engine

High-scale energy telemetry ingestion system for Smart Meters and EV Fleet management.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker & Docker Compose (optional)

### Installation

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your database credentials
```

### Running with Docker (Recommended)

```bash
# Start PostgreSQL + Application
docker-compose up -d

# View logs
docker-compose logs -f app
```

### Running Locally

```bash
# Start PostgreSQL first
# Then run the app
npm run start:dev
```

## 📁 Project Structure

```
src/
├── config/
│   ├── database.config.ts    # PostgreSQL configuration
│   └── logger.config.ts       # Winston logger setup
├── modules/
│   ├── telemetry/            # Data ingestion endpoints
│   ├── analytics/            # Performance analytics
│   └── entities/             # TypeORM entities
├── main.ts                   # Application entry point
└── app.module.ts            # Root module
```

## 🔧 Configuration

Environment variables in `.env`:

```env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=fleet_energy_db
```

## 📊 Architecture

### Data Flow
```
Devices (10K+) → Ingestion API → Hot/Cold Storage → Analytics
```

### Storage Strategy
- **HOT Storage**: Current status (UPSERT)
- **COLD Storage**: Historical data (INSERT only)

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 API Endpoints

### Telemetry Ingestion
- `POST /v1/telemetry/meter` - Meter data
- `POST /v1/telemetry/vehicle` - Vehicle data

### Analytics
- `GET /v1/analytics/performance/:vehicleId` - 24h performance

## 🔍 Logging

Logs are stored in:
- `logs/combined.log` - All logs
- `logs/error.log` - Error logs only

## 🐳 Docker Commands

```bash
# Build and start
docker-compose up --build

# Stop services
docker-compose down

# View database
docker exec -it fleet_postgres psql -U postgres -d fleet_energy_db
```

## 📈 Performance

- Handles **14.4M records/day**
- **~167 inserts/second**
- Optimized with indexing and partitioning

## 🛠️ Development

```bash
# Start in watch mode
npm run start:dev

# Build for production
npm run build

# Start production
npm run start:prod
```

## 📦 Tech Stack

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL 15
- **ORM**: TypeORM
- **Logger**: Winston
- **Validation**: class-validator
# fei_api
