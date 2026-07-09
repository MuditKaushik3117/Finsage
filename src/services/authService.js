const API = "http://localhost:5000/api/auth";

export async function registerUser(user) {

    const res = await fetch(`${API}/register`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(user)

    });

    return await res.json();

}

export async function loginUser(user) {

    const res = await fetch(`${API}/login`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(user)

    });

    return await res.json();

}

