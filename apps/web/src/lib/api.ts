
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T>{
    const token = localStorage.getItem("zarp-token");

    const headers: Record<string, string> = {
        "Content-Type" : "application/json",
        ...(options.headers as Record<string, string> | undefined),
    };

    if(token){
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers
    });

    const data = await response.json().catch(() => null)

    if(!response.ok){
        throw new Error(data?.error ?? "Error del servidor")
    }

    return data as T

}