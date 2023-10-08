import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../common/modalSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TitleCard from "../../components/Cards/TitleCard"
import { getCustomerCategoriesContent } from "./customerCategorySlice"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { useEffect } from "react";
import moment from "moment";


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

    const { customercategories } = useSelector(state => state.customercategory)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCustomerCategoriesContent())
    }, [])

    const deleteCurrentCustomerCategory = (index) => {
        dispatch(openModal({title : "Confirmation", bodyType : MODAL_BODY_TYPES.CONFIRMATION,
        extraObject : { message : `Are you sure you want to delete this customer category?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.CUSTOMER_CATEGORY_DELETE, index}}))
    }

    return (
        <>
            <TitleCard title="Current Customer Categories" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Created At</th>
                                <th>Created By</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customercategories.map((l, k) => {
                                    return(
                                        <tr key={k}>
                                        <td>{l.category_name}</td>
                                        <td>{l.description}</td>
                                        <td>{moment(new Date()).add(-5*(k+2), 'days').format("DD MMM YY")}</td>
                                        <td>{l.createdBy}</td>
                                        <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentCustomerCategory(k)}><TrashIcon className="w-5"/></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}

export default CustomerCategories