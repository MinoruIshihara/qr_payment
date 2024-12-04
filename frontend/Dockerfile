FROM node:18-alpine

WORKDIR /app

COPY ./qr_payment/package*.json ./

RUN npm install --legacy-peer-deps

COPY ./qr_payment .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]