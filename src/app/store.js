import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import leadsSlice from '../features/leads/leadSlice'
import customerSlice from '../features/customers/customerSlice'
import customerCategorySlice from '../features/customerCategories/customerCategorySlice'

const combinedReducer = {
  header : headerSlice,
  rightDrawer : rightDrawerSlice,
  modal : modalSlice,
  lead : leadsSlice,
  customer : customerSlice,
  customercategory : customerCategorySlice
}

export default configureStore({
    reducer: combinedReducer
})