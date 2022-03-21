import App from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/index.scss";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import Footer from "@/components/shared/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <div className="portfolio-app">
      <Navbar />
      {pageProps.data}
      {Component.name === "Home" && <Hero />}
      <div className="container">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

MyApp.getInitialProps = async (context) => {
  const initialProps =
    App.getInitialProps && (await App.getInitialProps(context));
  console.log("initialProps", initialProps);
  return { pageProps: { data: "app data", ...initialProps.pageProps } };
};
export default MyApp;
