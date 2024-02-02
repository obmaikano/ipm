import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../../common/modalSlice"
import TitleCard from "../../../components/Cards/TitleCard"
import Field from "../../../components/Input/Field"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil"
import { fetchPremiumCoverPlan } from "../../commonprops/premiumCovers/premiumCoversSlice"
import { useNavigate } from "react-router-dom"
import DataTable from 'react-data-table-component';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import EyeIcon from "@heroicons/react/24/outline/EyeIcon"

const TopSideButtons = () => {
    const handleEditScheme = () => {

    }

    return (
        <div className="inline-block float-right space-x-4">
            <button className="btn px-6 btn-sm normal-case btn-secondary" onClick={() => handleEditScheme()}>Edit</button>
        </div>
    )
}

const ProductPlanTopSideButtons = () => {
    const dispatch = useDispatch();

    const openAddProductPlanModal = () => {
        dispatch(openModal({ title: "Add New Product Plan", size: 'lg', bodyType: 'PRODUCT_PLAN_MODAL' }))
    };

    return (
        <div className="inline-block float-right mb-4">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddProductPlanModal()}>
                Add Product Plan
            </button>
        </div>
    );
}

function SchemeDetails() {
    const schemeData = useSelector((state) => state.premiumCover.selectedPremiumCover);

    return (
        <>
            <TitleCard title="Scheme" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {schemeData && (
                    <>
                        <div className="grid grid-cols-1 gap-8">
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <p className="text-xl font-semibold mb-4">Scheme Information</p>
                                <div className="grid grid-cols-2 gap-4 text-gray-600">
                                    <Field label="Scheme Code" value={schemeData.productCode} />
                                    <Field label="Scheme Name" value={schemeData.productName} />
                                    <Field label="Scheme Description" value={schemeData.productDescription} />
                                    <Field label="Scheme Type" value={schemeData.productType} />
                                    <Field label="Status" value={schemeData.status} />
                                    <Field label="Scheme Underwriter" value={schemeData.productUnderwriter || 'N/A'} />
                                    <Field label="Waiting Period" value={schemeData.waitingPeriod || 'N/A'} />
                                </div>
                            </div>

                            {/* Other sections go here */}

                            <div className="mb-8"></div>

                            <div className="bg-gray-100 p-6 rounded-lg">
                                <p className="text-xl font-semibold mb-4">Product Plans</p>
                                {/* Table for Dependents */}
                                <ProductPlanTopSideButtons />
                                <ProductPlansTable productPlans={schemeData.policyProductPlan} />
                            </div>
                        </div>
                    </>
                )}
            </TitleCard>
        </>
    )
}

const ProductPlansTable = ({ productPlans }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const deleteCurrentProductPlan = (index) => {
        dispatch(openModal({
            title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Are you sure you want to delete this product plan?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.POLICY_DELETE, index }
        }))
    }

    const viewSelectedProductPlan = (index) => {
        dispatch(fetchPremiumCoverPlan(index))
            .then((productPlanData) => {
                navigate(`/app/product-plans/${index}`, { state: { productPlanData } });
            })
            .catch((error) => {
                console.error('Error fetching product plan: ', error.message);
            })
    }

    const columns = [
        {
            name: "Product Plan Code",
            selector: (row) => row.productPlanCode,
            sortable: true,
        },
        {
            name: "Product Plan Name",
            selector: (row) => row.productPlanName,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div>
                    <button className="btn btn-square btn-ghost" onClick={() => viewSelectedProductPlan(row.id)}><EyeIcon className="w-5" /></button>
                    <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentProductPlan(row.id)}><TrashIcon className="w-5" /></button>
                </div>
            ),
        },
    ];

    productPlans = productPlans
        .filter((item) => {
            const values = Object.values(item);
            return values.some((value) => {
                if (typeof value === "string" || typeof value === "number") {
                    return String(value).toLowerCase().includes(value);
                }
                return false;
            });
        })
        .map((element) => ({
            id: element.id,
            productPlanCode: element.productPlanCode,
            productPlanName: element.productPlanName
        }))

    return (
        <>
            <div className="overflow-x-auto w-full">
                <DataTable
                    columns={columns}
                    data={productPlans}
                    pagination
                    subHeader
                    selectableRows
                    persistTableHead
                />
            </div>
        </>
    )
}

export default SchemeDetails