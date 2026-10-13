export default async function Home() {
  const response = await fetch(
    "https://test-api.ad6.com/api/machines",
  );

  if (!response.ok) {
    return <p>Impossible de charger les machines.</p>;
  }

  const machines = await response.json();

  return (
    <main>
      <h1>Machines de l’usine</h1>

      <ul>
        {machines.map((machine) => (
          <li key={machine.id}>
            {machine.name} — {machine.workshop} — {machine.status}
          </li>
        ))}
      </ul>
    </main>
  );
}
