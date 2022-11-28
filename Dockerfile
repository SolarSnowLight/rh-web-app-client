FROM node

WORKDIR /web-app-client

COPY package.json /web-app-client

RUN npm install 

COPY . .

ENV PORT 3000

EXPOSE ${PORT}

CMD ["npm", "start"]