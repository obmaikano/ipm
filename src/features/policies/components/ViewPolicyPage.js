import { useDispatch } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { openModal } from "../../common/modalSlice";
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";


const TopSideButtons = () => {
    const dispatch = useDispatch()

    const handleEditPolicy = () => {
        // Logic for editing a policy
    };

    const handleDeletePolicy = () => {
        // Logic for deleting a policy
    };

    const handleGenerateReport = () => {
        // Logic for generating a report
    };

    const handleSuspendActivatePolicy = () => {
        // Logic for suspending or activating a policy
    };

    const handlePrintPolicyDetails = () => {
        // Logic for printing policy details
    };

    const handleAddNote = () => {
        // Logic for adding a note to a policy
    };


    return (
        <div className="inline-block float-right space-x-4">
            <button className="btn px-6 btn-sm normal-case btn-secondary" onClick={() => handleEditPolicy()}>Edit</button>
            <button className="btn px-6 btn-sm normal-case btn-danger" onClick={() => handleDeletePolicy()}>Delete</button>
            <button className="btn px-6 btn-sm normal-case btn-success" onClick={() => handleGenerateReport()}>Generate Report</button>
            <button className="btn px-6 btn-sm normal-case btn-warning" onClick={() => handleSuspendActivatePolicy()}>Suspend/Activate</button>
            <button className="btn px-6 btn-sm normal-case btn-info" onClick={() => handlePrintPolicyDetails()}>Print Details</button>
            <button className="btn px-6 btn-sm normal-case btn-secondary" onClick={() => handleAddNote()}>Add Note</button>
        </div>
    )
}

const DependentsTopSideButtons = () => {
    const dispatch = useDispatch();

    const openAddDependentModal = () => {
        dispatch(openModal({ title: 'Add New Dependent', size: 'lg', bodyType: 'DEPENDENT_MODAL_TYPE' }));
        // Replace 'YOUR_DEPENDENT_MODAL_TYPE' with the actual modal body type for adding a new dependent
    };

    return (
        <div className="inline-block float-right mb-4">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddDependentModal()}>
                Add Dependent
            </button>
        </div>
    );
};

const deleteSelectedDependent = (index) => {

}

const viewSelectedDependent = (index) => {

}

function PolicyDetails() {
    const policyData = useSelector((state) => state.policy.selectedPolicy);

    return (
        <>
            <TitleCard title="Policy" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {policyData && (
                    <>
                        <div className="grid grid-cols-1 gap-8">
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <p className="text-xl font-semibold mb-4">Policy Information</p>
                                <div className="grid grid-cols-2 gap-4 text-gray-600">
                                    <Field label="Policy ID" value={policyData.policyId} />
                                    <Field label="Scheme" value={policyData.schemeId} />
                                    <Field label="Product" value={policyData.productId} />
                                    <Field label="Agent Code" value={policyData.agentCode} />
                                    <Field label="Policy Duration" value={policyData.policyDuration} />
                                    <Field label="Policy Start Date" value={formatDate(policyData.policyStartDate)} />
                                    <Field label="Policy End Date" value={formatDate(policyData.policyEndDate)} />
                                    <Field label="Policy Activation Date" value={formatDate(policyData.policyActivationDate)} />
                                    <Field label="Billing" value={policyData.billingId} />
                                    <Field label="Old Policy Number" value={policyData.oldPolicyNumber} />
                                    <Field label="Billing Frequency" value={policyData.billingFrequency} />
                                    <Field label="File Number" value={policyData.fileNumber} />
                                    <Field label="Branch Name" value={policyData.branchName} />
                                    <Field label="Notes" value={policyData.notes} />
                                    <Field label="Description" value={policyData.description} />
                                    <Field label="Previous Deduction Date" value={formatDate(policyData.previousDeductionDate)} />
                                    <Field label="Previous Deduction Amount" value={policyData.previousDeductionAmount} />
                                    <Field label="Total Cover Amount" value={policyData.totalCoverAmount} />
                                    <Field label="Total Premium" value={policyData.totalPremium} />
                                    <Field label="Policy Status" value={policyData.policyStatus} />
                                    <Field label="Create Date" value={formatDate(policyData.createDate)} />
                                    <Field label="Update Date" value={formatDate(policyData.updateDate)} />
                                    <Field label="Last Update By" value={policyData.lastUpdateBy} />
                                </div>
                            </div>

                            {/*<div className="bg-gray-100 p-6 rounded-lg">
                                <p className="text-xl font-semibold mb-4">Policy Details</p>
                                {policyData.policyDetails.map((detail, index) => (
                                    <div key={index} className="mb-6">
                                        <p className="text-lg font-semibold mb-2">Detail {index + 1}</p>
                                        <Field label="Policy" data={detail.policy} />
                                        <Field label="Person" data={detail.personId} />
                                        <Field label="Relationship" value={detail.relationship} />
                                        <Field label="Category" value={detail.category} />
                                        <Field label="Join Date" value={formatDate(detail.joinDate)} />
                                        <Field label="Benefit Date" value={formatDate(detail.benefitDate)} />
                                        <Field label="Premium" value={detail.premium} />
                                        <Field label="Sum Insured" value={detail.sumInsured} />
                                        <Field label="Description" value={detail.description} />
                                        <Field label="Notes" value={detail.notes} />
                                        <Field label="Create Date" value={formatDate(detail.createDate)} />
                                        <Field label="Update Date" value={formatDate(detail.updateDate)} />
                                        <Field label="Last Update By" value={detail.lastUpdateBy} />
                                        <Field label="Status" value={detail.status} />
                                    </div>
                                ))}
                            </div>*/}
                        </div>

                        <div className="mb-8"></div>

                        <div className="bg-gray-100 p-6 rounded-lg">
                            <p className="text-xl font-semibold mb-4">Dependents</p>
                            {/* Table for Dependents */}
                            <DependentsTopSideButtons />
                            <DependentsTable dependents={policyData.policyDetails} />
                        </div>
                    </>
                )}
            </TitleCard>
        </>
    );
}

// Custom reusable group component
const Group = ({ label, data }) => (
    <div className="mb-4">
        <p className="text-lg font-semibold mb-2">{label}</p>
        {Object.entries(data).map(([key, value], index) => (
            <Field key={index} label={key} value={value} />
        ))}
    </div>
);

const DependentsTable = ({ dependents }) => (
    <table className="w-full border-collapse border border-gray-300">
        <thead>
            <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">ID no./Passport no.</th>
                <th className="border border-gray-300 p-2">Title</th>
                <th className="border border-gray-300 p-2">Full Name</th>
                <th className="border border-gray-300 p-2">Relationship</th>
                <th className="border border-gray-300 p-2">Premium</th>
                <th className="border border-gray-300 p-2">Actions</th>
                {/* Add more table headers as needed */}
            </tr>
        </thead>
        <tbody>
            {dependents.map((dependent, index) => (
                <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : ''}>
                    <td className="border border-gray-300 p-2">{dependent.personId.identity}</td>
                    <td className="border border-gray-300 p-2">{dependent.personId.title}</td>
                    <td className="border border-gray-300 p-2">{dependent.personId.firstname + ' ' + dependent.personId.surname}</td>
                    <td className="border border-gray-300 p-2">{dependent.relationship}</td>
                    <td className="border border-gray-300 p-2 text-right">{dependent.premium}</td>
                    <td className="border border-gray-300 p-2 text-center">
                        <button className="btn btn-square btn-ghost" onClick={() => viewSelectedDependent(index)}><EyeIcon className="w-5" /></button>
                        <button className="btn btn-square btn-ghost" onClick={() => deleteSelectedDependent(index)}><TrashIcon className="w-5" /></button>
                    </td>
                    {/* Add more table cells as needed */}
                </tr>
            ))}
        </tbody>
    </table>
);

// Custom reusable field component
const Field = ({ label, value }) => (
    <div className="flex items-center mb-2">
        <p className="w-1/3 font-bold">{label}</p>
        <p className="w-2/3">{value || "N/A"}</p>
    </div>
);

// Helper function to format date
const formatDate = (dateString) => {
    return dateString ? format(new Date(dateString), "yyyy-MM-dd HH:mm:ss") : "N/A";
};

export default PolicyDetails