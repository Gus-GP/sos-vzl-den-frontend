# Use an official Nginx image
FROM nginx:alpine

# Copy the production build to the Nginx document root
COPY dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]