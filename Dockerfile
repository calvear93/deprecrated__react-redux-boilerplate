###
###   REACT DOCKERFILE
###   Uses Node and NGINX.
###

# variables
ARG NODE=node:14.15.4-alpine3.10
ARG NGINX=nginx:1.19.6
ARG APP_DIR='/app'

##
## STAGE 1: Node setup
##
FROM ${NODE} AS builder

ARG APP_DIR
ARG ENV

# alpine security updates
RUN apk --no-cache -U upgrade

# working directory setup
WORKDIR ${APP_DIR}
COPY package*.json ${APP_DIR}
RUN npm install --no-optional
RUN npm cache clean --force
COPY . ${APP_DIR}
# builds the app
RUN npm run build:${ENV}

##
## STAGE 2: NGINX setup
##
FROM ${NGINX}

ARG APP_DIR

# sets NGINX
COPY --from=builder ${APP_DIR}'/build' '/usr/share/nginx/html'
# puts config file
COPY nginx.conf /etc/nginx/conf.d/default.conf

#EXPOSE 3000
