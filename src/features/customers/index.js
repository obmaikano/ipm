import moment from "moment"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../common/modalSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TitleCard from "../../components/Cards/TitleCard"
import { getCustomersContent } from "./customerSlice"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewCustomerModal = () => {
        dispatch(openModal({title : "Add New Customer", bodyType : MODAL_BODY_TYPES.CUSTOMER_ADD_NEW}))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewCustomerModal()}>Add New</button>
        </div>
    )
}

function Customers() {

    const { customers } = useSelector(state => state.customer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCustomersContent())
    }, [])

    const deleteCurrentCustomer = (index) => {
        dispatch(openModal({title : "Confirmation", bodyType : MODAL_BODY_TYPES.CONFIRMATION,
        extraObject : { message : `Are you sure you want to delete this customer?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.CUSTOMER_DELETE, index}}))
    }

    return(
        <>
            <TitleCard title="Current Customers" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Payroll Number</th>
                            <th>Cell Number</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Created By</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                customers.map((l, k) => {
                                    return(
                                        <tr key={k}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={l.avatar} alt="Avatar" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{l.first_name}</div>
                                                    <div className="text-sm opacity-50">{l.last_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{l.payroll_number}</td>
                                        <td>{l.cell_number}</td>
                                        <td>{moment(new Date()).add(-5*(k+2), 'days').format("DD MMM YY")}</td>
                                        
                                        <td>{l.status}</td>
                                        <td>{l.last_name}</td>
                                        <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentCustomer(k)}><TrashIcon className="w-5"/></button></td>
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

export default Customers