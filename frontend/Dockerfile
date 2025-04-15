# Étape 1 : Build de l'application
FROM node:20-alpine AS builder
WORKDIR /app

# ✅ Accept build-time environment variable
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# ✅ Install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# ✅ Copy rest of the project
COPY . .

# ✅ Inject dynamic .env for Vite build
RUN echo "VITE_API_URL=$VITE_API_URL" > .env

# ✅ Build your frontend app
RUN npm run build

# Étape 2 : Serveur Nginx optimisé
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# ✅ Clean default content
RUN rm -rf ./*

# ✅ Copy built app from previous stage
COPY --from=builder /app/dist ./

# ✅ Copy your custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ✅ Expose port
EXPOSE 80

# ✅ Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

