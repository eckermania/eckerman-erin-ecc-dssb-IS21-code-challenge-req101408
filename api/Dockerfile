FROM node:18-alpine
WORKDIR /eckerman-erin-ecc-dssb-IS21-code-challenge-req101408
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
