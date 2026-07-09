const API = "http://localhost:5000/api/portfolio";

export async function getPortfolio(userId) {
    const res = await fetch(`${API}/${userId}`);
    return await res.json();
}

export async function generatePortfolio(userId) {
    const res = await fetch(`${API}/generate/${userId}`, {
        method: "POST"
    });

    return await res.json();
}

