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

# Stage 1: Build & Compile
FROM node:22-alpine AS builder
WORKDIR /app

# Install jq to allow command-line manipulation of JSON configurations
RUN apk add --no-cache jq

COPY package*.json ./

# Force inject "type": "module" directly into the manifest to unlock native ESM compilation
RUN jq '. + {type: "module"}' package.json > tmp.json && mv tmp.json package.json

RUN npm ci

# Force-create a perfectly formatted tsconfig.json file directly inside the container
RUN echo '{"compilerOptions":{"target":"ES2022","module":"NodeNext","moduleResolution":"NodeNext","outDir":"./dist","rootDir":"./","strict":true,"esModuleInterop":true,"skipLibCheck":true,"forceConsistentCasingInFileNames":true},"include":["server/**/*.ts"]}' > tsconfig.json

COPY server/ ./server
COPY db/ ./db
COPY seasonFourReg.json ./

RUN ./node_modules/.bin/tsc


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
CMD ["node", "dist/server/index.js"]