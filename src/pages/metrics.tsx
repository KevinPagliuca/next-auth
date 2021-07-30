import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";
import styles from "./home.module.css";

export default function Metrics() {
  
  return (
    <div className={styles.container}>
      <h1>
        Metricas
      </h1>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const res = await apiClient.get("/me");

  return {
    props: {},
  };
}, {
  permissions: ['metrics.list'],
  roles: ['editor'],
});
