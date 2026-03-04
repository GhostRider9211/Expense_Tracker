# server/Dockerfile
FROM node:18-alpine

WORKDIR /app

# install only production deps (faster)
COPY package*.json ./
RUN npm ci --only=production

# copy source
COPY . .

EXPOSE 5000

ENV NODE_ENV=production
# server.js is the entry as per package.json ("main": "server.js")
CMD ["node", "server.js"]