import fetch from "node-fetch";

export const handler = async (event) => {
  const { query } = JSON.parse(event.body);
  const apiKey = process.env.VITE_GOOGLE_API_KEY;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch from Google Places API");
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.results),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching data from Google Places API" }),
    };
  }
};
