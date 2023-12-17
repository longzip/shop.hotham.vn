import { AppProvider } from "./context/AppContext";
import { LiveChatLoaderProvider, Messenger } from "react-live-chat-loader";
import Header from "./Header";
import Footer from "./Footer";
import client from "./ApolloClient";
import Router from "next/router";
import NProgress from "nprogress";
import { ApolloProvider } from "@apollo/client";
import { FB_PAGE_ID } from "../../lib/constants";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Layout = (props) => {
  return (
    <LiveChatLoaderProvider provider="messenger" providerKey={FB_PAGE_ID}>
      <AppProvider>
        <ApolloProvider client={client}>
          <>
            <Header
              siteSeo={props.siteSeo}
              mainMenu={props.mainMenu}
              mobileMenu={props.mobileMenu}
              productCategories={props.productCategories}
            />
            {props.children}
            <Footer
              siteSeo={props.siteSeo}
              footerMenu={props.footerMenu}
              footerMenu2={props.footerMenu2}
            />
            <Messenger
              color="#f8b817"
              loggedInGreeting="Xin chào! Chúng tôi có thể giúp gì cho bạn?"
              loggedOutGreeting="Xin chào! Chúng tôi có thể giúp gì cho bạn?"
            />
          </>
        </ApolloProvider>
      </AppProvider>
    </LiveChatLoaderProvider>
  );
};

export default Layout;
