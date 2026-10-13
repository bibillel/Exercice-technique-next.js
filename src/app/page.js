import { Suspense } from "react";

async function Dashboard() {
  const response = await fetch(
    "https://test-api.ad6.com/api/machines",
    { cache: "no-store" }
  );

  if (!response.ok) {
    return <p>Impossible de charger les machines.</p>;
  }

  const machines = await response.json();

  const ordersResponse = await fetch(
    "https://test-api.ad6.com/api/orders",
    { cache: "no-store" }
  );

  if (!ordersResponse.ok) {
    return <p>Impossible de charger les commandes.</p>;
  }

  const orders = await ordersResponse.json();

  const commandesEnRetard = orders.filter(
    (order) => order.status === "delayed"
  ).length;

  const machinesEnMarche = machines.filter(
    (machine) => machine.status === "running"
  ).length;

  return (
  <main>
    <h1>Dashboard de l’usine</h1>

    <h2>Machines</h2>
    <p>
      {machinesEnMarche} machines en marche sur {machines.length}
    </p>

    <table>
      <thead>
        <tr>
          <th>Machine</th>
          <th>Atelier</th>
          <th>Statut</th>
          <th>Rendement</th>
        </tr>
      </thead>

      <tbody>
        {machines.map((machine) => (
          <tr key={machine.id}>
            <td>{machine.name}</td>
            <td>{machine.workshop}</td>
            <td>{machine.status}</td>
            <td>
              {machine.efficiency == null
                ? "Non renseigné"
                : `${machine.efficiency} %`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2>Commandes</h2>
    <p>{commandesEnRetard} commande(s) en retard</p>

    <table>
      <thead>
        <tr>
          <th>Commande</th>
          <th>Client</th>
          <th>Produit</th>
          <th>Production</th>
          <th>Statut</th>
          <th>Priorité</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customer}</td>
            <td>{order.product}</td>
            <td>{order.produced} / {order.quantity}</td>
            <td>{order.status}</td>
            <td>{order.priority ?? "Non renseignée"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </main>
);
}

export default function Home() {
  return (
    <Suspense fallback={<p>Chargement des données de l’usine…</p>}>
      <Dashboard />
    </Suspense>
  );
}
