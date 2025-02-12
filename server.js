const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression
app.use(compression());

// Security headers including CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'", "https://deflock.me"],
        frameSrc: ["'self'", "https://deflock.me"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Cache control for static assets
const staticOptions = {
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      // HTML files - no cache
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
      // Static assets - cache for 1 week
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    }
  },
};

// Root directory for the site
const SITE_ROOT = process.env.NODE_ENV === 'production' ? '/var/www/eyesoffcr' : path.join(__dirname, 'dist');

// Serve static files from the appropriate directory
app.use(express.static(SITE_ROOT, staticOptions));

// Handle 404 errors
app.use((req, res, next) => {
  if (req.accepts('html')) {
    res.status(404).sendFile(path.join(SITE_ROOT, '404.html'));
    return;
  }
  res.status(404).json({ error: 'Not found' });
});

// Handle 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (req.accepts('html')) {
    res.status(500).sendFile(path.join(SITE_ROOT, '500.html'));
    return;
  }
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving files from: ${SITE_ROOT}`);
}); 