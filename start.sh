#!/bin/bash
echo "Starting database via Docker..."
docker-compose up -d tradr-db

echo "Installing dependencies..."
yarn

echo "Initializing default database credentials in ./packages/backend/prisma/.env..."
echo "DB_URL=postgres://zane:tradrpassword@localhost:5432" > ./packages/backend/prisma/.env

pushd ./packages/backend

echo "Migrating database..."
yarn prisma migrate up --experimental

echo "Generating Prisma client..."
yarn generate

echo "Everything is ready!"
echo "You must manually run 'yarn dev' from ./packages/backend"
echo "and 'yarn start' from ./packages/web in another terminal"

exit 0