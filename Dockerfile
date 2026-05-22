FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json backend/prisma ./backend/
RUN cd backend && npm install && npx prisma generate
COPY backend ./backend
RUN cd backend && npm run build
EXPOSE 3001
CMD ["node", "backend/dist/app.js"]