import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { HomePage } from "./components/home-page";
import { CategoryListingPage } from "./components/category-listing-page";
import { SubcategoryListingPage } from "./components/subcategory-listing-page";
import { ProductDetailPage } from "./components/product-detail-page";
import { ProductDetailPageV2 } from "./components/product-detail-page-v2";
import { CustomTshirtDetailPage } from "./components/custom-tshirt-detail-page";
import { TshirtProductDetail } from "./components/tshirt-product-detail";
import { FeedbackComplaintPage } from "./components/feedback-complaint-page";
import { ResellerRegistrationPage } from "./components/reseller-registration-page";
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
        path: "product/:productSlug",
        element: <ProductDetailPage />,
      },
      {
        path: "product-v2/:productSlug",
        element: <ProductDetailPageV2 />,
      },
      {
        path: "custom-tshirt",
        element: <CustomTshirtDetailPage />,
      },
      {
        path: "product/custom-print-tshirt",
        element: <TshirtProductDetail />,
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