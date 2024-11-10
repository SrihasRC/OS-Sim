FROM node

COPY . /app
WORKDIR /app

RUN npm install -g pnpm esbuild
RUN pnpm install
EXPOSE 7005
CMD ["pnpm", "run", "dev"]
