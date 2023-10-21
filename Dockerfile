FROM node:16

WORKDIR /pdfy

COPY package.json /pdfy/

RUN npm install

COPY . /pdfy/

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "start"]