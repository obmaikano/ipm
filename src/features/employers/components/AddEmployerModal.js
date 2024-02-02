import { useState } from "react";
import { useDispatch } from "react-redux";
import { postEmployer } from "../employerSlice";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";

const INITIAL_EMPLOYER_OBJ = {
    employerNumber: "",
    employerName: "",
    deductionCode: "",
    deductionType: "",
    deductionFee: "",
    deductionFeeType: "",
    employerType: "",
    employerClass: "",
    scheduleType: "",
    submissionType: "",
    adminOfficer: "",
    adminOfficeTelephone: "",
    adminOfficerEmail: "",
    status: "",
    createdBy: "",
    createDate: new Date().toISOString(),
};

function AddEmployerModalBody({ closeModal, size }) {
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("")
    const [employerObj, setEmployerObj] = useState(INITIAL_EMPLOYER_OBJ)
    const [currentStep, setCurrentStep] = useState(1)

    const saveNewEmployer = () => {
        let newEmployerObj = {};

        if (employerObj.employerName.trim() === "") {
            return setErrorMessage("Please enter Employer Name!");
        } else {
            newEmployerObj = {
                employerNumber: employerObj.employerNumber,
                employerName: employerObj.employerName,
                deductionCode: employerObj.deductionCode,
                deductionType: employerObj.deductionType,
                deductionFee: employerObj.deductionFee,
                deductionFeeType: employerObj.deductionFeeType,
                employerType: employerObj.employerType,
                employerClass: employerObj.employerClass,
                scheduleType: employerObj.scheduleType,
                submissionType: employerObj.submissionType,
                adminOfficer: employerObj.adminOfficer,
                adminOfficeTelephone: employerObj.adminOfficeTelephone,
                adminOfficerEmail: employerObj.adminOfficerEmail,
            };
        }

        dispatch(postEmployer(newEmployerObj));
        dispatch(showNotification({ message: "New Employer Added!", status: 1}));

        closeModal();
    };

    const updateFormValue = ({ updateType, value}) => {
        setErrorMessage("")
        setEmployerObj({ ...employerObj, [updateType]: value})
    }

    const renderBasicFields = () => {
        return(
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <InputText type="text" defaultValue={employerObj.employerName} updateType="employerName" containerStyle="mt-4" labelTitle="Employer Name" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.employerNumber} updateType="employerNumber" containerStyle="mt-4" labelTitle="Employer Number" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.deductionCode} updateType="deductionCode" containerStyle="mt-4" labelTitle="Deduction Code" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.deductionType} updateType="deductionType" containerStyle="mt-4" labelTitle="Deduction Type" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.deductionFee} updateType="deductionFee" containerStyle="mt-4" labelTitle="Deduction Fee" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.deductionFeeType} updateType="deductionFeeType" containerStyle="mt-4" labelTitle="Deduction Fee Type" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.employerType} updateType="employerType" containerStyle="mt-4" labelTitle="Employer Type" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.employerClass} updateType="employerClass" containerStyle="mt-4" labelTitle="Employer Class" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.scheduleType} updateType="scheduleType" containerStyle="mt-4" labelTitle="Schedule Type" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.submissionType} updateType="submissionType" containerStyle="mt-4" labelTitle="Submission Type" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.adminOfficer} updateType="adminOfficer" containerStyle="mt-4" labelTitle="Admin Officer" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.adminOfficeTelephone} updateType="adminOfficeTelephone" containerStyle="mt-4" labelTitle="Admin Office Telephone" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.adminOfficerEmail} updateType="adminOfficerEmail" containerStyle="mt-4" labelTitle="Admin Officer Email" updateFormValue={updateFormValue} />
                </div>
            </>
        )
    }

    const renderContactFields = () => {
        return(
            <>  
            {/*
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <InputText type="text" defaultValue={employerObj.employerType} updateType="employerType" containerStyle="mt-4" labelTitle="Employer Type" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.employerClass} updateType="employerClass" containerStyle="mt-4" labelTitle="Employer Class" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.scheduleType} updateType="scheduleType" containerStyle="mt-4" labelTitle="Schedule Type" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.submissionType} updateType="submissionType" containerStyle="mt-4" labelTitle="Submission Type" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.adminOfficer} updateType="adminOfficer" containerStyle="mt-4" labelTitle="Admin Officer" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.adminOfficeTelephone} updateType="adminOfficeTelephone" containerStyle="mt-4" labelTitle="Admin Office Telephone" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={employerObj.adminOfficerEmail} updateType="adminOfficerEmail" containerStyle="mt-4" labelTitle="Admin Officer Email" updateFormValue={updateFormValue} />
                </div>
            */}
            </>
        )
    }

    const renderStepFields = () => {
        const currentStepData = stepComponents[currentStep - 1];
        return (
            <>
                <h2>{currentStepData.title}</h2>
                {currentStepData.component()}
            </>
        );
    };

    const stepComponents = [
        {
            key: "employerObj",
            title: "Basic Information",
            component: renderBasicFields,
        }
    ];

    return (
        <div className="modal-dialog">
            <div className={`modal-content ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                <div className="modal-body">
                    {renderStepFields()}
                    <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
                    <div className="modal-action">
                       {/*} <button
                            className="btn btn-ghost"
                            onClick={() => setCurrentStep(currentStep - 1)}
                            disabled={currentStep === 1}
                        >
                            Previous
                        </button>*/}

                        <button
                            className="btn btn-primary px-6"
                            onClick={() => {
                                if (currentStep < stepComponents.length) {
                                    setCurrentStep(currentStep + 1);
                                } else {
                                    saveNewEmployer();
                                }
                            }}
                        >
                            {currentStep < stepComponents.length ? "Next" : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AddEmployerModalBody
