# Postiz App

A social media management application built with modern web technologies. Postiz helps you schedule and manage social media posts across multiple platforms.

## Features

- Multi-platform social media posting
- Post scheduling and management
- Integration with various social media platforms
- Docker-based deployment for easy setup

## Tech Stack

- **Backend**: Node.js
- **Frontend**: Modern JavaScript framework
- **Database**: PostgreSQL (via Docker)
- **Containerization**: Docker & Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose installed
- Node.js (for local development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sidart10/postiz-app.git
cd postiz-app
```

2. Start the application using Docker Compose:
```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000` (or the configured port).

### Configuration

Configuration files are managed through environment variables. See `docker-compose.yml` for available settings.

## Project Structure

- `/apps` - Application modules
- `/libraries` - Shared libraries and utilities
- `docker-compose.yml` - Docker orchestration configuration

## Development

This project uses Docker for consistent development and deployment environments. All services are defined in `docker-compose.yml`.

### Available Commands

- Start services: `docker-compose up -d`
- Stop services: `docker-compose down`
- View logs: `docker-compose logs -f`
- Rebuild services: `docker-compose build`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.
