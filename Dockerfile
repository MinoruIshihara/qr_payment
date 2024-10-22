FROM node:18-alpine

WORKDIR /app

COPY ./qr_payment/package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]