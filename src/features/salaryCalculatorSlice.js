import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basicSalary: "",
  earnings: [{ description: "", amount: "", epf: false }],
  deductions: [{ description: "", amount: "" }],
  totalEarnings: 0,
  totalEarningsForEPF: 0,
  totalDeduction: 0,
  grossEarnings: 0,
  grossSalaryForEPF: 0,
  employeeEPF: 0,
  employerEPF: 0,
  employerETF: 0,
  APIT: 0,
  netSalary: 0,
  costToCompany: 0,
};

const salaryCalculatorSlice = createSlice({
  name: "salaryCalculator",
  initialState,
  reducers: {
    setBasicSalary: (state, action) => {
      state.basicSalary = action.payload;
    },
    updateEarning: (state, action) => {
      const { index, field, value } = action.payload;
      state.earnings[index][field] = value;
    },
    addNextEarning: (state) => {
      state.earnings.push({ description: "", amount: "", epf: false });
    },
    deleteEarning: (state, action) => {
      state.earnings.splice(action.payload, 1);
    },
    addNextDeduction: (state) => {
      state.deductions.push({ description: "", amount: "" });
    },
    updateDeduction: (state, action) => {
      const { index, field, value } = action.payload;
      state.deductions[index][field] = value;
    },
    deleteDeduction: (state, action) => {
      state.deductions.splice(action.payload, 1);
    },
    calculateSalary: (state) => {
      const totalEarnings = state.earnings.reduce((sum, earning) => {
        return sum + parseFloat(earning.amount || 0);
      }, parseFloat(state.basicSalary || 0));

      const totalEarningsForEPF = state.earnings.reduce((sum, earning) => {
        return sum + (earning.epf ? parseFloat(earning.amount || 0) : 0);
      }, parseFloat(state.basicSalary || 0));

      const totalDeduction = state.deductions.reduce((sum, deduction) => {
        return sum + parseFloat(deduction.amount || 0);
      }, 0);

      state.totalEarnings = totalEarnings;
      state.totalEarningsForEPF = totalEarningsForEPF;
      state.totalDeduction = totalDeduction;
      state.grossEarnings = totalEarnings - totalDeduction;
      state.grossSalaryForEPF = totalEarningsForEPF - totalDeduction;
      state.employeeEPF = state.grossSalaryForEPF * 0.08;
      state.employerEPF = state.grossSalaryForEPF * 0.12;
      state.employerETF = state.grossSalaryForEPF * 0.03;
      state.APIT = state.grossEarnings * 0.18 - 25500;
      state.netSalary = state.grossEarnings - state.employeeEPF - state.APIT;
      state.costToCompany =
        state.grossEarnings + state.employerEPF + state.employerETF;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setBasicSalary,
  updateEarning,
  addNextEarning,
  deleteEarning,
  addNextDeduction,
  updateDeduction,
  deleteDeduction,
  calculateSalary,
  reset,
} = salaryCalculatorSlice.actions;

export default salaryCalculatorSlice.reducer;
