import fetch from "node-fetch";
async function fetchData() {
  // try {
  const response = await fetch(
    "https://eu.vatapi.com/v2/vat-rate-check?rate_type=TBE&country_code=DE",
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "25pHSVcc4G1yUxd8SNT2x8pYyByuk6LDRdV2OCD1",
      },
    }
  );

  const data = await response.json();
  const vatRate = data.rates.telecoms.standard.rate;
  console.log(vatRate);
  return vatRate;
  // } catch (error) {
  //   console.error("Fetch error:", error);
  // }
}
fetchData();
