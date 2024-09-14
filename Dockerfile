# SICOMP - Semana de Imersão em Computação
# Version: 1.0

# BUILD
# ----------------
  FROM node:18-alpine as builder

  # sets the working directory
  WORKDIR /tmp
  
  COPY package*.json ./
  
  ARG API_URL=api_url
  ARG SECRET_KEY=secret_key
  
  ENV VITE_API_URL=$API_URL
  ENV VITE_SECRET_KEY=$SECRET_KEY
  ENV NODE_ENV=production
  
  # install project dependencies
  RUN npm ci --omit=dev
  RUN npm install -g http-server --yes
  RUN npm cache clean --force
  
  # RUNNER (PRODUCTION)
  # ----------------
  FROM node:18-alpine as production
  
  WORKDIR /app
  
  # copy all files and directories from builder to runner
  COPY --from=builder /tmp/node_modules /app/node_modules
  COPY . .
  
  RUN npm run build --mode=production
  RUN chmod +x entrypoint.sh
  
  ENTRYPOINT ["./entrypoint.sh"]