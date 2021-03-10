# ------------------------------------------------------------------------------
# Final Stage
# ------------------------------------------------------------------------------

FROM node:10-buster-slim

RUN useradd --shell /bin/sh -m --uid 1024 sfss

WORKDIR /home/sfss/
RUN mkdir -p /tmp/sfss && chown sfss:sfss /tmp/sfss

USER sfss
COPY src src
COPY package*.json /home/sfss/
RUN npm install

CMD ["node", "src/main.js"]
