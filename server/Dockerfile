FROM node:18-bookworm-slim

WORKDIR /app

# First install nodemon GLOBALLY in the container
RUN npm install -g nodemon

# Then install project dependencies
COPY package*.json ./
RUN npm install --include=dev  # Include dev dependencies

COPY . .

EXPOSE 4000
CMD ["npm", "run", "dev"]