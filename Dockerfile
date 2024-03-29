ARG NODE_VER

FROM node:${NODE_VER}

WORKDIR /home/node/app

CMD ["/bin/bash", "-c", "npm install && npm run dev" ]