from node:14.6.0-alpine3.10 as build-env

USER root

ENV APPUSER node_user
# Prepare environment
ENV MY_HOME /opt/app
RUN mkdir -p $MY_HOME
ENV PATH $MY_HOME/bin:$PATH


ENV LD_LIBRARY_PATH /lib64
RUN apk add --update libc6-compat
RUN apk add --virtual build-dependencies \
    build-base \
    gcc
WORKDIR $MY_HOME

ENV PATH $MY_HOME:/usr/local/bin:$PATH
COPY package.json .
RUN npm install --prod
COPY ./ ./

from node:14.6.0-alpine3.10 
ENV APPUSER node_user
# Prepare environment
ENV MY_HOME /opt/app
RUN mkdir -p $MY_HOME
ENV PATH $MY_HOME/bin:$PATH

ENV LD_LIBRARY_PATH /lib64
RUN apk add --update libc6-compat

RUN addgroup -S $APPUSER && adduser -D -S -H -G $APPUSER -h $MY_HOME $APPUSER
WORKDIR $MY_HOME

COPY --from=build-env $MY_HOME ./
RUN chown -R ${APPUSER}:${APPUSER} $MY_HOME

ENV PATH $MY_HOME:/usr/local/bin:$PATH
EXPOSE 3000
CMD ["npm","start"]