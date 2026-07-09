const API = "http://localhost:5000/api/assessment";

export async function saveAssessment(assessmentData) {
    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(assessmentData)
    });
    return await res.json();
}

export async function getAssessment(userId) {
    const res = await fetch(`${API}/${userId}`);
    return await res.json();
}
