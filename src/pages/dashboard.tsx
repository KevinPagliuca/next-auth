import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";
import styles from "./home.module.css";

export default function Dashboard() {
  const { user } = useAuth();

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
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  await apiClient.get("/me");

  return {
    props: {},
  };
});
