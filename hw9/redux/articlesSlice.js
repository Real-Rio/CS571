import { createSlice } from '@reduxjs/toolkit'

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        value: []
    },
    reducers: {
        setArticlesRedux: (state, action) => {
            state.value = action.payload
        }
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { setArticlesRedux } = articlesSlice.actions

export default articlesSlice.reducer