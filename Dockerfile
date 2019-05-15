#FROM node:latest

FROM node:10.15.3-alpine

RUN mkdir -p /home/dog
WORKDIR /home/dog

COPY . /home/dog

RUN npm install

EXPOSE 5000

ENTRYPOINT ["npm", "run"]
CMD ["server"]

