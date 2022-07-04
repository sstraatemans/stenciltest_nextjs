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
`;

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = async () => {
      const res = await originalRenderPage();

      const wcHtml = await stencil.renderToString(res.html);
      res.html = wcHtml.html;
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
            {process.env.NODE_ENV !== 'production' && (
              <script dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }} />
            )}
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
