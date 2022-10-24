import Head from "next/head";
import { AppProvider } from "./context/AppContext";
import Header from "./Header";
import Footer from "./Footer";
import client from "./ApolloClient";
import Router from "next/router";
import NProgress from "nprogress";
import { ApolloProvider } from "@apollo/client";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Layout = (props) => {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <>
          <Head>
            <title>
              Hàng tiêu dùng thiết yếu bình ổn thị trường ở Bưu điện xã Tự Lập
            </title>
          </Head>
          <Header
            siteSeo={props.siteSeo}
            fbPageId={props.fbPageId}
            mainMenu={props.mainMenu}
            mobileMenu={props.mobileMenu}
          />
          {props.children}
          <Footer
            siteSeo={props.siteSeo}
            fbPageId={props.fbPageId}
            footerMenu={props.footerMenu}
            footerMenu2={props.footerMenu2}
          />
        </>
      </ApolloProvider>
    </AppProvider>
  );
};

export default Layout;
