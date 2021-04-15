FROM node:15.12.0-alpine3.13
RUN npm install -g webpack-cli
RUN npm install -g webpack
RUN npm install -g nodemon
RUN addgroup app && adduser -S -G app app
RUN mkdir /app && chown app:app /app
USER app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run compile
EXPOSE 3000
CMD [ "npm", "start" ]