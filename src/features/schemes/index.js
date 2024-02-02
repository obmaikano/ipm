import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchPremiumCoverProducts, fetchSinglePremiumCover } from "../commonprops/premiumCovers/premiumCoversSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil"
import TitleCard from "../../components/Cards/TitleCard"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import EyeIcon from "@heroicons/react/24/outline/EyeIcon"
import DataTable from 'react-data-table-component';
import { openModal } from "../common/modalSlice"

const TopSideButtons = () => {
    const dispatch = useDispatch()

    const openAddNewSchemeModal = async () => {
        try {

        } catch (error) {
            console.log("Error fetching resources: ", error);
        }
    };

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewSchemeModal()}>Add New</button>
        </div>
    )
}

function Schemes() {

    const { premiumCovers } = useSelector(state => state.premiumCover)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchPremiumCoverProducts())
    }, [])

    const deleteCurrentScheme = (index) => {
        dispatch(openModal({
            title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Are you sure you want to delete this scheme?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.POLICY_DELETE, index }
        }))
    }

    const viewCurrentScheme = (index) => {
        dispatch(fetchSinglePremiumCover(index))
            .then((schemeData) => {
                navigate(`/app/schemes/${index}`, { state: { schemeData } });
            })
            .catch((error) => {
                // Handle error, e.g., show an error message
                console.error('Error fetching scheme:', error.message);
                // Show an error message to the user
            });
    }

    const columns = [
        {
            name: "Code",
            selector: (row) => row.productCode,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.productName,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.productDescription,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.productType,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Underwriter",
            selector: (row) => row.productUnderwriter,
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
                    <button className="btn btn-square btn-ghost" onClick={() => viewCurrentScheme(row.id)}><EyeIcon className="w-5" /></button>
                    <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentScheme(row.id)}><TrashIcon className="w-5" /></button>
                    {/* Add more buttons as needed */}
                </div>
            ),
        },
    ]

    const schemesColletion = premiumCovers
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
            productCode: element.productCode,
            productName: element.productName,
            productDescription: element.productDescription,
            status: element.status,
            productType: element.productType,
            productUnderwriter: element.productUnderwriter,
            lastUpdateBy: element.lastUpdateBy,
            createDate: element.createDate,
        }));

        return (
            <>
                <TitleCard title="All Schemes" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                    <div className="overflow-x-auto w-full">
                        <DataTable
                            columns={columns}
                            data={schemesColletion}
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

export default Schemes