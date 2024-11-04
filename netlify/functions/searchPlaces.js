export const handler = async (event) => {
  try {
    const { query } = JSON.parse(event.body);
    const apiKey = process.env.VITE_GOOGLE_API_KEY;

    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Query parameter is required" }),
      };
    }

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Google API response error: ${response.statusText}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to fetch from Google Places API" }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.results),
    };
  } catch (error) {
    console.error("Error fetching data from Google Places API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error while fetching data from Google Places API" }),
    };
  }
};
