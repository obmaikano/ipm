import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TitleCard from "../../components/Cards/TitleCard"

const TopSideButtons = () => {
    const dispatch = useDispatch()

    const openAddNewCustomerCategoryModal = () => {
        dispatch(openModal({title : "Add New Customer Category", bodyType : MODAL_BODY_TYPES.CUSTOMER_CATEGORY_ADD_NEW}))
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewCustomerCategoryModal()}>Add New</button>
        </div>
    )
}

function CustomerCategories() {
    return (
        <>
            <TitleCard title="Current Customer Categories" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

            </TitleCard>
        </>
    )
}

export default CustomerCategories