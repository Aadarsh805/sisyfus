export function getStealthMetaData(): string[] | undefined {
  const stealthMetaData = localStorage.getItem("stealthMetaData");
  if (!stealthMetaData) return;
  const parsedStealthMetaData = JSON.parse(stealthMetaData);
  return parsedStealthMetaData.data;
}
