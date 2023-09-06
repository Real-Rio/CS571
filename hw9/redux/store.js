import { configureStore } from '@reduxjs/toolkit'
import articlesSlice from './articlesSlice.js'
import tagsSlice from './tagsSlice.js'
export default configureStore({
  reducer: {
    articles: articlesSlice,
    tags: tagsSlice,
  }
})