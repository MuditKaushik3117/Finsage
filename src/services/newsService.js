const API="http://localhost:5000/api/news";

export async function getNews(symbol){

const res=await fetch(`${API}/${symbol}`);

return await res.json();

}

