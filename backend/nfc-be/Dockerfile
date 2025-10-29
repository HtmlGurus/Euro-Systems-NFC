# Base image with OpenSSL 1.1 support
FROM node:20-bullseye

# Install OpenSSL 1.1 (required for Prisma engine)
RUN apt-get update && \
    apt-get install -y openssl libssl1.1 ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy app code
COPY . .

# Generate Prisma client (no need for migrate in Dockerfile if you run it in docker-compose)
# RUN npx prisma generate

EXPOSE 3005
CMD ["npm", "run", "start"]