FROM node:23-slim
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
