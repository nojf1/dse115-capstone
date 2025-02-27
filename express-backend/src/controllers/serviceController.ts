import { Request, Response } from "express";
import Service from "../models/services";

// Helper function to format service data
const formatServiceData = (service: any) => {
  return {
    ...service.toJSON(),
    price: Number(service.price)
  };
};

// Get all services
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll();
    
    // Format all services to ensure price is a number
    const formattedServices = services.map(formatServiceData);
    
    res.status(200).json({
      message: "Services retrieved successfully",
      services: formattedServices,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Get service by ID
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Service retrieved successfully",
      service: formatServiceData(service),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { name, description, price } = req.body;

    // Validate required fields
    if (!name || price === undefined) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    // Ensure price is stored as a number
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
      return res.status(400).json({ message: "Price must be a valid number" });
    }

    const newService = await Service.create({
      name,
      description,
      price: numericPrice,
    });

    res.status(201).json({
      message: "Service created successfully",
      service: formatServiceData(newService),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Update service (admin only)
export const updateService = async (req: Request, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { id } = req.params;
    const { name, description, price } = req.body;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Convert price to number if provided
    const numericPrice = price ? Number(price) : undefined;
    if (price !== undefined && isNaN(numericPrice!)) {
      return res.status(400).json({ message: "Price must be a valid number" });
    }

    await service.update({
      name: name || service.name,
      description: description || service.description,
      price: numericPrice || service.price,
    });

    res.status(200).json({
      message: "Service updated successfully",
      service: formatServiceData(service),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Delete service (admin only)
export const deleteService = async (req: Request, res: Response) => {
  try {
    // Check if user is admin
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { id } = req.params;
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await service.destroy();

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};
