module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'Name cannot be empty, please enter a name',
        },
        notNull: {
          args: [true],
          msg: 'Name cannot be empty, please enter a name',
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'email cannot be empty, please enter a valid email',
        },
        notNull: {
          args: [true],
          msg: 'email cannot be empty, please enter a valid email',
        },
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'Password cannot be empty, please enter a valid password',
        },
        notNull: {
          args: [true],
          msg: 'Password cannot be empty, please enter a valid password',
        },
        len: {
          args: [9],
          msg: 'Password must be more than 8 characters in length',
        },
      },
    },
  };

  return sequelize.define('Reader', schema);
};
