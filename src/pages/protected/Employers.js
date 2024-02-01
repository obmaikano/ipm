import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Employers from "../../features/employers";

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Employers"}))
    }, [])

    return(
        <Employers />
    )
}

export default InternalPage