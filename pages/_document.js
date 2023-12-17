import Document, { Html, Head, Main, NextScript } from "next/document";
import { FB_PIXEL_ID } from "../lib/fpixel";
import { FB_PAGE_ID, MAILCHIMP_FORM_CONN } from "../lib/constants";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="vi">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
          ) : null}
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
          ) : null}
        </body>
      </Html>
    );
  }
}
