import { formatCurrency } from "../utils/formatCurrency";

export default function SummaryCards({ balance, totalIncome, totalExpenses }) {
  return (
    <div className="summary-grid">
      <div className="summary-card balance">
        <div className="label">Net Balance</div>
        <div className="amount">{formatCurrency(balance)}</div>
      </div>
      <div className="summary-card income">
        <div className="label">Total Income</div>
        <div className="amount">{formatCurrency(totalIncome)}</div>
      </div>
      <div className="summary-card expense">
        <div className="label">Total Expenses</div>
        <div className="amount">{formatCurrency(totalExpenses)}</div>
      </div>
    </div>
  );
}
