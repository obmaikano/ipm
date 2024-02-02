import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputText from "../../../components/Input/InputText"
import ErrorText from "../../../components/Typography/ErrorText"
import SelectBox from "../../../components/Input/SelectBox"
import { showNotification } from "../../common/headerSlice"
import { postPerson } from "../personSlice"

const INITIAL_CUSTOMER_OBJ = {
    firstname: "",
    lastname: "",
    otherName: "",
    gender: "",
    dateOfBirth: "",
    identity: "",
    title: "",
    maritalStatus: "",
    employerId: "",
    primaryEmail: "",
    secondaryEmail: "",
    primaryMobile: "",
    secondaryMobile: "",
    physicalAddress: "",
    postalAddress: ""
}

const INTIAL_BANK_ACCOUNT_OBJ = {
    accountName: "",
    accountNumber: "",
    branchCode: "",
    cardNumber: "",
    cardExpiry: "",
}

function AddCustomerModalBody({ closeModal, size }) {
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("")
    const [currentStep, setCurrentStep] = useState(1); 
    const [customerObj, setCustomerObj] = useState(INITIAL_CUSTOMER_OBJ);
    const [bankAccountObj, setBankAccountObj] = useState(INTIAL_BANK_ACCOUNT_OBJ);

    const genderOptions = useSelector((state) => state.gender.genderOptions);
    const maritalStatusOptions = useSelector((state) => state.maritalstatus.maritalStatusOptions);
    
    const titleOptions = [
        { namlongValuee: 'Mr', value: 'mr' },
        { name: 'Mrs', value: 'mrs' },
        { name: 'Dr', value: 'dr' },
        { name: 'Prof', value: 'prof' },
    ];

    const employerOptions = [
        { longValue: 'Company A', value: 'companyA' },
        { name: 'Company B', value: 'companyB' },
        { name: 'Company C', value: 'companyC' },
        { name: 'Company D', value: 'companyD' },
    ];


    const saveNewCustomer = () => {
        let newCustomerObj = {};
        let newBankAccountObj = {};
        // Validate and save customer data
        if (customerObj.firstname.trim() === "") return setErrorMessage("First Name is required!")
        else {
            newCustomerObj = {
                "firstname": customerObj.firstname,
                "lastname": customerObj.lastname,
                "otherName": customerObj.otherName,
                "gender": customerObj.gender,
                "dateOfBirth": customerObj.dateOfBirth,
                "identity": customerObj.identity,
                "title": customerObj.title,
                "maritalStatus": customerObj.maritalStatus,
                "employerId": customerObj.employerId,
                "primaryEmail": customerObj.primaryEmail,
                "secondaryEmail": customerObj.secondaryEmail,
                "primaryMobile": customerObj.primaryMobile,
                "secondaryMobile": customerObj.secondaryMobile,
                "physicalAddress": customerObj.physicalAddress,
                "postalAddress": customerObj.postalAddress
            }
        }
        if (bankAccountObj.accountNumber.trim() === "") return setErrorMessage("Account Number is required!")
        else {
            newBankAccountObj = {
                "accountNumber": bankAccountObj.accountNumber,
                "accountName": bankAccountObj.accountName,
                "branchCode": bankAccountObj.branchCode,
                "cardNumber": bankAccountObj.cardNumber,
                "cardExpiry": bankAccountObj.cardExpiry
            }
        }
        dispatch(postPerson(newCustomerObj))
        dispatch(showNotification({ message: "New Customer Added!", status: 1 }));
        closeModal();
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setCustomerObj({ ...customerObj, [updateType]: value });
        setBankAccountObj({...bankAccountObj, [updateType]: value});
    }

    const renderCustomerFields = () => {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <SelectBox labelTitle="Title" containerStyle="mt-4" placeholder="Select Title" labelStyle="text-sm font-medium text-gray-700" options={titleOptions} updateType="title" updateFormValue={updateFormValue} />

                    <InputText type="text" defaultValue={customerObj.firstname} updateType="firstname" containerStyle="mt-4" labelTitle="First Name" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={customerObj.otherName} updateType="otherName" containerStyle="mt-4" labelTitle="Other Name" updateFormValue={updateFormValue} />

                    <InputText type="text" defaultValue={customerObj.lastname} updateType="lastname" containerStyle="mt-4" labelTitle="Surname" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={customerObj.identity} updateType="identity" containerStyle="mt-4" labelTitle="Identity" updateFormValue={updateFormValue} />
                    <SelectBox labelTitle="Gender" containerStyle="mt-4" placeholder="Select Gender" labelStyle="text-sm font-medium text-gray-700" options={genderOptions} updateType="gender" updateFormValue={updateFormValue} />
                    <InputText type="date" defaultValue={customerObj.dateOfBirth} updateType="dateOfBirth" containerStyle="mt-4" labelTitle="Date of Birth" updateFormValue={updateFormValue} />
                   
                    <SelectBox labelTitle="Marital Status" containerStyle="mt-4" placeholder="Select Marital Status" labelStyle="text-sm font-medium text-gray-700" options={maritalStatusOptions} updateType="maritalStatus" updateFormValue={updateFormValue} />
                    <SelectBox labelTitle="Employer" containerStyle="mt-4" placeholder="Select Employer" labelStyle="text-sm font-medium text-gray-700" options={employerOptions} updateType="employerId" updateFormValue={updateFormValue} />
                </div>
            </>
        );
    };

    const renderCustomerAddressFields = () => {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <InputText type="text" defaultValue={customerObj.primaryMobile} updateType="primaryMobile" containerStyle="mt-4" labelTitle="Primary Mobile" updateFormValue={updateFormValue} />

                    <InputText type="text" defaultValue={customerObj.secondaryMobile} updateType="secondaryMobile" containerStyle="mt-4" labelTitle="Secondary Mobile" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={customerObj.primaryEmail} updateType="primaryEmail" containerStyle="mt-4" labelTitle="Primary Email" updateFormValue={updateFormValue} />

                    <InputText type="text" defaultValue={customerObj.secondaryEmail} updateType="secondaryEmail" containerStyle="mt-4" labelTitle="Secondary Email" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={customerObj.physicalAddress} updateType="physicalAddress" containerStyle="mt-4" labelTitle="Physical Address" updateFormValue={updateFormValue} />

                    <InputText type="date" defaultValue={customerObj.postalAddress} updateType="postalAddress" containerStyle="mt-4" labelTitle="Postal Address" updateFormValue={updateFormValue} />
                </div>
            </>
        );
    };

    const renderBankFields = () => {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText type="text" defaultValue={bankAccountObj.accountName} updateType="accountName" containerStyle="mt-4" labelTitle="Account Name" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={bankAccountObj.accountNumber} updateType="accountNumber" containerStyle="mt-4" labelTitle="Account Number" updateFormValue={updateFormValue} />

                    <InputText type="text" defaultValue={bankAccountObj.branchCode} updateType="branchCode" containerStyle="mt-4" labelTitle="Branch Code" updateFormValue={updateFormValue} />
                    <InputText type="text" defaultValue={bankAccountObj.cardNumber} updateType="cardNumber" containerStyle="mt-4" labelTitle="Card Number" updateFormValue={updateFormValue} />

                    <InputText type="date" defaultValue={bankAccountObj.cardExpiry} updateType="cardExpiry" containerStyle="mt-4" labelTitle="Card Expiry" updateFormValue={updateFormValue} />
                </div>
            </>
        );
    };

    const renderConfirmation = () => {
        return (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <h2>Customer Details:</h2>
            </div>
      
            <div className="col-span-2">
              <p><strong>Title:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.title}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>First Name:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.firstname}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Other Name:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.otherName}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Surname:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.lastname}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Identity:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.identity}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Date of Birth:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.dateOfBirth}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Gender:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.gender}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Marital Status:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.maritalStatus}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Employer:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.employerId}</p>
            </div>
      
            <div className="col-span-12">
              <h2>Customer Address Details:</h2>
            </div>
      
            <div className="col-span-2">
              <p><strong>Primary Mobile:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.primaryMobile}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Secondary Mobile:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.secondaryMobile}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Primary Email:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.primaryEmail}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Secondary Email:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.secondaryEmail}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Physical Address:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.physicalAddress}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Postal Address:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{customerObj.postalAddress}</p>
            </div>
      
            <div className="col-span-12">
              <h2>Bank Details:</h2>
            </div>
      
            <div className="col-span-2">
              <p><strong>Account Name:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{bankAccountObj.accountName}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Account Number:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{bankAccountObj.accountNumber}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Branch Code:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{bankAccountObj.branchCode}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Card Number:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{bankAccountObj.cardNumber}</p>
            </div>
      
            <div className="col-span-2">
              <p><strong>Card Expiry:</strong></p>
            </div>
            <div className="col-span-4">
              <p>{bankAccountObj.cardExpiry}</p>
            </div>
          </div>
        );
      };
      

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
            key: "customerObj",
            title: "Customer Details",
            component: renderCustomerFields,
        },
        {
            key: "customerObj",
            title: "Address Details",
            component: renderCustomerAddressFields,
        },
        {
            key: "bankAccountObj",
            title: "Bank Details",
            component: renderBankFields,
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
                                    saveNewCustomer();
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

export default AddCustomerModalBody