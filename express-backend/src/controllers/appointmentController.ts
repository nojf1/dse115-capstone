import { Request, Response } from "express";
import Appointment from "../models/appointments";
import Member from "../models/members";
import Stylist from "../models/stylists";
import Service from "../models/services";

// Get all appointments (admin only)
export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const appointments = await Appointment.findAll({
      include: [
        { model: Member, attributes: ['first_name', 'last_name', 'email'] },
        { model: Stylist, attributes: ['name'] },
        { model: Service, attributes: ['name', 'price'] }
      ]
    });

    res.status(200).json({
      message: "Appointments retrieved successfully",
      appointments,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Get member's appointments
export const getMemberAppointments = async (req: Request, res: Response) => {
  try {
    const memberId = req.user?.id;

    if (!memberId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const appointments = await Appointment.findAll({
      where: { member_id: memberId },
      include: [
        { model: Stylist, attributes: ['name'] },
        { model: Service, attributes: ['name', 'price'] }
      ]
    });

    res.status(200).json({
      message: "Appointments retrieved successfully",
      appointments,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Create appointment
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const memberId = req.user?.id;
    const { stylist_id, service_id, appointment_date } = req.body;

    if (!memberId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Validate required fields
    if (!stylist_id || !service_id || !appointment_date) {
      return res.status(400).json({ 
        message: "Stylist, service, and appointment date are required" 
      });
    }

    // Create appointment
    const newAppointment = await Appointment.create({
      member_id: memberId,
      stylist_id,
      service_id,
      appointment_date,
      status: 'Scheduled'
    });

    const appointmentWithDetails = await Appointment.findByPk(
      newAppointment.appointment_id,
      {
        include: [
          { model: Stylist, attributes: ['name'] },
          { model: Service, attributes: ['name', 'price'] }
        ]
      }
    );

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: appointmentWithDetails,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Update appointment
export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const memberId = req.user?.id;
    const { id } = req.params;
    const { appointment_date, status } = req.body;

    if (!memberId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user owns the appointment or is admin
    if (appointment.member_id !== memberId && !req.user?.isAdmin) {
      return res.status(403).json({ message: "Permission denied" });
    }

    // Update appointment
    await appointment.update({
      appointment_date: appointment_date || appointment.appointment_date,
      status: status || appointment.status
    });

    const updatedAppointment = await Appointment.findByPk(id, {
      include: [
        { model: Stylist, attributes: ['name'] },
        { model: Service, attributes: ['name', 'price'] }
      ]
    });

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Delete appointment
export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const memberId = req.user?.id;
    const { id } = req.params;

    if (!memberId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user owns the appointment or is admin
    if (appointment.member_id !== memberId && !req.user?.isAdmin) {
      return res.status(403).json({ message: "Permission denied" });
    }

    await appointment.destroy();

    res.status(200).json({
      message: "Appointment deleted successfully"
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};