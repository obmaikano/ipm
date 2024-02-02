import { useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import Field from "../../../components/Input/Field"
import DateUtils from "../../../utils/DateUtils"

const TopSideButtons = () => {
    const handleEditEmployer = () => {

    }

    return (
        <div className="inline-block float-right space-x-4">
            <button className="btn px-6 btn-sm normal-case btn-secondary" onClick={() => handleEditEmployer()}>Edit</button>
        </div>
    )
}

function EmployerDetails() {

    const employerData = useSelector((state) => state.employer.selectedEmployer);

    return (
        <>
            <TitleCard title="Employer" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {employerData && (
                    <>
                        <div className="grid grid-cols-1 gap-8">
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <p className="text-xl font-semibold mb-4">Employer Information</p>
                                <div className="grid grid-cols-2 gap-4 text-gray-600">
                                    <Field label="Employer Number" value={employerData.employerNumber} />
                                    <Field label="Employer Name" value={employerData.employerName} />
                                    <Field label="Deduction Code" value={employerData.deductionCode} />
                                    <Field label="Deduction Type" value={employerData.deductionType} />
                                    <Field label="Deduction Fee" value={employerData.deductionFee} />
                                    <Field label="Deduction Fee Type" value={employerData.deductionFeeType} />
                                    <Field label="Employer Type" value={employerData.employerType} />
                                    <Field label="Employer Class" value={employerData.employerClass} />
                                    <Field label="Schedule Type" value={employerData.scheduleType} />
                                    <Field label="Submission Type" value={employerData.submissionType} />
                                    <Field label="Admin Officer" value={employerData.adminOfficer} />
                                    <Field label="Admin Office Telephone" value={employerData.adminOfficeTelephone} />
                                    <Field label="Admin Officer Email" value={employerData.adminOfficerEmail} />
                                    <Field label="Status" value={employerData.status} />
                                    <Field label="Created By" value={employerData.createdBy} />
                                    <Field label="Create Date" value={DateUtils.formatDate(employerData.createDate)} />
                                    <Field label="Updated By" value={employerData.updatedBy} />
                                    <Field label="Update Date" value={DateUtils.formatDate(employerData.updateDate)} />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </TitleCard>
        </>
    )

}

export default EmployerDetails