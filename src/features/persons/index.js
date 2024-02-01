import moment from "moment"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../common/modalSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TitleCard from "../../components/Cards/TitleCard"
import { getAllPersons } from "./personSlice"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import EyeIcon from '@heroicons/react/24/outline/EyeIcon'
import { fetchGenderOptions } from "../commonprops/gender/genderSlice"
import { fetchMaritalStatusOptions } from "../commonprops/maritalstatus/maritalStatusSlice"

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewCustomerModal = async () => {
        try {
            // Fetch gender options
            await dispatch(fetchGenderOptions());
            await dispatch(fetchMaritalStatusOptions());

            // Once the data is fetched, open the "Add New Customer" modal
            dispatch(openModal({ title: "Add New Customer", size: "lg", bodyType: MODAL_BODY_TYPES.CUSTOMER_ADD_NEW }));
        } catch (error) {
            console.error('Error fetching gender options:', error);
            // Handle the error, such as showing a notification to the user
        }
    };


    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewCustomerModal()}>Add New</button>
        </div>
    )
}

function Customers() {

    const { persons } = useSelector(state => state.person)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPersons())
    }, [])

    const deleteCurrentCustomer = (index) => {
        dispatch(openModal({
            title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Are you sure you want to delete this customer?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.CUSTOMER_DELETE, index }
        }))
    }

    return (
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
                                persons.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={l.avatar} alt="Avatar" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{l.firstname}</div>
                                                        <div className="text-sm opacity-50">{l.lastname}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{l.identity}</td>
                                            <td>{l.primaryMobile}</td>
                                            <td>{moment(new Date()).add(-5 * (k + 2), 'days').format("DD MMM YY")}</td>

                                            <td>{l.status}</td>
                                            <td>{l.lastname}</td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentCustomer(k)}><EyeIcon className="w-5" /></button></td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentCustomer(k)}><TrashIcon className="w-5" /></button></td>
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