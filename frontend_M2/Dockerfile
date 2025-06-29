FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

RUN npm install -g serve
EXPOSE 4830
CMD ["serve", "-s", "build", "-l", "4830"]