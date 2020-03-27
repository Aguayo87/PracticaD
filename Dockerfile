FROM mhart/alpine-node:12
WORKDIR /app
RUN apk add python make g++ && \
    python -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip install --upgrade pip setuptools && \
    rm -vrf /var/cache/apk/*
RUN npm i -g typescript

RUN rm -rf package-lock.json 
RUN rm -rf node_modules
COPY package.json package.json
RUN npm i

COPY . ./
RUN npm run build-ts

FROM mhart/alpine-node:slim-12
WORKDIR /app
COPY --from=0 /app .
RUN apk add --no-cache dumb-init  && \
    rm -vrf /var/cache/apk/*
RUN apk add --no-cache tzdata
ENV TZ America/Mexico_City
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
