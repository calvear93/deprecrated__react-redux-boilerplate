###
###   REACT DOCKERFILE
###   Uses Node and NGINX.
###

# variables
ARG NODE=node:15.8.0
ARG NGINX=nginx:1.19.6-alpine
ARG APP_DIR='/app/'

##
## STAGE 1: Node setup
##
FROM ${NODE} AS builder

ARG APP_DIR
ARG ENV

# working directory setup
WORKDIR ${APP_DIR}
COPY package*.json ${APP_DIR}
RUN npm install --no-optional --force
COPY . ${APP_DIR}
# builds the app
RUN npm run build:${ENV}




##
## STAGE 2: NGINX setup
##
FROM ${NGINX}

ARG APP_DIR

# sets NGINX
COPY --from=builder ${APP_DIR}'build' '/usr/share/nginx/html'

# alpine security updates
RUN apk --no-cache -U upgrade

# puts config file
RUN rm /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/default.conf

#EXPOSE 3000
