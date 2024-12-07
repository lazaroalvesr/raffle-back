# Use full path to pg_isready if needed
until /usr/bin/pg_isready -h db -p 5432 -U "$DB_USER"; do
  echo "Waiting for database to be ready..."
  sleep 2
done

echo "Database is ready. Running Prisma migrations..."
npx prisma migrate deploy

# Start the application
node dist/main