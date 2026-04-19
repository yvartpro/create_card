import dotenv from 'dotenv';
import { User, sequelize } from './models/index.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    // Ensure schemas are created
    await sequelize.sync();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminName = process.env.ADMIN_NAME || 'Super Admin';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });

    if (existingAdmin) {
      console.log(`Admin user ${adminEmail} already exists. Skipping.`);
      process.exit(0);
    }

    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });

    console.log(`Admin user created securely with email: ${admin.email}`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
