import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/AddSalaryDetails.css";
import {
  setBasicSalary,
  addNextEarning,
  deleteEarning,
  updateEarning,
  addNextDeduction,
  updateDeduction,
  deleteDeduction,
  calculateSalary,
  reset,
} from "../features/salaryCalculatorSlice";

function AddSalaryDetails() {
  const dispatch = useDispatch();
  const {
    basicSalary,
    earnings,
    deductions,
    totalDeduction,
    grossEarnings,
    employeeEPF,
    employerEPF,
    employerETF,
    APIT,
    netSalary,
    costToCompany,
  } = useSelector((state) => state.salaryCalculator);

  return (
    <div className="salary-calculator-container">
      <div className="salary-calculation">
        <h1>Calculate Your Salary</h1>
        <button className="reset-button" onClick={() => dispatch(reset())}>
          Reset
        </button>
        <div className="basic-salary-container">
          <label>Basic Salary: </label>
          <input
            type="number"
            value={basicSalary}
            onChange={(e) => dispatch(setBasicSalary(Number(e.target.value)))}
          />
        </div>

        <div className="earnings-container">
          <h2>Earnings</h2>
          <p className="subtopic-pharagraph">
            Allowance, Fixed Allowance, Bonus and etc.
          </p>
          {earnings.map((earning, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Pay Details (Title)"
                value={earning.description}
                onChange={(e) =>
                  dispatch(
                    updateEarning({
                      index,
                      field: "description",
                      value: e.target.value,
                    })
                  )
                }
              />

              <input
                type="number"
                placeholder="Amount"
                value={earning.amount}
                onChange={(e) =>
                  dispatch(
                    updateEarning({
                      index,
                      field: "amount",
                      value: Number(e.target.value),
                    })
                  )
                }
              />

              <label>
                EPF/ETF:
                <input
                  type="checkbox"
                  checked={earning.epf}
                  onChange={(e) =>
                    dispatch(
                      updateEarning({
                        index,
                        field: "epf",
                        value: e.target.checked,
                      })
                    )
                  }
                />
              </label>

              <button
                className="cancel-earning"
                onClick={() => dispatch(deleteEarning(index))}
              >
                X
              </button>
            </div>
          ))}

          <button
            className="add-new-earning"
            onClick={() => dispatch(addNextEarning())}
          >
            + Add New Allowance
          </button>
        </div>

        <div className="deduction-container">
          <h2>Deductions</h2>
          <p className="subtopic-pharagraph">
            Salary Advances, Loan Deductions and all
          </p>
          {deductions.map((deduction, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Deduction Details (Title)"
                value={deduction.description}
                onChange={(e) =>
                  dispatch(
                    updateDeduction({
                      index,
                      field: "description",
                      value: e.target.value,
                    })
                  )
                }
              />
              <input
                type="number"
                placeholder="Amount"
                value={deduction.amount}
                onChange={(e) =>
                  dispatch(
                    updateDeduction({
                      index,
                      field: "amount",
                      value: Number(e.target.value),
                    })
                  )
                }
              />
              <button
                className="cancel-deduction"
                onClick={() => dispatch(deleteDeduction(index))}
              >
                X
              </button>
            </div>
          ))}
          <button
            className="add-new-deduction"
            onClick={() => dispatch(addNextDeduction())}
          >
            + Add New Deduction
          </button>
        </div>

        <button
          className="calculate-net-salary"
          onClick={() => dispatch(calculateSalary())}
        >
          Calculate Net Salary
        </button>
      </div>
      <div className="display-salary-container">
        <h2>Your Salary</h2>
        <p>
          <span>Basic Salary</span> <span>{basicSalary}</span>
        </p>
        <p>
          <span>Gross Earning</span> <span>{grossEarnings}</span>
        </p>
        <p>
          <span>Gross Deduction</span> <span>{totalDeduction}</span>
        </p>
        <p>
          <span>Employee EPF (8%)</span> <span>{employeeEPF}</span>
        </p>
        <p>
          <span>APIT</span> <span>{APIT}</span>
        </p>
        <p>
          <span>Net Salary (Take Home)</span> <span>{netSalary}</span>
        </p>
        <p className="subtopic-pharagraph">Contribution from the Employer</p>
        <p>
          <span>Employer EPF (12%)</span> <span>{employerEPF}</span>
        </p>
        <p>
          <span>Employer ETF (3%)</span> <span>{employerETF}</span>
        </p>
        <p>
          <span>CTC (Cost to Company)</span> <span>{costToCompany}</span>
        </p>
      </div>
    </div>
  );
}

export default AddSalaryDetails;
