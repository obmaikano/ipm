import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard";
import Field from "../../../components/Input/Field";
import DataTable from 'react-data-table-component';

function ProductPlanDetails() {
    const productPlanData = useSelector((state) => state.premiumCover.selectedPlan);

    return (
        <>
            <TitleCard title="Product Plan" topMargin="mt-2">
                {productPlanData && (
                    <>
                        <div className="grid grid-cols-1 gap-8">
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <div className="grid grid-cols-2 gap-4 text-gray-600">
                                    <Field label="Product Plan Code" value={productPlanData.productPlanCode} />
                                    <Field label="Product Plan Name" value={productPlanData.productPlanName} />
                                </div>
                            </div>
                            <div className="mb-8"></div>
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <p className="text-xl font-semiblod mb-4">Policy Group Cover Premiums</p>
                                <GroupCoverPremiumsTable policyGroupCoverPremiums={productPlanData.policyGroupCoverPremiums} />
                            </div>
                            <div className="mb-8"></div>
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <p className="text-xl font-semiblod mb-4">Policy Group Cover Relationships</p>
                                <GroupCoverRelationshipsTable policyGroupCoverRelationships={productPlanData.policyGroupCoverRelationships} />
                            </div>
                            <div className="mb-8"></div>
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <p className="text-xl font-semiblod mb-4">Policy Cover Packages</p>
                                <PolicyCoverPackages policyCoverPackages={productPlanData.policyCoverPackages} />
                            </div>
                        </div>
                    </>
                )}
            </TitleCard>
        </>
    )
}

export const GroupCoverPremiumsTable = ({ policyGroupCoverPremiums }) => {
    const columns = [
        {
            name: "Product",
            selector: (row) => row.product,
            sortable: true,
        },
        {
            name: "Plan",
            selector: (row) => row.plan,
            sortable: true,
        },
        {
            name: "Relationship Group",
            selector: (row) => row.relationshipGroup,
            sortable: true,
        },
        {
            name: "Premium",
            selector: (row) => row.premium,
            sortable: true,
        },
    ]

    policyGroupCoverPremiums = policyGroupCoverPremiums
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
            product: element.product,
            plan: element.plan,
            relationshipGroup: element.relationshipGroup,
            premium: element.premium
        }))

    return (
        <>
            <div className="overflow-x-auto w-full">
                <DataTable
                    columns={columns}
                    data={policyGroupCoverPremiums}
                    pagination
                    subHeader
                    selectableRows
                    persistTableHead
                />
            </div>
        </>
    )
}


const GroupCoverRelationshipsTable = ({ policyGroupCoverRelationships }) => {
    const dispatch = useDispatch()

    const columns = [
        {
            name: "Relationship Group",
            selector: (row) => row.relationshipGroup,
            sortable: true,
        },
        {
            name: "Covered Relationship",
            selector: (row) => row.coveredRelationship,
            sortable: true,
        },
        {
            name: "Max Number Of Members",
            selector: (row) => row.maxNumberOfMembers,
            sortable: true,
        },
    ]

    policyGroupCoverRelationships = policyGroupCoverRelationships
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
            relationshipGroup: element.relationshipGroup,
            coveredRelationship: element.coveredRelationship,
            maxNumberOfMembers: element.maxNumberOfMembers
        }))

        return (
            <>
                <div className="overflow-x-auto w-full">
                    <DataTable
                        columns={columns}
                        data={policyGroupCoverRelationships}
                        pagination
                        subHeader
                        selectableRows
                        persistTableHead
                    />
                </div>
            </>
        )
}

const PolicyCoverPackages = ({ policyCoverPackages }) => {
    const columns = [
        {
            name: "Relationship Code",
            selector: (row) => row.relationshipCode,
            sortable: true,
        },
        {
            name: "Benefit Amount",
            selector: (row) => row.benefitAmount,
            sortable: true,
        },
        {
            name: "Premium",
            selector: (row) => row.premium,
            sortable: true,
        },
        {
            name: "Minimum Age",
            selector: (row) => row.minAge,
            sortable: true,
        },
        {
            name: "Maximum Age",
            selector: (row) => row.maxAge,
            sortable: true,
        },
    ]

    policyCoverPackages = policyCoverPackages
    .map((element) => ({
        id: element.id,
        relationshipCode: element.relationshipCode,
        benefitAmount: element.benefitAmount,
        premium: element.premium,
        minAge: element.minAge,
        maxAge: element.maxAge,
    }))

    return (
        <>
            <div className="overflow-x-auto w-full">
                <DataTable
                    columns={columns}
                    data={policyCoverPackages}
                    pagination
                    subHeader
                    selectableRows
                    persistTableHead
                />
            </div>
        </>
    )
}

export default ProductPlanDetails