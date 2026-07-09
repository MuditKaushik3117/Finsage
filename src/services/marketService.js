const API = "http://localhost:5000/api/market";

export async function getStock(symbol) {

    const res = await fetch(`${API}/${symbol}`);

    const data = await res.json();

    return data;

}

