import app from './app.js';
import { sequelize } from './models/index.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync database (for production, use migrations instead of sync)
    await sequelize.sync({ force: false, alter: process.env.NODE_ENV === 'development' });
    console.log('Database synced successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
