import { connectDB } from './connection.js';
import { Admin } from '../models/admin.model.js';
import { Department } from '../models/department.model.js';
import { Employee } from '../models/employee.model.js';

const setupIndexes = async () => {
  try {
    await connectDB();
    console.log('Connected to DB');

      await Admin.syncIndexes();
      await Department.syncIndexes();
      await Employee.syncIndexes();
    console.log('Indexes synced successfully');

    process.exit(0);
  } catch (error) {
    console.error('Failed to sync indexes:', error.message);
    process.exit(1);
  }
};

setupIndexes();
