const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface PageResult<T> {
  records: T[];
  total: number;
  page: number;
  pageSize: number;
}

class ApiClient {
  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return headers;
  }

  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: this.getAuthHeaders(),
    });
    const json: ApiResponse<T> = await res.json();
    if (json.code !== 200) throw new Error(json.message);
    return json.data;
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
    const json: ApiResponse<T> = await res.json();
    if (json.code !== 200) throw new Error(json.message);
    return json.data;
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
    const json: ApiResponse<T> = await res.json();
    if (json.code !== 200) throw new Error(json.message);
    return json.data;
  }

  async del<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });
    const json: ApiResponse<T> = await res.json();
    if (json.code !== 200) throw new Error(json.message);
    return json.data;
  }
}

export const api = new ApiClient();
export type { ApiResponse, PageResult };
