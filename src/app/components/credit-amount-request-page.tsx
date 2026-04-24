import { Link } from "react-router";
import { AccountSidebar } from "./account-sidebar";
import {
  DollarSign,
  Send,
  Search,
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

// Mock data for credit requests history
const creditRequests = [
  {
    id: 1,
    requestId: "#1",
    amount: 500.0,
    message: "Hi, I need 500$ extra credit limit in my credit account.",
    requestedDate: "2026-03-01",
    respondedDate: "2026-03-02",
    status: "approved",
    adminResponse:
      "Request approved. Credit has been added to your account.",
  },
  {
    id: 2,
    requestId: "#2",
    amount: 200.0,
    message: "Hi, I need 200$ extra credit limit in my credit account.",
    requestedDate: "2026-03-10",
    respondedDate: null,
    status: "pending",
    adminResponse: null,
  },
  {
    id: 3,
    requestId: "#3",
    amount: 300.0,
    message: "Request for additional credit for upcoming bulk order.",
    requestedDate: "2026-02-20",
    respondedDate: "2026-02-21",
    status: "rejected",
    adminResponse:
      "Unable to approve at this time. Please contact support.",
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "approved":
      return {
        label: "Approved",
        icon: CheckCircle,
        color: "#2F8F3A",
        bg: "#F0F9F4",
      };
    case "pending":
      return {
        label: "Pending",
        icon: Clock,
        color: "#FFB020",
        bg: "#FFF9E6",
      };
    case "rejected":
      return {
        label: "Rejected",
        icon: XCircle,
        color: "#D92D20",
        bg: "#FEF3F2",
      };
    default:
      return {
        label: "Unknown",
        icon: Info,
        color: "#8A9199",
        bg: "#F7F8FA",
      };
  }
};

export function CreditAmountRequestPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div className="mx-auto pt-8 pb-[64px] px-6" style={{ maxWidth: "1400px" }}>
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
                Credit Amount Request
              </h1>
              <p
                className="text-[#5B616A]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Request additional credit limit for your account
              </p>
            </div>

            {/* Request Form Section */}
            <div
              className="bg-white border border-[#E6E8EB] p-8 mb-6"
              style={{ borderRadius: 0 }}
            >
              <h2
                className="text-xl mb-6"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Request For Credit Amount
              </h2>

              <div className="space-y-6">
                {/* Amount Input */}
                <div>
                  <label
                    className="block text-sm font-medium text-[#2C2C2C] mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Enter Amount for credit request{" "}
                    <span className="text-[#D92D20]">*</span>
                  </label>
                  <div className="flex gap-3">
                    <select
                      defaultValue="USD"
                      className="px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors bg-white text-[#2C2C2C] font-medium"
                      style={{ fontFamily: "Inter, sans-serif", borderRadius: 0, minWidth: "110px" }}
                      title="Select credit currency — some customers have multiple currencies assigned"
                    >
                      <option value="USD">USD</option>
                      <option value="AED">AED</option>
                      <option value="SAR">SAR</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                    <input
                      type="number"
                      placeholder="200"
                      className="flex-1 px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                      style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                    />
                    <button
                      className="flex items-center gap-2 px-6 py-3 bg-[#044c5c] text-white hover:text-white hover:bg-[#d41c5c] transition-all duration-300 font-medium whitespace-nowrap"
                      style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                    >
                      <Send className="w-4 h-4" />
                      Request Credit
                    </button>
                  </div>
                  <p className="text-xs text-[#8A9199] mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
                    Select the currency that matches your assigned credit ledger. Accounts with multiple currencies can raise separate requests per ledger.
                  </p>
                </div>

                {/* Additional Message */}
                <div>
                  <label
                    className="block text-sm font-medium text-[#2C2C2C] mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Additional message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Hi, I need 200$ extra credit limit in my credit account."
                    className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors resize-none"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  />
                </div>
              </div>
            </div>

            {/* Search Section */}
            <div
              className="bg-white border border-[#E6E8EB] p-8 mb-6"
              style={{ borderRadius: 0 }}
            >
              <h2
                className="text-xl mb-6"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Search Credit Amount Request
              </h2>

              <div className="grid grid-cols-3 gap-4">
                {/* Status Filter */}
                <div>
                  <label
                    className="block text-sm font-medium text-[#2C2C2C] mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Status
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  >
                    <option>All</option>
                    <option>Approved</option>
                    <option>Pending</option>
                    <option>Rejected</option>
                  </select>
                </div>

                {/* Request Amount From */}
                <div>
                  <label
                    className="block text-sm font-medium text-[#2C2C2C] mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Request amount
                  </label>
                  <input
                    type="number"
                    placeholder="From"
                    className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  />
                </div>

                {/* Request Date From */}
                <div>
                  <label
                    className="block text-sm font-medium text-[#2C2C2C] mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Request Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  />
                </div>

                {/* Empty cell for alignment */}
                <div></div>

                {/* Request Amount To */}
                <div>
                  <input
                    type="number"
                    placeholder="To"
                    className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  />
                </div>

                {/* Request Date To + Submit */}
                <div className="flex gap-3">
                  <input
                    type="date"
                    className="flex-1 px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  />
                  <button
                    className="flex items-center gap-2 px-6 py-3 bg-[#044c5c] text-white hover:bg-[#d41c5c] transition-all duration-300 font-medium whitespace-nowrap"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  >
                    <Search className="w-4 h-4" />
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {/* Credit Requests History */}
            <div
              className="bg-white border border-[#E6E8EB] p-8"
              style={{ borderRadius: 0 }}
            >
              <h2
                className="text-xl mb-6"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Credit Requests History
              </h2>

              <div className="space-y-4">
                {creditRequests.map((request) => {
                  const statusConfig = getStatusConfig(request.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={request.id}
                      className="border-2 border-[#E6E8EB] p-6 hover:border-[#044c5c] transition-colors"
                      style={{ borderRadius: 0 }}
                    >
                      {/* Request Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <h3
                            className="text-3xl font-semibold text-[#2C2C2C]"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            ${request.amount.toFixed(2)}
                          </h3>
                          <div
                            className="flex items-center gap-2 px-3 py-1"
                            style={{ backgroundColor: statusConfig.bg, borderRadius: 0 }}
                          >
                            <StatusIcon
                              className="w-4 h-4"
                              style={{ color: statusConfig.color }}
                            />
                            <span
                              className="text-sm font-medium"
                              style={{
                                color: statusConfig.color,
                                fontFamily: "Inter, sans-serif",
                              }}
                            >
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Request Message */}
                      <p
                        className="text-[#5B616A] mb-4"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {request.message}
                      </p>

                      {/* Request Details */}
                      <div className="flex items-center gap-6 text-sm text-[#8A9199] mb-4">
                        <span style={{ fontFamily: "Inter, sans-serif" }}>
                          Request ID: {request.requestId}
                        </span>
                        <span
                          className="flex items-center gap-1"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          <Calendar className="w-4 h-4" />
                          Requested on{" "}
                          {new Date(request.requestedDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                        {request.respondedDate && (
                          <span
                            className="flex items-center gap-1"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            <Calendar className="w-4 h-4" />
                            Responded on{" "}
                            {new Date(request.respondedDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        )}
                      </div>

                      {/* Admin Response */}
                      {request.adminResponse && (
                        <div
                          className="bg-[#FAFAF8] p-4 border-l-4 border-[#044c5c]"
                          style={{ borderRadius: 0 }}
                        >
                          <p
                            className="text-xs font-semibold text-[#2C2C2C] mb-2"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            Admin Response:
                          </p>
                          <p
                            className="text-sm text-[#5B616A]"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {request.adminResponse}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#E6E8EB]">
                <p
                  className="text-sm text-[#5B616A]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Showing 3 requests
                </p>
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-[#8A9199] border border-[#E6E8EB] hover:bg-[#044c5c] hover:text-white hover:border-[#044c5c] transition-all duration-300"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-[#8A9199] border border-[#E6E8EB] hover:bg-[#044c5c] hover:text-white hover:border-[#044c5c] transition-all duration-300"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div
              className="mt-6 bg-[#E8F4F8] border-l-4 border-[#044c5c] p-6"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#044c5c] flex-shrink-0 mt-0.5" />
                <div>
                  <h3
                    className="font-semibold text-[#2C2C2C] mb-2"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    How Credit Amount Request Works
                  </h3>
                  <p
                    className="text-sm text-[#5B616A]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Submit a request to increase your credit limit by entering
                    the desired amount and a message explaining your need. An
                    administrator will review your request and respond within
                    1-2 business days. Once approved, the credit will be
                    automatically added to your account balance.
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