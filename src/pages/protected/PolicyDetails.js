import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { useEffect } from "react";
import PolicyDetails from "../../features/policies/components/ViewPolicyPage";

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Policy Details"}))
    }, [])

    return(
        <PolicyDetails />
    )
}

export default InternalPage