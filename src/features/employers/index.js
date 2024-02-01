import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../common/modalSlice"
import TitleCard from "../../components/Cards/TitleCard"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import { useNavigate } from "react-router-dom"
import { getEmployer } from "./employerSlice"

const TopSideButtons = () => {
    const dispatch = useDispatch();

    const openAddNewEmployerModal = () => {
        dispatch(openModal({ title: "Add New Employer", size: "lg", bodyType: MODAL_BODY_TYPES.EMPLOYER_ADD_NEW}))
    }

    return (
        <div className="inline-block float-right">
            <button className="btn ps-6 btn-sm normal-case btn-primary" onClick={() => openAddNewEmployerModal()}>Add New</button>
        </div>
    )
}

function Employers() {

    const { employers } = useSelector(state => state.employer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        //dispatch(getAllEmployers)
    });

    const deleteCurrentEmployer = (index) => {
        dispatch(openModal({
            title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Are you sure you want to delete this employer?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.EMPLOYER_DELETE, index }
        }))
    }

    const viewCurrentEmployer = (index) => {
        dispatch(getEmployer(index))
        .then((employerData) => {
            navigate(`/app/employers/${index}`, {state: { employerData } });
        })
        .catch((error) => {
            console.error('Error fetching employer: ', error.message);
        });
    }

    return (
        <>
            <TitleCard title="All Employers" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
            <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Employer Number</th>
                                <th>Name</th>
                                <th>Deduction Code</th>
                                <th>Type</th>
                                <th>Created By</th>
                                <th>Date Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employers.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>{l.employerNumber}</td>
                                            <td>{l.employerName}</td>
                                            <td>{l.deductionCode}</td>
                                            <td>{l.employerType}</td>
                                            <td>{l.updatedBy}</td>
                                            <td>{l.createDate}</td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => viewCurrentEmployer(k)}><EyeIcon className="w-5" /></button>
                                            <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentEmployer(k)}><TrashIcon className="w-5" /></button></td>
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

export default Employers