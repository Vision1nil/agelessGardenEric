import { NextApiRequest, NextApiResponse } from 'next';
import { registerRoutes } from './routes';

// For Vercel serverless functions
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const start = Date.now();
  const path = req.url || '';
  
  // Log the incoming request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  try {
    // Get the Express app with registered routes
    const app = await registerRoutes();
    
    // Handle the request using the Express app
    return new Promise<void>((resolve, reject) => {
      const { method, url, headers, body } = req;
      
      // Create a request handler that converts NextApiRequest to Express-like request
      const expressReq: any = {
        ...req,
        method: method || 'GET',
        url: url || '/',
        path: url?.split('?')[0] || '/',
        headers: headers || {},
        body: body || {},
        query: req.query || {},
        cookies: req.cookies || {},
        params: {},
        get: (name: string) => headers?.[name.toLowerCase()],
        header: (name: string) => headers?.[name.toLowerCase()]
      };

      // Create a response object that Express can understand
      const expressRes: any = {
        ...res,
        status: (statusCode: number) => {
          res.statusCode = statusCode;
          return expressRes;
        },
        json: (data: any) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return expressRes;
        },
        send: (data?: any) => {
          if (typeof data === 'object' && !Buffer.isBuffer(data)) {
            return expressRes.json(data);
          }
          if (data) {
            res.end(data);
          } else {
            expressRes.end(); // End the response
          }
          return expressRes;
        },
        end: (data?: any) => {
          if (data) {
            res.end(data);
          } else {
            res.end();
          }
          return expressRes;
        },
        setHeader: (name: string, value: string | string[]) => {
          res.setHeader(name, value);
          return expressRes;
        }
      };

      // Handle the request using Express
      app(expressReq, expressRes, (err?: any) => {
        if (err) {
          console.error('Error handling request:', err);
          if (!res.headersSent) {
            res.statusCode = err.status || 500;
            res.end(err.message || 'Internal Server Error');
          }
        }
      });
    });
  } catch (error) {
    console.error('Error in API handler:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

// For local development
if (process.env.NODE_ENV === 'development') {
  const express = require('express');
  const { setupVite, serveStatic } = require('./vite');
  const app = express();
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  (async () => {
    // Register routes
    const expressApp = await registerRoutes(app);
    
    // Setup Vite in development
    if (process.env.NODE_ENV === 'development') {
      await setupVite(expressApp);
    } else {
      expressApp.use(serveStatic());
    }
    
    // Start the server
    const PORT = process.env.PORT || 3000;
    expressApp.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })();
}
