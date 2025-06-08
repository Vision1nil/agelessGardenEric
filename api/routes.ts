import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

type ExpressApp = Express & { _router?: any };

export async function registerRoutes(app?: Express): Promise<ExpressApp> {
  // If no app is provided, create a new one
  const expressApp = app || express();
  
  // Add JSON body parser middleware
  expressApp.use(express.json());
  
  // Contact form submission endpoint
  expressApp.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Store the contact message
      const message = await storage.createContactMessage(validatedData);
      
      // In a real implementation, you would send an email here
      // For now, we'll just return success
      res.status(201).json({ 
        success: true, 
        message: "Contact message received successfully. We will get back to you soon!",
        id: message.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to process contact form. Please try again." 
        });
      }
    }
  });

  // Get all contact messages (for admin purposes)
  expressApp.get("/api/contact", async (req: Request, res: Response) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contact messages" 
      });
    }
  });

  // Add a health check endpoint
  expressApp.get("/api/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  // Add a catch-all route for 404s
  expressApp.use((req: Request, res: Response) => {
    res.status(404).json({ 
      success: false, 
      message: "Route not found" 
    });
  });

  // Error handling middleware
  expressApp.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  });

  return expressApp;
}
