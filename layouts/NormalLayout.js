import Head from "../components/Head";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import PageContent from "../components/PageContent";
import Glow from "../components/Glow";

// The default, normal layout.
const Normal = ({ children }) => (
  <>
    {/* Hidden page metadata. */}
    <Head />
    {/* Top of the page. */}
    <Header />
    <Glow />
    {/* Main content of the page. */}
    <Main>
      {!children && <PageContent />}
      {children}
    </Main>
    {/* Bottom of the page. */}
    <Footer />
  </>
);

export default Normal;
