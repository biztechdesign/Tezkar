import { Link } from "react-router";
import { AccountSidebar } from "./account-sidebar";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Eye,
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar,
} from "lucide-react";

// Mock data for transaction history
const transactions = [
  {
    id: 1,
    date: "2026-03-28",
    description: "Credit added - Order #ORD-2024-1234",
    amount: 500.0,
    balance: 1250.0,
    status: "completed",
    type: "credit",
  },
  {
    id: 2,
    date: "2026-03-25",
    description: "Payment for Order #ORD-2024-1198",
    amount: -150.0,
    balance: 750.0,
    status: "completed",
    type: "debit",
  },
  {
    id: 3,
    date: "2026-03-20",
    description: "Credit added - Promotional bonus",
    amount: 250.0,
    balance: 900.0,
    status: "completed",
    type: "credit",
  },
  {
    id: 4,
    date: "2026-03-15",
    description: "Payment for Order #ORD-2024-1156",
    amount: -75.5,
    balance: 650.0,
    status: "completed",
    type: "debit",
  },
  {
    id: 5,
    date: "2026-03-10",
    description: "Credit added - Order #ORD-2024-1089",
    amount: 350.0,
    balance: 725.5,
    status: "completed",
    type: "credit",
  },
];

export function CreditInformationPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div
        className="mx-auto pt-8 pb-[64px] px-6"
        style={{ maxWidth: "1400px" }}
      >
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link
                to="/"
                className="text-[#044c5c] hover:text-[#d41c5c] transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="text-[#2C2C2C]">/</li>
            <li className="text-[#2C2C2C]">Account Information</li>
          </ol>
        </nav>

        {/* Two-column layout */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <AccountSidebar />

          {/* Main Content */}
          <main className="flex-1">
            {/* Page Header */}
            <div className="mb-8">
              <h1
                className="text-4xl mb-3"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Credit Information
              </h1>
              <p className="text-[#2C2C2C] opacity-70">
                Manage your account credit balance and view transaction history
              </p>
            </div>

            {/* Credit Summary Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Available Balance Card - Primary */}
              <div className="bg-[#044c5c] text-white p-6 shadow-md" style={{ borderRadius: 0 }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-white/20 p-3" style={{ borderRadius: 0 }}>
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <span className="bg-white/20 text-xs px-3 py-1" style={{ borderRadius: 0 }}>
                    Current
                  </span>
                </div>
                <div className="mb-2">
                  <div className="text-3xl mb-1" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                    $1,250.00
                  </div>
                  <div className="text-sm opacity-90">Available Balance</div>
                </div>
              </div>

              {/* Total Credits Earned */}
              <div className="bg-white p-6 shadow-md border border-[#E8DDD3]" style={{ borderRadius: 0 }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-green-50 p-3" style={{ borderRadius: 0 }}>
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="bg-green-50 text-green-700 text-xs px-3 py-1" style={{ borderRadius: 0 }}>
                    Earned
                  </span>
                </div>
                <div className="mb-2">
                  <div
                    className="text-3xl text-[#2C2C2C] mb-1"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    $1,100.00
                  </div>
                  <div className="text-sm text-[#2C2C2C] opacity-70">
                    Total Credits Earned
                  </div>
                </div>
              </div>

              {/* Total Credits Used */}
              <div className="bg-white p-6 shadow-md border border-[#E8DDD3]" style={{ borderRadius: 0 }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-[#fdf0f5] p-3" style={{ borderRadius: 0 }}>
                    <CreditCard className="w-6 h-6 text-[#d41c5c]" />
                  </div>
                  <span className="bg-[#fdf0f5] text-[#d41c5c] text-xs px-3 py-1" style={{ borderRadius: 0 }}>
                    Used
                  </span>
                </div>
                <div className="mb-2">
                  <div
                    className="text-3xl text-[#2C2C2C] mb-1"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    $225.50
                  </div>
                  <div className="text-sm text-[#2C2C2C] opacity-70">
                    Total Credits Used
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction History Table */}
            <div className="bg-white shadow-md border border-[#E8DDD3] overflow-hidden" style={{ borderRadius: 0 }}>
              <div className="px-6 py-4 border-b border-[#E8DDD3]">
                <h2
                  className="text-2xl"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  Transaction History
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#FAFAF8]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm text-[#2C2C2C] opacity-70">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm text-[#2C2C2C] opacity-70">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-sm text-[#2C2C2C] opacity-70">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-sm text-[#2C2C2C] opacity-70">
                        Balance
                      </th>
                      <th className="px-6 py-4 text-left text-sm text-[#2C2C2C] opacity-70">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm text-[#2C2C2C] opacity-70">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr
                        key={transaction.id}
                        className={`border-b border-[#E8DDD3] hover:bg-[#FAFAF8] transition-colors ${
                          index === transactions.length - 1 ? "border-b-0" : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-[#2C2C2C]">
                            <Calendar className="w-4 h-4 opacity-50" />
                            {new Date(transaction.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2C2C2C]">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-sm font-medium ${
                              transaction.type === "credit"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.amount > 0 ? "+" : ""}$
                            {Math.abs(transaction.amount).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2C2C2C]">
                          ${transaction.balance.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="inline-flex items-center px-3 py-1 text-xs bg-green-50 text-green-700"
                            style={{ borderRadius: 0 }}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="flex items-center gap-2 text-sm text-[#044c5c] hover:text-[#d41c5c] transition-colors">
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-[#E8DDD3] flex items-center justify-between">
                <div className="text-sm text-[#2C2C2C] opacity-70">
                  Showing 5 transactions
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center gap-2 px-4 py-2 border border-[#E8DDD3] text-sm text-[#2C2C2C] hover:bg-[#044c5c] hover:text-white hover:border-[#044c5c] transition-all duration-300 disabled:opacity-50"
                    style={{ borderRadius: 0 }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 border border-[#E8DDD3] text-sm text-[#2C2C2C] hover:bg-[#044c5c] hover:text-white hover:border-[#044c5c] transition-all duration-300"
                    style={{ borderRadius: 0 }}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div
              className="mt-8 bg-[#E8F4F8] border-l-4 border-[#044c5c] p-6"
              style={{ borderRadius: 0 }}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-[#d0eaf0] p-2" style={{ borderRadius: 0 }}>
                    <Info className="w-5 h-5 text-[#044c5c]" />
                  </div>
                </div>
                <div>
                  <h3
                    className="text-lg mb-2 text-[#2C2C2C]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    About Customer Credit
                  </h3>
                  <p className="text-sm text-[#2C2C2C] opacity-70 leading-relaxed">
                    Customer credit is a payment method that allows you to make
                    purchases using your available credit balance. Credits can
                    be earned through promotional offers, refunds, or added
                    manually by our team. Your credit balance never expires and
                    can be used for any purchase on our platform. To request
                    additional credit, please visit the{" "}
                    <Link
                      to="/account/credit-request"
                      className="text-[#044c5c] hover:text-[#d41c5c] underline transition-colors"
                    >
                      Credit Amount Request
                    </Link>{" "}
                    page.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}