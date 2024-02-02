import { useDispatch, useSelector } from "react-redux"
import { getAllPolicies, getPolicy } from "./policySlice"
import { useEffect, useState } from "react"
import { openModal } from "../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil"
import TitleCard from "../../components/Cards/TitleCard"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import EyeIcon from "@heroicons/react/24/outline/EyeIcon"
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const TopSideButtons = () => {
    const dispatch = useDispatch()

    const openAddNewPolicyModal = async () => {
        try {
            dispatch(openModal({ title: "Add New Policy", size: "lg", bodyType: MODAL_BODY_TYPES.POLICY_ADD_NEW }))
        } catch (error) {
            console.log("Error fetching resources: ", error);
        }
    };

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

    const [searchText, setSearchText] = useState()

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
                // Navigate to a new route and pass policy data as state
                navigate(`/app/policies/${index}`, { state: { policyData } });
            })
            .catch((error) => {
                // Handle error, e.g., show an error message
                console.error('Error fetching policy:', error.message);
                // Show an error message to the user
            });
    }

    const columns = [
        {
            name: "Policy Number",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Customer",
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: "Policy Product",
            selector: (row) => row.createdBy,
            sortable: true,
        },
        {
            name: "Premium",
            selector: (row) => row.totalPremium,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.policyStatus,
            sortable: true,
        },
        {
            name: "Last Update By",
            selector: (row) => row.lastUpdateBy,
            sortable: true,
        },
        {
            name: "Date Created",
            selector: (row) => row.createDate,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div>
                    {/* Add your action buttons here */}
                    <button className="btn btn-square btn-ghost" onClick={() => viewCurrentPolicy(row.id)}><EyeIcon className="w-5" /></button>
                    <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentPolicy(row.id)}><TrashIcon className="w-5" /></button>
                    {/* Add more buttons as needed */}
                </div>
            ),
        },
    ]

    const policiesColletion = policies
        .filter((item) => {
            const values = Object.values(item);
            //const lowercaseSearchText = searchText.toLowerCase();
            return values.some((value) => {
                if (typeof value === "string" || typeof value === "number") {
                    return String(value).toLowerCase().includes(value);
                }
                return false;
            });
        })
        .map((element) => ({
            id: element.id,
            totalPremium: element.totalPremium,
            policyStatus: element.policyStatus,
            lastUpdateBy: element.lastUpdateBy,
            createDate: element.createDate,
        }));


    return (
        <>
            <TitleCard title="All Policies" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <DataTable
                        columns={columns}
                        data={policiesColletion}
                        pagination
                        subHeader
                        selectableRows
                        persistTableHead
                    />
                </div>
            </TitleCard>
        </>
    )
}

export default Policies