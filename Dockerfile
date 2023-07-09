# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /eckerman-erin-ecc-dssb-IS21-code-challenge-req101408
COPY . .
RUN yarn install --production
CMD ["node", "server.js"]
EXPOSE 3000