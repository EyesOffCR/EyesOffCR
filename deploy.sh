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
npm run clean

# Build the site
print_status "Building site..."
npm install
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed!"
    exit 1
fi

# Show what we're replacing
print_status "Current contents of /var/www/eyesoffcr:"
ls -la /var/www/eyesoffcr/

# Deploy the built site
print_status "Deploying built files..."
rm -rf /var/www/eyesoffcr/*

# Copy the main site files and assets
print_status "Copying main site files and assets..."
cp -r dist/* /var/www/eyesoffcr/

# Verify assets were copied
if [ ! -d "/var/www/eyesoffcr/assets" ]; then
    print_error "Assets directory missing in deployment!"
    exit 1
fi

# Copy the blog files
print_status "Copying blog files..."
mkdir -p /var/www/eyesoffcr/blog
cp -r blog/* /var/www/eyesoffcr/blog/

# Copy additional resources
print_status "Copying additional resources..."
cp -r downloads /var/www/eyesoffcr/

# Set permissions
print_status "Setting permissions..."
chown -R www-data:www-data /var/www/eyesoffcr
chmod -R 755 /var/www/eyesoffcr

print_status "Done! Current contents of /var/www/eyesoffcr:"
ls -la /var/www/eyesoffcr/

print_status "Verifying blog deployment..."
ls -la /var/www/eyesoffcr/blog/

print_status "Deployment complete!"
print_warning "Don't forget to verify the site is working at https://eyesoffcr.org"
print_warning "Check that the blog is accessible at https://eyesoffcr.org/blog/" 