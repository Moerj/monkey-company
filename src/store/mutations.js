// 请求公共数据
export const update = (state, payload) => {
    state[payload.modules] = payload.data
}