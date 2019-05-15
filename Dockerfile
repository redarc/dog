#FROM node:latest
#FROM hub.c.163.com/nce2/nodejs:0.12.2

#RUN mkdir -p /home/dog
#WORKDIR /home/dog

#COPY . /home/dog

#RUN npm install && cd client && npm install && cd ..

#EXPOSE 3000

#ENTRYPOINT ["npm", "run"]
#CMD ["start"]


FROM nginx:latest
COPY ./client/build /usr/share/nginx/html/
COPY ./deploy/default.conf /etc/nginx/conf.d/
