import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Member from "./members";
import Stylist from "./stylists";
import Service from "./services";

// Define interface for Appointment attributes
interface AppointmentAttributes {
  appointment_id?: number;
  member_id: number;
  stylist_id: number;
  service_id: number;
  appointment_date: Date;
  status?: 'Scheduled' | 'Completed' | 'Canceled';
  created_at?: Date;
}

// Extend Sequelize's Model class
class Appointment extends Model<AppointmentAttributes> implements AppointmentAttributes {
  public appointment_id!: number;
  public member_id!: number;
  public stylist_id!: number;
  public service_id!: number;
  public appointment_date!: Date;
  public status!: 'Scheduled' | 'Completed' | 'Canceled';
  public readonly created_at!: Date;
}

// Initialize the model
Appointment.init(
  {
    appointment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Member,
        key: 'member_id',
      },
    },
    stylist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Stylist,
        key: 'stylist_id',
      },
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Service,
        key: 'service_id',
      },
    },
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Scheduled', 'Completed', 'Canceled'),
      defaultValue: 'Scheduled',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "appointments",
    timestamps: false, // Since we're using created_at manually
  }
);

// Define associations
Appointment.belongsTo(Member, {
  foreignKey: 'member_id',
  onDelete: 'CASCADE',
});

Appointment.belongsTo(Stylist, {
  foreignKey: 'stylist_id',
  onDelete: 'SET NULL',
});

Appointment.belongsTo(Service, {
  foreignKey: 'service_id',
  onDelete: 'SET NULL',
});

export default Appointment;