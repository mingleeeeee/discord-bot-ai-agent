FROM node:20-alpine AS runner
WORKDIR /app
EXPOSE 4000
ENV NODE_ENV "development"
RUN apk update && apk add git
RUN yarn global add tsx nodemon
CMD node watch.mjs & nodemon --enable-source-maps dist/index.js
