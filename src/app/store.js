import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import leadsSlice from '../features/leads/leadSlice'
import customerSlice from '../features/customers/customerSlice'
import customerCategorySlice from '../features/customerCategories/customerCategorySlice'
import policySlice from '../features/policies/policySlice';
import genderSlice from '../features/commonprops/gender/genderSlice'
import maritalStatusSlice from '../features/commonprops/maritalstatus/maritalStatusSlice'
import premiumCoversSlice from '../features/commonprops/premiumCovers/premiumCoversSlice'
import billingInfoSlice from '../features/billingInfo/billingInfoSlice'

const combinedReducer = {
  header : headerSlice,
  rightDrawer : rightDrawerSlice,
  modal : modalSlice,
  lead : leadsSlice,
  customer : customerSlice,
  customercategory : customerCategorySlice,
  policy : policySlice,
  gender : genderSlice,
  maritalstatus : maritalStatusSlice,
  premiumCover : premiumCoversSlice,
  billing : billingInfoSlice,
}

export default configureStore({
    reducer: combinedReducer
})