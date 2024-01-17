import { useDispatch, useSelector } from "react-redux"
import { getAllPolicies, getPolicy } from "./policySlice"
import { useEffect } from "react"
import { openModal } from "../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil"
import TitleCard from "../../components/Cards/TitleCard"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import EyeIcon from "@heroicons/react/24/outline/EyeIcon"
import { useNavigate } from 'react-router-dom';

const TopSideButtons = () => {
    const dispatch = useDispatch()
   

    const openAddNewPolicyModal = () => {
        dispatch(openModal({ title: "Add New Policy", size: "lg", bodyType: MODAL_BODY_TYPES.POLICY_ADD_NEW }))
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewPolicyModal()}>Add New</button>
        </div>
    )
}

function Policies() {

    const { policies } = useSelector(state => state.policy)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllPolicies())
    }, [])

    const deleteCurrentPolicy = (index) => {
        dispatch(openModal({
            title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Are you sure you want to delete this policy?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.POLICY_DELETE, index }
        }))
    }

    const viewCurrentPolicy = (index) => {
        // Dispatch the getPolicy action with the policyId
        dispatch(getPolicy(index))
            .then((policyData) => {
                // Handle success, e.g., navigate to a new route with policy details
                console.log('Policy data:', policyData);
                // Navigate to a new route and pass policy data as state
                navigate(`/app/policies/${index}`, { state: { policyData } });
            })
            .catch((error) => {
                // Handle error, e.g., show an error message
                console.error('Error fetching policy:', error.message);
                // Show an error message to the user
            });
    }

    return (
        <>
            <TitleCard title="All Policies" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Policy Number</th>
                                <th>Customer</th>
                                <th>Policy Product</th>
                                <th>Premium</th>
                                <th>Status</th>
                                <th>Created By</th>
                                <th>Date Created</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                policies.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>{l.fileNumber}</td>
                                            <td></td>
                                            <td></td>
                                            <td>{l.totalPremium}</td>
                                            <td>{l.policyStatus}</td>
                                            <td>{l.lastUpdateBy}</td>
                                            <td>{l.createDate}</td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => viewCurrentPolicy(k)}><EyeIcon className="w-5" /></button></td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentPolicy(k)}><TrashIcon className="w-5" /></button></td>
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

export default Policies