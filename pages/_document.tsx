import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import * as stencil from 'stenciltest/hydrate';

const noOverlayWorkaroundScript = `
  window.addEventListener('error', event => {
    event.stopImmediatePropagation()
  })

  window.addEventListener('unhandledrejection', event => {
    event.stopImmediatePropagation()
  })

  console.log = function () {};
  console.err = function () {};
  console.error = function () {};
`;

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = async () => {
      const res = await originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

      const wcHtml = await stencil.renderToString(res.html, {
        prettyHtml: true,
        removeScripts: true,
        removeBooleanAttributeQuotes: true,
        removeEmptyAttributes: true,
        removeHtmlComments: true,
      });

      var reg = /\<body[^>]*\>([^]*)\<\/body/m;
      const body = wcHtml.html.match(reg)[1];

      res.html = body;
      return res;
    };

    const initialProps = await Document.getInitialProps(ctx);

    const res = await ctx.renderPage();
    return initialProps;
  }

  render() {
    return (
      <>
        <Html>
          <Head>
            <>
              {process.env.NODE_ENV !== 'production' && (
                <script dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }} />
              )}

              <link rel='preconnect' href='https://fonts.googleapis.com' />
              <link rel='preconnect' href='https://fonts.gstatic.com' />
              <link
                href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap'
                rel='stylesheet'
              ></link>
            </>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      </>
    );
  }
}

export default MyDocument;
