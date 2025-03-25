FROM node:18-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --include=dev  # Include dev dependencies

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]