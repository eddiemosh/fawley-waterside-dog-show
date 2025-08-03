# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the full source code
COPY . .

# Build the React app
ENV NODE_ENV=production
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:stable-alpine AS production

# Clean default nginx public folder
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app from the build stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Optional: Custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]