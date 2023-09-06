import { createSlice } from '@reduxjs/toolkit'

export const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        value: []
    },
    reducers: {
        setTagsRedux: (state, action) => {
            state.value = action.payload
        },
        addTag: (state, action) => {
            if (!state.value.includes(action.payload))
                state.value.push(action.payload);
        },
        removeTag: (state, action) => {
            if (state.value.includes(action.payload))
                state.value = state.value.filter(tag => tag !== action.payload);
        }
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { setTagsRedux, addTag, removeTag } = tagsSlice.actions

export default tagsSlice.reducer