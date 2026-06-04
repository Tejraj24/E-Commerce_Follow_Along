import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  LoginPage, 
  SignupPage, 
  CreateProduct, 
  MyProducts, 
  Cart, 
  ProductDetails, 
  Profile, 
  CreateAddress, 
  SelectAddress, 
  OrderConfirmation,
  MenProducts,
  MensBestsellers,
  SearchResults
} from "./Routes.jsx";
import Home_working from "./pages/Home_working.jsx";
import OvermodeHeader from "./components/OvermodeHeader.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";
import { isWebp } from "./utils/overmodeUtils.js";

function App() {
  useEffect(() => {
    isWebp();
    console.log('App loaded successfully');
    
    // Add structured data scripts
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Overmode LLC",
      "url": "https://overmode.com",
      "logo": "https://overmode.com/frontend/img/logo.svg",
      "description": "Overmode is a global online fashion aggregator. We offer a wide selection of women's and men's clothing and accessories.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "8 The Green, Suit B",
        "addressLocality": "Dover",
        "addressRegion": "DE",
        "postalCode": "19901",
        "addressCountry": "US"
      },
      "telephone": "+1 302 310-4783"
    };

    const websiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://overmode.com"
    };

    // Create and append organization schema
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.textContent = JSON.stringify(organizationData);
    document.head.appendChild(orgScript);

    // Create and append website schema
    const webScript = document.createElement('script');
    webScript.type = 'application/ld+json';
    webScript.textContent = JSON.stringify(websiteData);
    document.head.appendChild(webScript);

    // Add Cloudflare Insights script
    const cloudflareScript = document.createElement('script');
    cloudflareScript.src = 'https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015';
    cloudflareScript.integrity = 'sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==';
    cloudflareScript.setAttribute('data-cf-beacon', '{"version":"2024.11.0","token":"4fedd34cc5f84ca297a2300d8d8d2dc2","server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}');
    cloudflareScript.crossOrigin = 'anonymous';
    cloudflareScript.defer = true;
    document.body.appendChild(cloudflareScript);

    // Add main.min.js script
    const mainScript = document.createElement('script');
    mainScript.src = 'https://cdn89689517.ahacdn.me/frontend/js/main.min.js';
    document.body.appendChild(mainScript);

    return () => {
      // Cleanup scripts on unmount
      if (orgScript.parentNode) {
        orgScript.parentNode.removeChild(orgScript);
      }
      if (webScript.parentNode) {
        webScript.parentNode.removeChild(webScript);
      }
      if (cloudflareScript.parentNode) {
        cloudflareScript.parentNode.removeChild(cloudflareScript);
      }
      if (mainScript.parentNode) {
        mainScript.parentNode.removeChild(mainScript);
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <div id="app" className="wrapper">
        <OvermodeHeader />
        <main className="main">
          <Routes>
            <Route path='/' element={<Home_working />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/create-product/:id" element={<CreateProduct />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/create-address' element={<CreateAddress />} />
            <Route path="/select-address" element={<SelectAddress />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/men" element={<MenProducts />} />
            <Route path="/collections/mens-bestsellers" element={<MensBestsellers />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
