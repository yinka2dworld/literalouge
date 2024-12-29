import User from "../models/user.js"
import sequelize from "../utils/db.js";
import bcrypt from "bcrypt";

export const seedAdmin = async () =>{
try {
  const adminChecker = await User.findOne({ where:{email:'fawazmusty247@gmail.com'} });
    if (adminChecker) {
      console.log('Admin user already exists, skipping seed');
      return;
    }
const hashedPassword = await bcrypt.hash("abc123", bcrypt.genSaltSync()); 
const adminUser = {
  "username": "adeyinka",
  "fullName": "Ajibade Adeyinka",
  "phoneNumber": "07085812226",
  "email": "fawazmusty247@gmail.com",
  "password": hashedPassword,
  "role": "superAdmin"
};

await User.create(adminUser)
 await sequelize.close();
 console.log('Admin user seeded successfully');
 } catch (error) {
  console.error('Error seeding admin user')
} 
}
 