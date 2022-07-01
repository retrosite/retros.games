import Link from "next/link";
import NormalLayout from "../layouts/NormalLayout";
import Section from "../components/Section";
import styles from "./404.module.scss";

// 404 page.
const NotFound = () => (
  <NormalLayout>
    <Section>
      <div className={styles.not_found}>
        <div className={styles.text}>
          <div>Page not found</div>
          <div>
            Try{" "}
            <Link href="/#games">
              <a>finding the game</a>
            </Link>{" "}
            you're looking for
          </div>
        </div>
      </div>
    </Section>
  </NormalLayout>
);

export default NotFound;
