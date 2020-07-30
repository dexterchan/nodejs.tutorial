FROM node:14.4.0-buster-slim as build-env

USER root

ENV APPUSER node_user
# Prepare environment
ENV MY_HOME /opt/app
RUN mkdir -p $MY_HOME
ENV PATH $MY_HOME/bin:$PATH
RUN groupadd --system --gid=9999 ${APPUSER} && \
    useradd --system --home-dir $MY_HOME --uid=9999 --gid=${APPUSER} ${APPUSER}
WORKDIR $MY_HOME

RUN chown -R ${APPUSER}:${APPUSER} $MY_HOME

ENV PATH $MY_HOME:/usr/local/bin:$PATH

RUN apt-get update \
    && apt-get -y install python openssl build-essential git \
    && apt-get -y clean
COPY package.json .
RUN npm install --prod
COPY ./ ./
RUN chown -R $APPUSER:$APPUSER $MY_HOME

FROM node:14.4.0-buster-slim
ENV APPUSER node_user
# Prepare environment
ENV MY_HOME /opt/app
RUN mkdir -p $MY_HOME
ENV PATH $MY_HOME/bin:$PATH
RUN groupadd --system --gid=9999 ${APPUSER} && \
    useradd --system --home-dir $MY_HOME --uid=9999 --gid=${APPUSER} ${APPUSER}
WORKDIR $MY_HOME

COPY --from=build-env $MY_HOME ./

ENV PATH $MY_HOME:/usr/local/bin:$PATH
EXPOSE 3000
CMD ["npm","start"]