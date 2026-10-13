export default async function Home() {
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
      <h1>Machines de l’usine</h1>

      <p>
        {machinesEnMarche} machines en marche sur {machines.length}
      </p>

      <ul>
        {machines.map((machine) => (
          <li key={machine.id}>
            {machine.name} — {machine.workshop} — {machine.status}
          </li>
        ))}
      </ul>

      <h2>Commandes</h2>
      <p>{commandesEnRetard} commande(s) en retard</p>

      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.id} — {order.customer} — {order.product}
            {" — "}
            {order.produced} / {order.quantity} pièces
            {" — "}
            {order.status}
          </li>
        ))}
      </ul>
    </main>
  );
}
