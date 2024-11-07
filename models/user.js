import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/DB.js';
class User extends Model {
  static async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async validatePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Username is already taken'
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username is required'
        },
        len: {
          args: [3, 55],
          msg: 'Username must be between 3 and 55 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        len: {
          args: [8],
          msg: 'Password must be at least 8 characters long'
        }
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        user.password = await User.hashPassword(user.password);
      }
    },
    underscored: true
  }
);

export default User;