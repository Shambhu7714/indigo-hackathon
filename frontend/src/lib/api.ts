/** Thin API client — wraps fetch calls to the FastAPI backend */

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1'

type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string }

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  token?: string,
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (token) headers['Authorization'] = `Bearer ${token}`

    const res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!res.ok) {
      let detail = `HTTP ${res.status}`
      try {
        const err = await res.json()
        detail = err.detail ?? detail
      } catch {
        /* non-JSON error body */
      }
      return { ok: false, error: detail }
    }

    const data: T = await res.json()
    return { ok: true, data }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Network error'
    return { ok: false, error: msg }
  }
}

// ─── Auth ───────────────────────────────────────────────────────────────────

export interface ApiUser {
  id: string
  email: string
  full_name: string
  is_active: boolean
  created_at: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
  user: ApiUser
}

export const authApi = {
  signup(email: string, full_name: string, password: string) {
    return request<TokenResponse>('POST', '/auth/signup', { email, full_name, password })
  },

  login(email: string, password: string) {
    return request<TokenResponse>('POST', '/auth/login', { email, password })
  },

  me(token: string) {
    return request<ApiUser>('GET', '/auth/me', undefined, token)
  },

  logout(token: string) {
    return request<{ message: string }>('POST', '/auth/logout', undefined, token)
  },
}
