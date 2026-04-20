import { Link } from "react-router";
import {
  ShoppingCart,
  CheckCircle,
  ChevronRight,
  CreditCard,
  Wallet,
  FileText,
  Clock,
  Minus,
  Plus,
} from "lucide-react";
import { useState } from "react";

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Custom Print T-Shirt — Front & Back Design, Full Color",
    image: "custom print tshirt",
    price: 50.0,
    quantity: 1,
  },
];

export function CheckoutPage() {
  const [selectedShipping, setSelectedShipping] = useState("priority");
  const [selectedPayment, setSelectedPayment] = useState("webkul-credit");
  const [usedCredit, setUsedCredit] = useState(30);
  const [useShippingForBilling, setUseShippingForBilling] = useState(true);
  const [shipHere, setShipHere] = useState(true);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 0; // Free shipping
  const availableCredit = 30.0;

  const totalBeforeCredit = subtotal + shippingCost;
  const creditApplied = Math.min(usedCredit, availableCredit, totalBeforeCredit);
  const grandTotal = Math.max(0, totalBeforeCredit - creditApplied);

  const shippingOptions = [
    {
      id: "priority",
      name: "Priority",
      delivery: "Delivered by Fri, Aug 2nd",
      price: 0,
    },
    {
      id: "express",
      name: "Express",
      delivery: "Delivered by Fri, Aug 2nd",
      price: 0,
    },
    {
      id: "super-saver",
      name: "Super Saver",
      delivery: "Delivered by Fri, Aug 2nd",
      price: 0,
    },
  ];

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Logo-only Header */}
      <header className="bg-white border-b border-[#E6E8EB]">
        <div
          className="mx-auto px-6 py-4 flex items-center"
          style={{ maxWidth: "1400px" }}
        >
          <Link to="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 bg-[#044c5c] flex items-center justify-center"
              style={{ borderRadius: 0 }}
            >
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                color: "#044c5c",
                fontSize: "22px",
                letterSpacing: "-0.5px",
              }}
            >
              TezkarGift
            </span>
          </Link>
          <div className="flex-1 flex justify-center">
            <span
              className="text-sm text-[#5B616A]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Secure Checkout
            </span>
          </div>
          <Link
            to="/category/gifts"
            className="text-sm text-[#044c5c] hover:text-[#d41c5c] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Continue Shopping
          </Link>
        </div>
      </header>

      <div className="mx-auto py-[64px] px-6" style={{ maxWidth: "1400px" }}>
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            {/* Shopping Cart Step */}
            <div className="flex flex-col items-center">
              <div
                className="w-12 h-12 bg-[#044c5c] flex items-center justify-center text-white mb-2"
                style={{ borderRadius: 0 }}
              >
                <CheckCircle className="w-6 h-6" />
              </div>
              <span
                className="text-sm text-[#2C2C2C]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Shopping Cart
              </span>
            </div>

            {/* Connector Line */}
            <div className="w-24 h-1 bg-[#044c5c] mb-6"></div>

            {/* Checkout Step */}
            <div className="flex flex-col items-center">
              <div
                className="w-12 h-12 bg-[#044c5c] flex items-center justify-center text-white mb-2"
                style={{ borderRadius: 0 }}
              >
                <CheckCircle className="w-6 h-6" />
              </div>
              <span
                className="text-sm font-semibold text-[#044c5c]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Checkout
              </span>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1
            className="text-4xl"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
          >
            Checkout
          </h1>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Guest Checkout */}
            <div className="bg-white border border-[#E6E8EB] p-8" style={{ borderRadius: 0 }}>
              <h2
                className="text-xl mb-6"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Checkout As Guest
              </h2>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-[#2C2C2C] mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Enter Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                  style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                />
                <p
                  className="text-sm text-[#8A9199] mt-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  You'll need this order confirmation here
                </p>
              </div>

              <p
                className="text-sm text-[#5B616A] text-right"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Already signed up?{" "}
                <Link
                  to="/login"
                  className="text-[#d41c5c] hover:underline font-medium"
                >
                  Log In
                </Link>
              </p>
            </div>

            {/* Shipping & Billing Address */}
            <div className="bg-white border border-[#E6E8EB] p-8" style={{ borderRadius: 0 }}>
              <h2
                className="text-xl mb-6"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Shipping & Billing Address
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className="block text-sm font-medium text-[#2C2C2C] mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    First Name <span className="text-[#D92D20]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-[#2C2C2C] mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Last Name <span className="text-[#D92D20]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-[#2C2C2C] mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Mobile Number <span className="text-[#D92D20]">*</span>
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                  style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                />
                <p
                  className="text-sm text-[#8A9199] mt-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  I am in for SMS updates and automated calls
                </p>
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-[#2C2C2C] mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Company Name <span className="text-[#D92D20]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                  style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-[#2C2C2C] mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Address Line <span className="text-[#D92D20]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="123 Street, Lane 02"
                  className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                  style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-[#2C2C2C] mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Street/Road
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                  style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className="block text-sm font-medium text-[#2C2C2C] mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Zipcode <span className="text-[#D92D20]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="90001"
                    className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-[#2C2C2C] mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    City <span className="text-[#D92D20]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Dubai"
                    className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    className="block text-sm font-medium text-[#2C2C2C] mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    State <span className="text-[#D92D20]">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  >
                    <option>Dubai</option>
                    <option>Abu Dhabi</option>
                    <option>Sharjah</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-[#2C2C2C] mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Country <span className="text-[#D92D20]">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  >
                    <option>United Arab Emirates</option>
                    <option>Saudi Arabia</option>
                    <option>Kuwait</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={useShippingForBilling}
                    onChange={(e) => setUseShippingForBilling(e.target.checked)}
                    className="w-4 h-4 text-[#044c5c] border-[#E6E8EB] focus:ring-[#044c5c]"
                    style={{ borderRadius: 0 }}
                  />
                  <span
                    className="text-sm text-[#2C2C2C]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Use same address for billing
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={shipHere}
                    onChange={(e) => setShipHere(e.target.checked)}
                    className="w-4 h-4 text-[#044c5c] border-[#E6E8EB] focus:ring-[#044c5c]"
                    style={{ borderRadius: 0 }}
                  />
                  <span
                    className="text-sm text-[#2C2C2C]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Ship Here
                  </span>
                </label>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white border border-[#E6E8EB] p-8" style={{ borderRadius: 0 }}>
              <h2
                className="text-xl mb-6"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Shipping Method
              </h2>

              <div className="space-y-3">
                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 border-2 cursor-pointer transition-all ${
                      selectedShipping === option.id
                        ? "border-[#044c5c] bg-[#f0f7f8]"
                        : "border-[#E6E8EB] hover:border-[#044c5c]"
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={selectedShipping === option.id}
                        onChange={() => setSelectedShipping(option.id)}
                        className="w-4 h-4 text-[#044c5c]"
                      />
                      <div>
                        <p
                          className="font-semibold text-[#2C2C2C]"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {option.name}
                        </p>
                        <p
                          className="text-sm text-[#8A9199]"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {option.delivery}
                        </p>
                      </div>
                    </div>
                    <span
                      className="font-semibold text-[#2C2C2C]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      ${option.price.toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-[#E6E8EB] p-8" style={{ borderRadius: 0 }}>
              <h2
                className="text-xl mb-6"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Payment Method
              </h2>

              <div className="space-y-3">
                {/* Webkul Credit System */}
                <div
                  className={`border-2 transition-all ${
                    selectedPayment === "webkul-credit"
                      ? "border-[#044c5c] bg-[#f0f7f8]"
                      : "border-[#E6E8EB]"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  <label className="flex items-center justify-between p-4 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === "webkul-credit"}
                        onChange={() => setSelectedPayment("webkul-credit")}
                        className="w-4 h-4 text-[#044c5c]"
                      />
                      <Wallet className="w-5 h-5 text-[#044c5c]" />
                      <span
                        className="font-medium text-[#2C2C2C]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Pay with Credit
                      </span>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-xs text-[#8A9199]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Available Credit
                      </p>
                      <p
                        className="font-semibold text-[#044c5c]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        ${availableCredit.toFixed(2)}
                      </p>
                    </div>
                  </label>

                  {selectedPayment === "webkul-credit" && (
                    <div className="px-4 pb-4 space-y-4 border-t border-[#E6E8EB] pt-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p
                            className="text-xs text-[#8A9199] mb-1"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            Order Total
                          </p>
                          <p
                            className="font-semibold text-[#2C2C2C]"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            ${totalBeforeCredit.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-xs text-[#8A9199] mb-1"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            Your Credit Balance
                          </p>
                          <p
                            className="font-semibold text-[#044c5c]"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            ${availableCredit.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-xs text-[#8A9199] mb-1"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {totalBeforeCredit > availableCredit ? 'Remaining Amount' : 'After Payment'}
                          </p>
                          <p
                            className={`font-semibold ${totalBeforeCredit > availableCredit ? 'text-[#d41c5c]' : 'text-[#16A34A]'}`}
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            ${totalBeforeCredit > availableCredit 
                              ? (totalBeforeCredit - availableCredit).toFixed(2) 
                              : (availableCredit - totalBeforeCredit).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {totalBeforeCredit > availableCredit ? (
                        <div
                          className="bg-[#FFF8E1] border border-[#FFE082] p-4"
                          style={{ borderRadius: 0 }}
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <div className="mt-0.5">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="#F59E0B"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p
                                className="font-semibold text-[#2C2C2C] mb-1"
                                style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                              >
                                Insufficient Credit Balance
                              </p>
                              <p
                                className="text-sm text-[#5B616A] mb-3"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                Your credit balance is ${availableCredit.toFixed(2)}, but your order total is ${totalBeforeCredit.toFixed(2)}. 
                                You need ${(totalBeforeCredit - availableCredit).toFixed(2)} more to complete this order.
                              </p>
                              <p
                                className="text-sm font-medium text-[#2C2C2C] mb-3"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                Choose an option to proceed:
                              </p>
                              <div className="flex gap-3">
                                <button
                                  onClick={() => window.location.href = '/credit-amount-request'}
                                  className="flex-1 px-4 py-3 bg-white border-2 border-[#044c5c] text-[#044c5c] font-semibold hover:bg-[#f0f7f8] transition-all"
                                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", borderRadius: 0 }}
                                >
                                  Request More Credit
                                </button>
                                <button
                                  onClick={() => setSelectedPayment("card")}
                                  className="flex-1 px-4 py-3 bg-[#044c5c] text-white font-semibold hover:bg-[#033d4a] transition-all"
                                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", borderRadius: 0 }}
                                >
                                  Pay Remaining with Card
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="bg-[#F0FDF4] border border-[#86EFAC] p-4"
                          style={{ borderRadius: 0 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="#16A34A"/>
                              </svg>
                            </div>
                            <div>
                              <p
                                className="font-semibold text-[#16A34A] mb-1"
                                style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                              >
                                Sufficient Credit Available
                              </p>
                              <p
                                className="text-sm text-[#5B616A]"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                You have enough credit to complete this purchase. Your remaining balance after this order will be ${(availableCredit - totalBeforeCredit).toFixed(2)}.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Payment */}
                <div
                  className={`border-2 transition-all ${
                    selectedPayment === "card"
                      ? "border-[#044c5c] bg-[#f0f7f8]"
                      : "border-[#E6E8EB]"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  <label className="flex items-center justify-between p-4 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === "card"}
                        onChange={() => setSelectedPayment("card")}
                        className="w-4 h-4 text-[#044c5c]"
                      />
                      <CreditCard className="w-5 h-5 text-[#044c5c]" />
                      <span
                        className="font-medium text-[#2C2C2C]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Pay with Card
                      </span>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-xs text-[#8A9199]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {totalBeforeCredit > availableCredit ? 'Pay remaining amount' : 'Full payment'}
                      </p>
                      <p
                        className="font-semibold text-[#2C2C2C]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        ${totalBeforeCredit > availableCredit 
                          ? (totalBeforeCredit - availableCredit).toFixed(2) 
                          : totalBeforeCredit.toFixed(2)}
                      </p>
                    </div>
                  </label>

                  {selectedPayment === "card" && totalBeforeCredit > availableCredit && (
                    <div className="px-4 pb-4 border-t border-[#E6E8EB] pt-4">
                      <div
                        className="bg-[#F0F9FF] border border-[#B3D9F2] p-4"
                        style={{ borderRadius: 0 }}
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span style={{ fontFamily: "Inter, sans-serif", color: "#5B616A" }}>
                              Order Total:
                            </span>
                            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2C2C2C" }}>
                              ${totalBeforeCredit.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span style={{ fontFamily: "Inter, sans-serif", color: "#5B616A" }}>
                              Credit Applied:
                            </span>
                            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#044c5c" }}>
                              -${availableCredit.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm pt-2 border-t border-[#B3D9F2]">
                            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2C2C2C" }}>
                              Card Payment:
                            </span>
                            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px", color: "#d41c5c" }}>
                              ${(totalBeforeCredit - availableCredit).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p
                        className="text-sm text-[#5B616A] mt-3"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        💡 Your available credit of ${availableCredit.toFixed(2)} will be automatically applied, and the remaining amount will be charged to your card.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="col-span-1">
            <div
              className="bg-white border border-[#E6E8EB] p-6 sticky top-6"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-xl"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  Order Summary
                </h2>
                <Link
                  to="/cart"
                  className="text-[#044c5c] hover:text-[#d41c5c] text-sm font-medium transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  View Cart
                </Link>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-[#E6E8EB]">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div
                      className="w-16 h-16 bg-[#F7F8FA] flex items-center justify-center flex-shrink-0"
                      style={{ borderRadius: 0 }}
                    >
                      <ShoppingCart className="w-5 h-5 text-[#8A9199]" />
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-sm text-[#2C2C2C] mb-1 line-clamp-2"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="text-xs text-[#8A9199]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Qty: {item.quantity}
                      </p>
                      <p
                        className="text-sm font-semibold text-[#2C2C2C] mt-1"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm text-[#5B616A]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="font-semibold text-[#2C2C2C]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {creditApplied > 0 && (
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm text-[#044c5c] font-medium"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Credit Amount
                    </span>
                    <span
                      className="font-semibold text-[#044c5c]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      -${creditApplied.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span
                    className="text-sm text-[#5B616A]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Shipping Charges <span className="text-[#D92D20]">*</span>
                  </span>
                  <span
                    className="font-semibold text-[#2F8F3A]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    ${shippingCost.toFixed(2)} FREE
                  </span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex items-center justify-between py-4 border-t-2 border-[#E6E8EB] mb-6">
                <span
                  className="text-lg font-semibold text-[#2C2C2C]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Grand Total
                </span>
                <span
                  className="text-2xl font-bold text-[#2C2C2C]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              {/* Place Order Button */}
              <button
                className="w-full py-4 bg-[#044c5c] text-white font-semibold hover:bg-[#d41c5c] transition-all duration-300 flex items-center justify-center gap-2"
                style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
              >
                PLACE ORDER
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}