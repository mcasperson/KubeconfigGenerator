FROM node:11
EXPOSE 3000
ADD index.js index.js
CMD [ "node", "index.js" ]