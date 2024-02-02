function Field({ label, value }) {

    return (
        <div className="flex items-center mb-2">
            <p className="w-1/3 font-bold">{label}</p>
            <p className="w-2/3">{value || "N/A"}</p>
        </div>
    )

}

export default Field;