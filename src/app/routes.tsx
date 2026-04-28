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
import { CreditAmountRequestPage } from "./components/credit-amount-request-page";
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
        path: "product/:productSlug",
        element: <ProductDetailPage />,
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
        path: "account/credit-information",
        element: <CreditInformationPage />,
      },
      {
        path: "account/orders",
        element: <OrdersPage />,
      },
      {
        path: "account/credit-request",
        element: <CreditAmountRequestPage />,
      },
      {
        path: "quote-cart",
        element: <QuoteCartPage />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
], {
  basename: import.meta.env.BASE_URL,
});