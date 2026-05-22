FROM node:18-alpine

WORKDIR /app

RUN npm install -g prisma

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]