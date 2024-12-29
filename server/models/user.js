import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';


const User = sequelize.define('User',{ 
  id: {
    type:DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }, 

  profilePhoto:{
    type: DataTypes.STRING,
    // unique:true,
   },

    fullName: {
      type: DataTypes.STRING,
     },
 
     username: {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false,
       },

    phoneNumber:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:true 
     },

    email:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
     },

   country:{
    type: DataTypes.STRING,
   },

    password:{
      type: DataTypes.STRING,
      allowNull: false,
     },
     
     resetToken:{
      type:DataTypes.STRING,
     },

     resetExp: {
      type:DataTypes.STRING,
     },

     role:{
      type: DataTypes.ENUM('admin', 'user', 'superAdmin'),
      defaultValue: 'user',
      allowNull: false,
     },

     activityStatus: {
      type: DataTypes.ENUM('isSuspended','isPermited'),
      defaultValue: 'isPermited',
      allowNull: false,
     },

},
{timestamps: true}
);







export default User;