#!/bin/bash
# Database setup script for first-time deployment
# Run this after setting up your PostgreSQL database

echo "Setting up database..."

# Generate Prisma Client
npx prisma generate

# Create initial migration (if migrations don't exist)
if [ ! -d "prisma/migrations" ] || [ -z "$(ls -A prisma/migrations)" ]; then
  echo "Creating initial migration..."
  npx prisma migrate dev --name init
else
  echo "Running existing migrations..."
  npx prisma migrate deploy
fi

echo "Database setup complete!"

