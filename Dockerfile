# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY backend/package*.json ./backend/

# Install dependencies
RUN cd backend && npm install

# Copy project files
COPY . .

# Expose port
EXPOSE 8080

# Start server
CMD ["node", "backend/server.js"]