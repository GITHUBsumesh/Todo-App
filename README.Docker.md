# Basic stop (preserves containers)
docker-compose -f docker-compose.dev.yml down

# Stop and remove containers, networks
docker-compose -f docker-compose.dev.yml down --remove-orphans

# Full cleanup (containers + volumes)
docker-compose -f docker-compose.dev.yml down -v

# Start with logs in foreground
docker-compose -f docker-compose.dev.yml up

# Start in detached mode (background)
docker-compose -f docker-compose.dev.yml up -d

# Force rebuild images
docker-compose -f docker-compose.dev.yml up --build

# Start specific services
docker-compose -f docker-compose.dev.yml up client api

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# List running containers
docker ps

# Check container status
docker-compose -f docker-compose.dev.yml ps