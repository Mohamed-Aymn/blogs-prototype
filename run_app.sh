#!/bin/bash

LARAVEL_APP_PATH="./blogs"
NODE_APP_PATH="./editor"

export APP_PORT=8000

# Spin up Laravel app
echo "Starting Laravel application..."
cd $LARAVEL_APP_PATH || { echo "Failed to change directory to $LARAVEL_APP_PATH"; exit 1; }
./vendor/bin/sail up -d || { echo "Failed to start Laravel application"; exit 1; }

echo "Building Laravel assets..."
./vendor/bin/sail npm run build || { echo "Failed to build Laravel assets"; exit 1; }

echo "Running Laravel migrations..."
./vendor/bin/sail artisan migrate || { echo "Failed to run Laravel migrations"; exit 1; }

cd - || { echo "Failed to return to the initial directory"; exit 1; }

# Spin up Node.js app
echo "Starting Node.js application..."
docker-compose -f $NODE_APP_PATH/docker-compose.yml up -d || { echo "Failed to start Node.js application"; exit 1; }

echo "All services started successfully."
