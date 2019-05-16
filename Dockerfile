FROM node:10.15.3-alpine

RUN mkdir -p /home/dog
WORKDIR /home/dog
COPY . /home/dog

EXPOSE 5000

ENTRYPOINT ["npm", "--prefix=server","run"]
CMD ["server"]
