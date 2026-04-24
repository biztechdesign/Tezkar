import { Link } from "react-router";
import { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LockIcon from '@mui/icons-material/Lock';
import { CtaButton } from "./ui/cta-button";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const cartItems = [
  {
    id: 1,
    name: "Custom Print T-Shirt — Front & Back Design, Full Color",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    price: 50.0,
    quantity: 1,
    options: "Color: White · Size: M",
  },
];

const shippingOptions = [
  { id: "priority", name: "Priority", delivery: "Delivered by Fri, Aug 2nd", price: 0, badge: "Fastest" },
  { id: "express", name: "Express", delivery: "Delivered by Tue, Aug 6th", price: 0 },
  { id: "super-saver", name: "Super Saver", delivery: "Delivered by Thu, Aug 8th", price: 0, badge: "Free" },
];

function SectionCard({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#E6E8EB] p-5 md:p-8" style={{ borderRadius: 0 }}>
      <div className="flex items-center gap-3 mb-5 md:mb-6">
        <span
          className="w-8 h-8 bg-[#044c5c] text-white flex items-center justify-center text-sm"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, borderRadius: 0 }}
        >
          {number}
        </span>
        <h2 className="text-xl text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label
      className="block text-[13px] font-medium text-[#2C2C2C] mb-1.5"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {children}
      {required && <span className="text-[#d41c5c] ml-0.5">*</span>}
    </label>
  );
}

const inputClass =
  "w-full px-4 py-3 border border-[#E6E8EB] text-[14px] text-[#2C2C2C] placeholder:text-[#B8BEC6] focus:border-[#044c5c] focus:outline-none transition-colors";
const inputStyle: React.CSSProperties = { fontFamily: "Inter, sans-serif", borderRadius: 0 };

export function CheckoutPage() {
  const [selectedShipping, setSelectedShipping] = useState("priority");
  const [selectedPayment, setSelectedPayment] = useState("webkul-credit");
  const [useShippingForBilling, setUseShippingForBilling] = useState(true);
  const [discountCode, setDiscountCode] = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 0;
  const availableCredit = 30.0;
  const tax = +(subtotal * 0.05).toFixed(2);

  const totalBeforeCredit = subtotal + shippingCost + tax;
  const creditApplied =
    selectedPayment === "webkul-credit" ? Math.min(availableCredit, totalBeforeCredit) : 0;
  const grandTotal = Math.max(0, totalBeforeCredit - creditApplied);
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="bg-[#FAFAF8] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Minimal Header */}
      <header className="bg-white border-b border-[#E6E8EB]">
        <div className="mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-6" style={{ maxWidth: "1400px" }}>
          <Link to="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 bg-[#044c5c] flex items-center justify-center"
              style={{ borderRadius: 0 }}
            >
              <ShoppingCartIcon sx={{ fontSize: 18, color: "#fff" }} />
            </div>
            <span
              className="text-lg md:text-[22px]"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                color: "#044c5c",
                letterSpacing: "-0.5px",
              }}
            >
              TezkarGift
            </span>
          </Link>
          <div className="hidden md:flex flex-1 items-center justify-center gap-2 text-[13px] text-[#5B616A]">
            <LockIcon sx={{ fontSize: 14, color: "#16A34A" }} />
            <span>Secure Checkout — your information is encrypted</span>
          </div>
          <div className="flex-1 md:hidden" />
          <Link
            to="/quote-cart"
            className="text-xs md:text-[13px] text-[#044c5c] font-medium flex items-center gap-1 hover:underline whitespace-nowrap"
          >
            <ChevronRightIcon sx={{ fontSize: 16, transform: "rotate(180deg)" }} />
            <span className="hidden sm:inline">Back to Cart</span>
            <span className="sm:hidden">Cart</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto py-6 md:py-10 px-4 md:px-6" style={{ maxWidth: "1400px" }}>
        {/* Title */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
            Checkout
          </h1>
          <p className="text-sm text-[#5B616A] mt-1">
            Complete your order in a few simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Contact Information */}
            <SectionCard number={1} title="Contact Information">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[#5B616A]">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#d41c5c] font-medium hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
              <FieldLabel required>Email Address</FieldLabel>
              <input
                type="email"
                placeholder="you@example.com"
                className={inputClass}
                style={inputStyle}
              />
              <p className="text-xs text-[#8A9199] mt-2">
                Your order confirmation will be sent to this email.
              </p>
            </SectionCard>

            {/* 2. Shipping Address */}
            <SectionCard number={2} title="Shipping Address">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <FieldLabel required>First Name</FieldLabel>
                  <input type="text" placeholder="John" className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <FieldLabel required>Last Name</FieldLabel>
                  <input type="text" placeholder="Doe" className={inputClass} style={inputStyle} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <FieldLabel required>Mobile Number</FieldLabel>
                  <input type="tel" placeholder="+971 50 123 4567" className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <FieldLabel>Company Name</FieldLabel>
                  <input type="text" placeholder="Optional" className={inputClass} style={inputStyle} />
                </div>
              </div>

              <div className="mb-4">
                <FieldLabel required>Street Address</FieldLabel>
                <input
                  type="text"
                  placeholder="123 Sheikh Zayed Road, Business Bay"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <FieldLabel required>City</FieldLabel>
                  <input type="text" placeholder="Dubai" className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <FieldLabel required>State / Emirate</FieldLabel>
                  <select className={inputClass} style={inputStyle}>
                    <option>Dubai</option>
                    <option>Abu Dhabi</option>
                    <option>Sharjah</option>
                    <option>Ajman</option>
                    <option>Ras Al Khaimah</option>
                    <option>Fujairah</option>
                    <option>Umm Al Quwain</option>
                  </select>
                </div>
                <div>
                  <FieldLabel required>Zip / Postal Code</FieldLabel>
                  <input type="text" placeholder="00000" className={inputClass} style={inputStyle} />
                </div>
              </div>

              <div>
                <FieldLabel required>Country</FieldLabel>
                <select className={inputClass} style={inputStyle}>
                  <option>United Arab Emirates</option>
                  <option>Saudi Arabia</option>
                  <option>Kuwait</option>
                  <option>Qatar</option>
                  <option>Bahrain</option>
                  <option>Oman</option>
                </select>
              </div>

              <label className="flex items-center gap-2 mt-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useShippingForBilling}
                  onChange={(e) => setUseShippingForBilling(e.target.checked)}
                  className="w-4 h-4 accent-[#044c5c]"
                  style={{ borderRadius: 0 }}
                />
                <span className="text-sm text-[#2C2C2C]">Use this address for billing as well</span>
              </label>
            </SectionCard>

            {/* 3. Shipping Method */}
            <SectionCard number={3} title="Shipping Method">
              <div className="space-y-3">
                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      selectedShipping === option.id
                        ? "border-[#044c5c] bg-[#F2F8F9]"
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
                        className="w-4 h-4 accent-[#044c5c]"
                      />
                      <LocalShippingIcon sx={{ fontSize: 22, color: "#044c5c" }} />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-[#2C2C2C]" style={{ fontFamily: "Inter, sans-serif" }}>
                            {option.name}
                          </p>
                          {option.badge && (
                            <span
                              className="text-[10px] px-2 py-0.5 bg-[#044c5c] text-white uppercase tracking-wide"
                              style={{ fontWeight: 600 }}
                            >
                              {option.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#8A9199]">{option.delivery}</p>
                      </div>
                    </div>
                    <span
                      className="font-semibold text-[#2C2C2C]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {option.price === 0 ? "FREE" : `$${option.price.toFixed(2)}`}
                    </span>
                  </label>
                ))}
              </div>
            </SectionCard>

            {/* 4. Payment Method */}
            <SectionCard number={4} title="Payment Method">
              <div className="space-y-3">
                {/* Store Credit */}
                <div
                  className={`border transition-all ${
                    selectedPayment === "webkul-credit"
                      ? "border-[#044c5c] bg-[#F2F8F9]"
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
                        className="w-4 h-4 accent-[#044c5c]"
                      />
                      <AccountBalanceWalletIcon sx={{ fontSize: 22, color: "#044c5c" }} />
                      <div>
                        <p className="font-semibold text-[#2C2C2C]">Pay with Store Credit</p>
                        <p className="text-xs text-[#8A9199]">Apply your account credit to this order</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#8A9199]">Available Credit</p>
                      <p
                        className="font-semibold text-[#044c5c]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        ${availableCredit.toFixed(2)}
                      </p>
                    </div>
                  </label>

                  {selectedPayment === "webkul-credit" && (
                    <div className="px-4 pb-4 border-t border-[#E6E8EB] pt-4">
                      {totalBeforeCredit > availableCredit ? (
                        <div
                          className="bg-[#FFFBEB] border border-[#FCD34D] p-4"
                          style={{ borderRadius: 0 }}
                        >
                          <div className="flex items-start gap-3">
                            <WarningAmberIcon sx={{ fontSize: 20, color: "#D97706", mt: "2px" }} />
                            <div className="flex-1">
                              <p className="font-semibold text-[#2C2C2C] text-sm mb-1">
                                Insufficient Credit Balance
                              </p>
                              <p className="text-sm text-[#5B616A] mb-3">
                                Your credit is <strong>${availableCredit.toFixed(2)}</strong> but the order total is{" "}
                                <strong>${totalBeforeCredit.toFixed(2)}</strong>. You need an extra{" "}
                                <strong>${(totalBeforeCredit - availableCredit).toFixed(2)}</strong> to complete this order.
                              </p>
                              <div className="flex gap-3">
                                <Link
                                  to="/account/credit-request"
                                  className="px-4 py-2.5 bg-white border border-[#044c5c] text-[#044c5c] font-semibold text-sm hover:bg-[#F2F8F9] transition-colors"
                                  style={{ borderRadius: 0 }}
                                >
                                  Request More Credit
                                </Link>
                                <button
                                  onClick={() => setSelectedPayment("card")}
                                  className="px-4 py-2.5 bg-[#044c5c] text-white hover:text-white font-semibold text-sm hover:bg-[#033d4a] transition-colors"
                                  style={{ borderRadius: 0 }}
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
                            <CheckCircleIcon sx={{ fontSize: 20, color: "#16A34A", mt: "2px" }} />
                            <div>
                              <p className="font-semibold text-[#16A34A] text-sm mb-1">
                                Sufficient Credit Available
                              </p>
                              <p className="text-sm text-[#5B616A]">
                                Your remaining balance after this order will be{" "}
                                <strong>${(availableCredit - totalBeforeCredit).toFixed(2)}</strong>.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card */}
                <div
                  className={`border transition-all ${
                    selectedPayment === "card"
                      ? "border-[#044c5c] bg-[#F2F8F9]"
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
                        className="w-4 h-4 accent-[#044c5c]"
                      />
                      <CreditCardIcon sx={{ fontSize: 22, color: "#044c5c" }} />
                      <div>
                        <p className="font-semibold text-[#2C2C2C]">Credit / Debit Card</p>
                        <p className="text-xs text-[#8A9199]">Visa, Mastercard, Amex</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-[#1A1F71] text-white text-[10px] font-bold" style={{ borderRadius: 0 }}>VISA</span>
                      <span className="px-2 py-1 bg-[#EB001B] text-white text-[10px] font-bold" style={{ borderRadius: 0 }}>MC</span>
                      <span className="px-2 py-1 bg-[#006FCF] text-white text-[10px] font-bold" style={{ borderRadius: 0 }}>AMEX</span>
                    </div>
                  </label>

                  {selectedPayment === "card" && (
                    <div className="px-4 pb-4 border-t border-[#E6E8EB] pt-4 space-y-4">
                      <div>
                        <FieldLabel required>Card Number</FieldLabel>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className={inputClass}
                          style={inputStyle}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <FieldLabel required>Expiry</FieldLabel>
                          <input type="text" placeholder="MM/YY" className={inputClass} style={inputStyle} />
                        </div>
                        <div>
                          <FieldLabel required>CVV</FieldLabel>
                          <input type="text" placeholder="123" className={inputClass} style={inputStyle} />
                        </div>
                        <div>
                          <FieldLabel required>Name on Card</FieldLabel>
                          <input type="text" placeholder="John Doe" className={inputClass} style={inputStyle} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bank Transfer */}
                <div
                  className={`border transition-all ${
                    selectedPayment === "bank"
                      ? "border-[#044c5c] bg-[#F2F8F9]"
                      : "border-[#E6E8EB]"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  <label className="flex items-center gap-3 p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === "bank"}
                      onChange={() => setSelectedPayment("bank")}
                      className="w-4 h-4 accent-[#044c5c]"
                    />
                    <CreditCardIcon sx={{ fontSize: 22, color: "#044c5c" }} />
                    <div>
                      <p className="font-semibold text-[#2C2C2C]">Bank Transfer</p>
                      <p className="text-xs text-[#8A9199]">Invoice will be emailed with payment details</p>
                    </div>
                  </label>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Right Column — Sticky Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="bg-white border border-[#E6E8EB] sticky top-6"
              style={{ borderRadius: 0 }}
            >
              <div className="p-6 border-b border-[#E6E8EB]">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                    Order Summary
                  </h2>
                  <span className="text-xs bg-[#044c5c] text-white px-2 py-1 uppercase tracking-wide" style={{ fontWeight: 600 }}>
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="p-6 space-y-4 border-b border-[#E6E8EB] max-h-[320px] overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div
                      className="w-16 h-16 bg-[#F7F8FA] flex-shrink-0 overflow-hidden relative border border-[#E6E8EB]"
                      style={{ borderRadius: 0 }}
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span
                        className="absolute -top-1 -right-1 w-5 h-5 bg-[#044c5c] text-white text-[10px] flex items-center justify-center"
                        style={{ borderRadius: "50%", fontWeight: 700 }}
                      >
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#2C2C2C] line-clamp-2 mb-1 leading-snug">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#8A9199]">{item.options}</p>
                    </div>
                    <p
                      className="text-sm font-semibold text-[#2C2C2C] whitespace-nowrap"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="p-6 border-b border-[#E6E8EB]">
                <div className="flex items-center gap-2 mb-2">
                  <LocalOfferIcon sx={{ fontSize: 16, color: "#5B616A" }} />
                  <span className="text-sm font-medium text-[#2C2C2C]">Discount Code</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter code"
                    className={inputClass}
                    style={inputStyle}
                  />
                  <CtaButton variant="secondary" size="md">Apply</CtaButton>
                </div>
              </div>

              {/* Totals */}
              <div className="p-6 space-y-2 border-b border-[#E6E8EB]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#5B616A]">Subtotal</span>
                  <span className="text-[#2C2C2C] font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5B616A]">Shipping</span>
                  <span className="text-[#16A34A] font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5B616A]">VAT (5%)</span>
                  <span className="text-[#2C2C2C] font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                    ${tax.toFixed(2)}
                  </span>
                </div>
                {creditApplied > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#044c5c] font-medium">Store Credit Applied</span>
                    <span className="text-[#044c5c] font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
                      -${creditApplied.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Grand Total + CTA */}
              <div className="p-6">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-base font-semibold text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Grand Total
                  </span>
                  <span className="text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>

                <CtaButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  leftIcon={<LockIcon sx={{ fontSize: 16 }} />}
                >
                  Place Order
                </CtaButton>

                <p className="text-xs text-[#8A9199] text-center mt-3 leading-relaxed">
                  By placing your order you agree to our{" "}
                  <Link to="/terms" className="text-[#044c5c] underline">Terms</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="text-[#044c5c] underline">Privacy Policy</Link>.
                </p>
              </div>

              {/* Trust badges */}
              <div className="px-6 pb-6 pt-0 border-t border-[#E6E8EB]">
                <div className="flex items-center justify-around pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#5B616A]">
                    <LockIcon sx={{ fontSize: 14, color: "#16A34A" }} />
                    <span>SSL Secure</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#5B616A]">
                    <VerifiedUserIcon sx={{ fontSize: 14, color: "#16A34A" }} />
                    <span>Buyer Protected</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#5B616A]">
                    <LocalShippingIcon sx={{ fontSize: 14, color: "#16A34A" }} />
                    <span>Free Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
