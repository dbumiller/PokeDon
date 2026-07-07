# FROM node:11-alpine
# COPY package.json ./
# RUN  npm install
# RUN  npm run seed
# COPY . .
# CMD ["npm", "start"]
# EXPOSE 3000

# FROM node:20-slim AS builder
# COPY package.json ./
# RUN npm install
# COPY . .
#
# FROM node:11-slim AS runner
# COPY --from=builder /app /app
# EXPOSE 3000
# COPY . .
# CMD ["npm", "start"]
#
# FROM node:20-slim AS seeder
# COPY --from=builder /app /app
# CMD ["run", "seed"]



#FROM node:11-slim
#WORKDIR /app
#COPY package*.json ./
#COPY node_modules ./node_modules
#COPY seasonFourReg.json ./
#COPY . .
#
#EXPOSE 3000
#CMD ["npm", "start"]

# Stage 1: Build and compile
FROM node:22-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Copy your specific project directories
COPY tsconfig.json ./
COPY server/ ./server
COPY db/ ./db
COPY seasonFourReg.json ./

RUN npm run build
RUN npm prune  -- production

# Stage 2: Runtime
FROM node:22-alpine as runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/seasonFourReg.json ./

USER node
EXPOSE 3000

# Execute the compiled server entry point
CMD ["node", "dist/server/index/js"]