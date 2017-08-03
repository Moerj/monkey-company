// 请求公共数据
export const fetch = (state, payload) => {
    state[payload.modules] = payload.data
}