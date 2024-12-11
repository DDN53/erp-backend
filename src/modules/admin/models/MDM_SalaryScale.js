const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_SalaryScale = sequelize.define(
    "MDM_SalaryScale",
    {
      PKey: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      CircularId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      BoardGradeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      SalCodeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      InitialAmount: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: true,
      },
      NoOfIncrements1: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      IncrementAmount1: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: true,
      },
      NoOfIncrements2: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      IncrementAmount2: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: true,
      },
      NoOfIncrements3: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      IncrementAmount3: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: true,
      },
      FinalAmount: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: true,
      },
      Remarks: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      IsStagnationCreditApplicable: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Description: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      PolicyDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      EffectiveDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      IsTransfer: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      GrossSalaryScale: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "MDM_SalaryScale",
      timestamps: false, // Assuming no timestamps in the table
    }
  );

  // Define associations
  MDM_SalaryScale.associate = (models) => {
    // Association with MDM_Circular
    MDM_SalaryScale.belongsTo(models.MDM_Circular, {
      foreignKey: "CircularId",
      as: "circular",
    });

    // Association with MDM_SalaryCode
    MDM_SalaryScale.belongsTo(models.MDM_SalaryCode, {
      foreignKey: "SalCodeId",
      as: "salaryCode",
    });

    // Association with MDM_BoardGrade
    MDM_SalaryScale.belongsTo(models.MDM_BoardGrade, {
      foreignKey: "BoardGradeId",
      as: "boardGrade",
    });
  };

  return MDM_SalaryScale;
};
