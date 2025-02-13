#!/bin/bash

# EyesOffCR.org Deployment Script
# Based on the deflock.me project

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print colored status messages
print_status() {
    echo -e "${GREEN}[+]${NC} $1"
}

print_error() {
    echo -e "${RED}[!]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[*]${NC} $1"
}

# Check if script has sudo privileges
if ! [ $(id -u) = 0 ]; then
    print_error "Please run with sudo"
    exit 1
fi

# Clean any previous builds
print_status "Cleaning previous builds..."
rm -rf dist

# Install dependencies
print_status "Installing dependencies..."
sudo -u $SUDO_USER npm install

# Build the site
print_status "Building site..."
sudo -u $SUDO_USER NODE_ENV=production npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed!"
    exit 1
fi

# Build CSS
print_status "Building CSS..."
sudo -u $SUDO_USER npx tailwindcss -i ./src/css/styles.css -o ./dist/assets/main.css

# Show what we're replacing
print_status "Current contents of /var/www/eyesoffcr:"
ls -la /var/www/eyesoffcr/

# Deploy the built site
print_status "Deploying built files..."
rm -rf /var/www/eyesoffcr/*

# Create necessary directories
print_status "Creating deployment directories..."
mkdir -p /var/www/eyesoffcr

# Copy the built files
print_status "Copying production build..."
cp -r dist/* /var/www/eyesoffcr/

# Copy additional resources
print_status "Copying additional resources..."
cp -r downloads /var/www/eyesoffcr/

# Copy server files
print_status "Setting up Express server..."
cp server.js /var/www/eyesoffcr/
cp package.json /var/www/eyesoffcr/
cp package-lock.json /var/www/eyesoffcr/

# Install production dependencies
print_status "Installing production dependencies..."
cd /var/www/eyesoffcr
npm install --omit=dev

# Set up systemd service
print_status "Setting up systemd service..."
cat > /etc/systemd/system/eyesoffcr.service << EOL
[Unit]
Description=EyesOffCR.org Web Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/eyesoffcr
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/node server.js
Restart=always

[Install]
WantedBy=multi-user.target
EOL

# Set permissions
print_status "Setting permissions..."
chown -R www-data:www-data /var/www/eyesoffcr
chmod -R 755 /var/www/eyesoffcr

# Restart the service
print_status "Restarting service..."
systemctl daemon-reload
systemctl restart eyesoffcr
systemctl enable eyesoffcr

print_status "Done! Current contents of /var/www/eyesoffcr:"
ls -la /var/www/eyesoffcr/

print_status "Verifying deployment..."
if [ ! -f "/var/www/eyesoffcr/assets/main.css" ]; then
    print_error "CSS file missing in deployment!"
    exit 1
fi

print_status "Deployment complete!"
print_warning "Don't forget to verify the site is working at https://eyesoffcr.org"
print_warning "Check that the blog is accessible at https://eyesoffcr.org/blog/"
print_warning "Verify server status with: systemctl status eyesoffcr" 