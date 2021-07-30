import { useEffect } from "react";
import { Can } from "../components/Can";
import { useAuth } from "../contexts/AuthContext";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";
import styles from "./home.module.css";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  });
  return (
    <div className={styles.container}>
      <h1>
        Autenticado <br />
        {user?.email}
      </h1>
      <button onClick={signOut}>Sair</button>
      <Can permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Can>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const res = await apiClient.get("/me");

  return {
    props: {},
  };
});
