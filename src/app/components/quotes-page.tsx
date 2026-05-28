import { Link } from "react-router";
import { Home } from "./icons";
import { AccountSidebar } from "./account-sidebar";

type ShippingStatus = "Not Delivered" | "Partially Delivered" | "Delivered";

interface QuoteRow {
  id: string; // Sales Order #
  orderDate: string; // mm/dd/yyyy hh:mm:ss AM/PM
  shippingStatus: ShippingStatus;
  total: number;
  currency: "AED" | "USD";
}

const quotes: QuoteRow[] = [
  { id: "S00003", orderDate: "05/28/2026  02:10:26 PM", shippingStatus: "Not Delivered", total: 11.0, currency: "AED" },
  { id: "S00004", orderDate: "05/28/2026  02:10:25 PM", shippingStatus: "Not Delivered", total: 11.0, currency: "AED" },
  { id: "S00005", orderDate: "05/28/2026  02:10:23 PM", shippingStatus: "Not Delivered", total: 11.0, currency: "AED" },
  { id: "S00002", orderDate: "05/28/2026  02:10:15 PM", shippingStatus: "Not Delivered", total: 11.0, currency: "AED" },
  { id: "S00001", orderDate: "05/26/2026  03:47:35 PM", shippingStatus: "Not Delivered", total: 11.0, currency: "USD" },
];

const shippingStyle: Record<ShippingStatus, { fg: string; bd: string }> = {
  "Not Delivered": { fg: "#B8860B", bd: "#E0B852" },
  "Partially Delivered": { fg: "#1F4DA1", bd: "#B7C8EA" },
  Delivered: { fg: "#1F7A2E", bd: "#B7D8BD" },
};

function formatTotal(row: QuoteRow) {
  const amount = row.total.toFixed(2);
  return row.currency === "USD" ? `$ ${amount}` : `${amount} AED`;
}

export function QuotesPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div
        className="mx-auto px-6 pt-6 pb-12"
        style={{ maxWidth: "1400px", fontFamily: "Inter, sans-serif" }}
      >
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <AccountSidebar />

          <main className="flex-1 min-w-0 bg-white">
            <div className="px-5 pt-5 pb-8">
              {/* Breadcrumb */}
              <nav className="mb-5">
                <ol className="flex items-center gap-2 text-sm">
                  <li className="flex items-center">
                    <Link
                      to="/account/dashboard"
                      aria-label="My Account"
                      className="text-[#2E8B57] hover:text-[#226b42] transition-colors"
                    >
                      <Home className="w-4 h-4" />
                    </Link>
                  </li>
                  <li className="text-[#7A7A7A]">/</li>
                  <li className="text-[#7A7A7A]">Quotes</li>
                </ol>
              </nav>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse">
                  <thead>
                    <tr>
                      <th
                        className="text-left px-4 py-3 text-sm text-[#2C2C2C] border-b border-[#E6E8EB]"
                        style={{ fontWeight: 700 }}
                      >
                        Sales Order #
                      </th>
                      <th
                        className="text-center px-4 py-3 text-sm text-[#2C2C2C] border-b border-[#E6E8EB]"
                        style={{ fontWeight: 700 }}
                      >
                        Order Date
                      </th>
                      <th
                        className="text-center px-4 py-3 text-sm text-[#2C2C2C] border-b border-[#E6E8EB]"
                        style={{ fontWeight: 700 }}
                      >
                        Shipping Status
                      </th>
                      <th
                        className="text-right px-4 py-3 text-sm text-[#2C2C2C] border-b border-[#E6E8EB]"
                        style={{ fontWeight: 700 }}
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((o) => {
                      const s = shippingStyle[o.shippingStatus];
                      return (
                        <tr
                          key={o.id}
                          className="border-b border-[#EDEFF2] hover:bg-[#FAFBFC] transition-colors"
                        >
                          <td className="px-4 py-3 text-sm text-[#2E8B57]">
                            <Link to={`/account/quotes/${o.id}`} className="hover:underline">
                              {o.id}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-sm text-[#2C2C2C] text-center whitespace-nowrap">
                            {o.orderDate}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className="inline-flex items-center px-3 py-0.5 text-xs"
                              style={{
                                color: s.fg,
                                backgroundColor: "#FFFFFF",
                                border: `1px solid ${s.bd}`,
                                borderRadius: 4,
                                fontWeight: 600,
                              }}
                            >
                              {o.shippingStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-[#2C2C2C] text-right whitespace-nowrap">
                            {formatTotal(o)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
