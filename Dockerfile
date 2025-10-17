# Use Node 22 as the base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy dependency files
COPY pnpm-lock.yaml ./
COPY package.json ./


# IMPORTANT: Do NOT bake secrets into the image via ARG or ENV.
# Provide secrets at CONTAINER RUNTIME using:
#  - `docker run -e KEY=VALUE ...`
#  - `--env-file .env.local` (ensure the file isn't committed)
#  - Docker Compose `env_file:` or Kubernetes/Swarm secrets

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the app code
COPY . .

# Expose the Next.js default port
EXPOSE 3000

# Run the development server
CMD ["pnpm", "dev"]
