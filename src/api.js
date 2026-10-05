const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')
const TOKEN_KEY = 'pingpong_admin_token'

export const auth = {
  getToken: () => localStorage.getItem(TOKEN_KEY) || '',
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token.trim().replace(/^Bearer\s+/i, '')),
  clear: () => localStorage.removeItem(TOKEN_KEY)
}

const toQuery = (params = {}) => {
  const q = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) q.set(key, String(value))
  })
  return q.toString() ? `?${q}` : ''
}

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.getToken()}`,
      ...options.headers
    }
  })
  const body = await response.json().catch(() => null)
  if (!response.ok || !body || body.code !== 200) {
    const error = new Error(body?.msg || `请求失败（${response.status}）`)
    error.code = body?.code || response.status
    throw error
  }
  return body.data
}

export const adminApi = {
  verify: () => request('/auth/userinfo'),
  dashboard: (params) => request(`/admin/dashboard${toQuery(params)}`),
  matchStats: () => request('/admin/stats/matches'),
  leisureStats: () => request('/admin/stats/leisure'),
  feedbacks: () => request('/admin/feedbacks'),
  operationLogs: (params) => request(`/admin/operation-logs${toQuery(params)}`)
}
