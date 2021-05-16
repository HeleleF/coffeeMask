export default async function getVideoStats() {
  const r = await fetch("/api/stats");
  const json = await r.json();

  console.log(json);

  return json;
}
