import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../common/modalSlice"
import TitleCard from "../../components/Cards/TitleCard"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import { useNavigate } from "react-router-dom"
import { getEmployer, getAllEmployers } from "./employerSlice"
import DataTable from 'react-data-table-component';


const TopSideButtons = () => {
    const dispatch = useDispatch();

    const openAddNewEmployerModal = () => {
        dispatch(openModal({ title: "Add New Employer", size: "lg", bodyType: MODAL_BODY_TYPES.EMPLOYER_ADD_NEW }))
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
        dispatch(getAllEmployers())
    }, []);

    const deleteCurrentEmployer = (index) => {
        dispatch(openModal({
            title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Are you sure you want to delete this employer?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.EMPLOYER_DELETE, index }
        }))
    }

    const viewCurrentEmployer = (index) => {
        dispatch(getEmployer(index))
            .then((employerData) => {
                navigate(`/app/employers/${index}`, { state: { employerData } });
            })
            .catch((error) => {
                console.error('Error fetching employer: ', error.message);
            });
    }

    const columns = [
        {
            name: "Employer Number",
            selector: (row) => row.employerNumber,
            sortable: true,
        },
        {
            name: "Employer Name",
            selector: (row) => row.employerName,
            sortable: true,
        },
        {
            name: "Deduction Code",
            selector: (row) => row.deductionCode,
            sortable: true,
        },
        {
            name: "Employer Type",
            selector: (row) => row.employerType,
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
                    <button className="btn btn-square btn-ghost" onClick={() => viewCurrentEmployer(row.id)}><EyeIcon className="w-5" /></button>
                    <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentEmployer(row.id)}><TrashIcon className="w-5" /></button>
                    {/* Add more buttons as needed */}
                </div>
            ),
        },
    ]

    const employersColletion = employers
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
            employerNumber: element.employerNumber,
            employerName: element.employerName,
            deductionCode: element.deductionCode,
            employerType: element.employerType,
            lastUpdateBy: element.lastUpdateBy,
            createDate: element.createDate,
        }));


    return (
        <>
            <TitleCard title="All Employers" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <DataTable
                        columns={columns}
                        data={employersColletion}
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

export default Employers