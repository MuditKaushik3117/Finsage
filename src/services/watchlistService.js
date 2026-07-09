const API = "http://localhost:5000/api/watchlist";

export async function addWatchlist(userId, symbol) {

    const res = await fetch(API, {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            userId,
            symbol
        })

    });

    return await res.json();

}

export async function getWatchlist(userId){

    const res = await fetch(`${API}/${userId}`);

    return await res.json();

}

export async function deleteWatchlist(id){

    await fetch(`${API}/${id}`,{

        method:"DELETE"

    });

}

