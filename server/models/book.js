import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import User from "./user.js";

const Book = sequelize.define('Book', {
  id: {
    type:DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

   bookCover:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:false,
     },
     
     bookName:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
     }, 
     
     bookDescription:{
      type:DataTypes.TEXT,
      allowNull:false,
     },

     bookAuthor:{
      type:DataTypes.STRING,
      allowNull:false,
     },

     bookCategory:{
      type:DataTypes.STRING,
      allowNull:false,
     },

     bookLanguage:{
      type:DataTypes.STRING,
      allowNull:false,
     },


     bookFile:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
     },

     postedBy:{
      type:DataTypes.STRING,
      // allowNull:false,
     },

    comments:{
     type: DataTypes.INTEGER,
    },

  },
  {timestamps:true}
  )

Book.hasOne(User)
export default Book;
