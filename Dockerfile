FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./nodejs/package.json /usr/src/app/

RUN npm install 
RUN npm install -g nodemon

COPY ./nodejs/ /usr/src/app

EXPOSE 2525
EXPOSE 5858

CMD [ "node", "index.js" ]