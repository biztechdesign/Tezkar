import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { HomePage } from "./components/home-page";
import { CategoryListingPage } from "./components/category-listing-page";
import { SubcategoryListingPage } from "./components/subcategory-listing-page";
import { ProductDetailPage } from "./components/product-detail-page";
import { CustomBottleDetailPage } from "./components/custom-bottle-detail-page";
import { FeedbackComplaintPage } from "./components/feedback-complaint-page";
import { ResellerRegistrationPage } from "./components/reseller-registration-page";
import { BusinessPartnerFormPage } from "./components/business-partner-form-page";
import { CataloguePage } from "./components/catalogue-page";
import { AboutPage } from "./components/about-page";
import { ContactPage } from "./components/contact-page";
import { CreditInformationPage } from "./components/credit-information-page";
import { OrdersPage } from "./components/orders-page";
import { AccountInformationPage } from "./components/account-information-page";
import { DashboardPage } from "./components/dashboard-page";
import { AddressesPage } from "./components/addresses-page";
import { WishlistPage } from "./components/wishlist-page";
import { ReviewsPage } from "./components/reviews-page";
import { DesignsPage } from "./components/designs-page";
import { DesignOrdersPage } from "./components/design-orders-page";
import { QuotesPage } from "./components/quotes-page";
import { NewsletterPage } from "./components/newsletter-page";
import { TransferAccountManagerPage } from "./components/transfer-account-manager-page";
import { ChangePasswordPage } from "./components/change-password-page";
import { CheckoutPage } from "./components/checkout-page";
import { QuoteCartPage } from "./components/quote-cart-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "category/:categorySlug",
        element: <CategoryListingPage />,
      },
      {
        path: "category/:categorySlug/:subcategorySlug",
        element: <SubcategoryListingPage />,
      },
      {
        path: "product/custom-tshirt",
        element: <ProductDetailPage />,
      },
      {
        path: "product/custom-bottle",
        element: <CustomBottleDetailPage />,
      },
      {
        path: "feedback-complaint",
        element: <FeedbackComplaintPage />,
      },
      {
        path: "reseller-registration",
        element: <ResellerRegistrationPage />,
      },
      {
        path: "business-partner-form",
        element: <BusinessPartnerFormPage />,
      },
      {
        path: "catalogue",
        element: <CataloguePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "account/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "account/information",
        element: <AccountInformationPage />,
      },
      {
        path: "account/business-information",
        element: <AccountInformationPage />,
      },
      {
        path: "account/addresses",
        element: <AddressesPage />,
      },
      {
        path: "account/orders",
        element: <OrdersPage />,
      },
      {
        path: "account/wishlist",
        element: <WishlistPage />,
      },
      {
        path: "account/reviews",
        element: <ReviewsPage />,
      },
      {
        path: "account/designs",
        element: <DesignsPage />,
      },
      {
        path: "account/design-orders",
        element: <DesignOrdersPage />,
      },
      {
        path: "account/quotes",
        element: <QuotesPage />,
      },
      {
        path: "account/newsletter",
        element: <NewsletterPage />,
      },
      {
        path: "account/credit-information",
        element: <CreditInformationPage />,
      },
      {
        path: "account/transfer-account-manager",
        element: <TransferAccountManagerPage />,
      },
      {
        path: "account/change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "quote-cart",
        element: <QuoteCartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});