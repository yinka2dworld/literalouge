import User from "../models/user.js"
import bcrypt from "bcrypt";

export const seedAdmin = async () =>{
try {
  const adminChecker = await User.findOne({ where: { email: 'test@example.com' } });
    if (adminChecker) {
      console.log('Admin user already exists, skipping seed');
      return;
    }
const hashedPassword = await bcrypt.hash("abc123", bcrypt.genSaltSync()); 
const adminUser = {
  "username": "adeyinka",
  "phoneNumber": "07085812226",
  "email": "fawazmusty247@gmail.com",
  "password": hashedPassword,
  "role": "superAdmin"
};

await appUser.create(adminUser)
 await mongoose.disconnect();
 console.log('Admin user seeded successfully')
 } catch (error) {
  console.error('Error seeding admin user')
} 
}
 