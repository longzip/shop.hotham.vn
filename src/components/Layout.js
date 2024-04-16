import { AppProvider } from "./context/AppContext";
import Header from "./Header";
import Footer from "./Footer";
import client from "./ApolloClient";
import { ApolloProvider } from "@apollo/client";

const Layout = (props) => {
  return (
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
        </>
      </ApolloProvider>
    </AppProvider>
  );
};

export default Layout;
