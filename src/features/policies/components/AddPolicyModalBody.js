import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postPolicy } from "../policySlice";
import { showNotification } from "../../common/headerSlice";
import { useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import SelectBox from "../../../components/Input/SelectBox";
import SelectSearchBox from "../../../components/Input/SelectSearchBox";
import { fetchPremiumCoverProducts } from "../../commonprops/premiumCovers/premiumCoversSlice"

const INITIAL_POLICY_OBJ = {
    personId: 0,
    schemeId: "",
    productId: "",
    agentCode: "",
    policyDuration: "",
    policyStartDate: new Date().toISOString(),
    policyEndDate: new Date().toISOString(),
    policyActivationDate: new Date().toISOString(),
    billingId: "",
    oldPolicyNumber: "",
    billingFrequency: "",
    fileNumber: "",
    branchName: "",
    notes: "",
    description: "",
    previousDeductionDate: new Date().toISOString(),
    previousDeductionAmount: 0,
    totalCoverAmount: 0,
    totalPremium: 0,
    policyStatus: "",
    createDate: new Date().toISOString(),
    updateDate: new Date().toISOString(),
    lastUpdateBy: "",
};

// Set default values for some fields
INITIAL_POLICY_OBJ.totalCoverAmount = 0.0;
INITIAL_POLICY_OBJ.totalPremium = 0.0;

function AddPolicyModalBody({ closeModal, size }) {
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("")
    const [currentStep, setCurrentStep] = useState(1)
    const [policyObj, setPolicyObj] = useState(INITIAL_POLICY_OBJ)

    // Extract products and plans from the premiumCovers state
    const productOptions = useSelector((state) => state.premiumCover.premiumCovers);

    useEffect(() => {
        dispatch(fetchPremiumCoverProducts())
    }, [])
    
    console.log(productOptions);

    const saveNewPolicy = () => {
        let newPolicyObj = {};
     
        // Check if productId or schemeId is empty, and set an error message if true
        if (policyObj.productId.trim() === "") {
            return setErrorMessage("Select a product first!");
        } else if (policyObj.schemeId.trim() === "") {
            return setErrorMessage("Select a scheme first!");
        } else {
            // Populate newPolicyObj with values from policyObj
            newPolicyObj = {
                schemeId: policyObj.schemeId,
                productId: policyObj.productId,
                agentCode: policyObj.agentCode,
                policyDuration: policyObj.policyDuration,
                policyStartDate: policyObj.policyStartDate,
                policyEndDate: policyObj.policyEndDate,
                policyActivationDate: policyObj.policyActivationDate,
                billingId: policyObj.billingId,
                oldPolicyNumber: policyObj.oldPolicyNumber,
                billingFrequency: policyObj.billingFrequency,
                fileNumber: policyObj.fileNumber,
                branchName: policyObj.branchName,
                notes: policyObj.notes,
                description: policyObj.description,
                previousDeductionDate: policyObj.previousDeductionDate,
                previousDeductionAmount: policyObj.previousDeductionAmount,
                totalCoverAmount: policyObj.totalCoverAmount,
                totalPremium: policyObj.totalPremium,
                policyStatus: policyObj.policyStatus,
                createDate: policyObj.createDate,
                updateDate: policyObj.updateDate,
                lastUpdateBy: policyObj.lastUpdateBy,
            };
        }
    
        // Dispatch actions for posting policy and showing notification
        dispatch(postPolicy({ newPolicyObj }));
        dispatch(showNotification({ message: "New Policy Added!", status: 1 }));
        
        // Close the modal
        closeModal();
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setPolicyObj({ ...policyObj, [updateType]: value })
    }

    const renderBasicInformationFields = () => {
        return(
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Person ID */}
                    <SelectSearchBox labelTitle="Customer" containerStyle="mt-4" placeholder="Select Customer" labelStyle="text-sm font-medium text-gray-700" updateType="personId" updateFormValue={updateFormValue} fetchOptionsEndpoint="persons"/>
                    {/* Scheme ID */}
                    <SelectBox labelTitle="Scheme" containerStyle="mt-4" placeholder="Select Scheme" labelStyle="text-sm font-medium text-gray-700" options={productOptions} updateType="schemeId" updateFormValue={updateFormValue} />
                    {/* Product ID */}
                    <SelectBox labelTitle="Product" containerStyle="mt-4" placeholder="Select Product" labelStyle="text-sm font-medium text-gray-700" options={productOptions} updateType="productId" updateFormValue={updateFormValue} />
                    {/* Product ID */}
                    <SelectBox labelTitle="Product" containerStyle="mt-4" placeholder="Select Plan" labelStyle="text-sm font-medium text-gray-700" options={productOptions} updateType="productId" updateFormValue={updateFormValue} />
                    {/* Agent Code */}
                    <InputText type="text" defaultValue={policyObj.agentCode} updateType="agentCode" containerStyle="mt-4" labelTitle="Agent Code" updateFormValue={updateFormValue} />
                    {/* Policy Duration 
                    <InputText type="text" defaultValue={policyObj.policyDuration} updateType="policyDuration" containerStyle="mt-4" labelTitle="Policy Duration" updateFormValue={updateFormValue} />
                    {/* Policy Start Date 
                    <InputText type="date" defaultValue={policyObj.policyStartDate} updateType="policyStartDate" containerStyle="mt-4" labelTitle="Policy Start Date" updateFormValue={updateFormValue} />
                    {/* Policy End Date 
                    <InputText type="date" defaultValue={policyObj.policyEndDate} updateType="policyEndDate" containerStyle="mt-4" labelTitle="Policy End Date" updateFormValue={updateFormValue} />
                    {/* Policy Activation Date 
                    <InputText type="date" defaultValue={policyObj.policyActivationDate} updateType="policyActivationDate" containerStyle="mt-4" labelTitle="Policy Activation Date" updateFormValue={updateFormValue} />
                    */}
                </div>
            </>
        )
    };

    const renderBillingInformationFields = () => {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Billing ID */}
                    <InputText type="text" defaultValue={policyObj.billingId} updateType="billingId" containerStyle="mt-4" labelTitle="Billing" updateFormValue={updateFormValue} />
                    {/* Old Policy Number */}
                    <InputText type="text" defaultValue={policyObj.oldPolicyNumber} updateType="oldPolicyNumber" containerStyle="mt-4" labelTitle="Old Policy Number" updateFormValue={updateFormValue} />
                    {/* Billing Frequency */}
                    <InputText type="text" defaultValue={policyObj.billingFrequency} updateType="billingFrequency" containerStyle="mt-4" labelTitle="Billing Frequency" updateFormValue={updateFormValue} />
                </div>
            </>
        );
    };

    const renderFileAndBranchInformationFields = () => {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* File Number */}
                    <InputText type="text" defaultValue={policyObj.fileNumber} updateType="fileNumber" containerStyle="mt-4" labelTitle="File Number" updateFormValue={updateFormValue} />
                    {/* Branch Name */}
                    <InputText type="text" defaultValue={policyObj.branchName} updateType="branchName" containerStyle="mt-4" labelTitle="Branch Name" updateFormValue={updateFormValue} />
                    {/* Notes */}
                    <InputText type="text" defaultValue={policyObj.notes} updateType="notes" containerStyle="mt-4" labelTitle="Notes" updateFormValue={updateFormValue} />
                    {/* Description */}
                    <InputText type="text" defaultValue={policyObj.description} updateType="description" containerStyle="mt-4" labelTitle="Description" updateFormValue={updateFormValue} />
                </div>
            </>
        );
    };

    const renderFinancialDetailsFields = () => {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Previous Deduction Date 
                    <InputText type="date" defaultValue={policyObj.previousDeductionDate} updateType="previousDeductionDate" containerStyle="mt-4" labelTitle="Previous Deduction Date" updateFormValue={updateFormValue} />
                    {/* Previous Deduction Amount 
                    <InputText type="text" defaultValue={policyObj.previousDeductionAmount} updateType="previousDeductionAmount" containerStyle="mt-4" labelTitle="Previous Deduction Amount" updateFormValue={updateFormValue} />
                    {/* Total Cover Amount */}
                    <InputText type="text" defaultValue={policyObj.totalCoverAmount} updateType="totalCoverAmount" containerStyle="mt-4" labelTitle="Total Cover Amount" updateFormValue={updateFormValue} />
                    {/* Total Premium */}
                    <InputText type="text" defaultValue={policyObj.totalPremium} updateType="totalPremium" containerStyle="mt-4" labelTitle="Total Premium" updateFormValue={updateFormValue} />
                </div>
            </>
        );
    };

    const renderStatusAndDates = () => {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Policy Status */}
                    <InputText type="text" defaultValue={policyObj.policyStatus} updateType="policyStatus" containerStyle="mt-4" labelTitle="Policy Status" updateFormValue={updateFormValue} />
                    {/* Create Date */}
                    <InputText type="date" defaultValue={policyObj.createDate} updateType="createDate" containerStyle="mt-4" labelTitle="Create Date" updateFormValue={updateFormValue} />
                    {/* Update Date 
                    <InputText type="date" defaultValue={policyObj.updateDate} updateType="updateDate" containerStyle="mt-4" labelTitle="Update Date" updateFormValue={updateFormValue} />
                    {/* Last Update By 
                    <InputText type="text" defaultValue={policyObj.lastUpdateBy} updateType="lastUpdateBy" containerStyle="mt-4" labelTitle="Last Update By" updateFormValue={updateFormValue} />
                    */}
                </div>
            </>
        );
    };

    const renderConfirmation = () => {
        return (
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <h2>Policy Details:</h2>
                </div>

                <div className="col-span-2">
                    <p><strong>Principal:</strong></p>
                </div>
                <div className="col-span-4">
                    <p>{policyObj.personId}</p>
                </div>

                <div className="col-span-2">
                    <p><strong>Scheme:</strong></p>
                </div>
                <div className="col-span-4">
                    <p>{policyObj.schemeId}</p>
                </div>

                <div className="col-span-2">
                    <p><strong>Product:</strong></p>
                </div>
                <div className="col-span-4">
                    <p>{policyObj.productId}</p>
                </div>

                <div className="col-span-2">
                    <p><strong>Agent Code:</strong></p>
                </div>
                <div className="col-span-4">
                    <p>{policyObj.agentCode}</p>
                </div>
                {/*
                <div className="col-span-2">
                    <p><strong>Policy Start Date:</strong></p>
                </div>
                <div className="col-span-4">
                    <p>{policyObj.policyStartDate}</p>
                </div>

                <div className="col-span-2">
                    <p><strong>Policy End Date:</strong></p>
                </div>
                <div className="col-span-4">
                    <p>{policyObj.policyEndDate}</p>
                </div>

                <div className="col-span-2">
                    <p><strong>Policy Activation Date:</strong></p>
                </div>
                <div className="col-span-4">
                    <p>{policyObj.policyActivationDate}</p>
                </div>
                */}
                <div className="col-span-12">
                    <h2>Billing Details:</h2>
                </div>

                <div className="col-span-2">
                    <p><strong>Billing:</strong></p>
                </div>
                <div className="col-span-4">
                    <p>{policyObj.billingId}</p>
                </div>

                <div className="col-span-2">
                    <p><strong>Old Policy Number:</strong></p>
                </div>
                <div className="col-span-4">
                    <p>{policyObj.oldPolicyNumber}</p>
                </div>

                <div className="col-span-2">
                    <p><strong>Billing Frequency:</strong></p>
                </div>
                <div className="col-span-4">
                    <p>{policyObj.billingFrequency}</p>
                </div>
                <div className="col-span-12">
                    <h2>File and Branch Details:</h2>
                </div>

                <div className="col-span-2">
                    <p><strong>File Number:</strong></p>
                </div>
                <div className="col-span-4">
                    <p>{policyObj.fileNumber}</p>
                </div>

                <div className="col-span-2">
                    <p><strong>Branch Name:</strong></p>
                </div>
                <div className="col-span-4">
                    <p>{policyObj.branchName}</p>
                </div>

                <div className="col-span-2">
                    <p><strong>Notes:</strong></p>
                </div>
                <div className="col-span-4">
                    <p>{policyObj.notes}</p>
                </div>

                <div className="col-span-2">
                    <p><strong>Description:</strong></p>
                </div>
                <div className="col-span-4">
                    <p>{policyObj.description}</p>
                </div>
            </div>
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
            key: "policyObj",
            title: "Basic Information",
            component: renderBasicInformationFields,
        },
        {
            key: "policyObj",
            title: "Billing Information",
            component: renderBillingInformationFields,
        },
        {
            key: "policyObj",
            title: "File and Branch Information",
            component: renderFileAndBranchInformationFields,
        },
        {
            key: "policyObj",
            title: "Financial Details",
            component: renderFinancialDetailsFields,
        },
        {
            key: "confirmation",
            title: "Confirmation",
            component: renderConfirmation,
        },
    ];

    return (
        <div className="modal-dialog">
            <div className={`modal-content ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                <div className="modal-body">
                    {renderStepFields()}
                    <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
                    <div className="modal-action">
                        <button
                            className="btn btn-ghost"
                            onClick={() => setCurrentStep(currentStep - 1)}
                            disabled={currentStep === 1}
                        >
                            Previous
                        </button>

                        <button
                            className="btn btn-primary px-6"
                            onClick={() => {
                                if (currentStep < stepComponents.length) {
                                    setCurrentStep(currentStep + 1);
                                } else {
                                    saveNewPolicy();
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

export default AddPolicyModalBody