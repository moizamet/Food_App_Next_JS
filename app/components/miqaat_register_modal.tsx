import { FormEvent, ReactElement, useEffect, useState } from "react";
import apiService from "../services/APIServices";
import { useAuth } from "../auth_management/authProvider";
import { Miqaat_Registration } from "../Interface/Miqaat_Interface";

interface Miqaat_Register_Modal {
    miqaat_id: string;

}



// const Miqaat_Register_Modal: React.FC<Miqaat_Register_Modal> = ({ miqaat_id }) => {
const Miqaat_Register_Modal = (props: Miqaat_Register_Modal) => {

    const [family_member_count, setFamilyMemberCount] = useState(5)
    const [register_count, setRegisterCount] = useState("1")
    const [existing_registration, setExistingRegistration] = useState<Miqaat_Registration[]>([])
    const { miqaat_id } = props
    const auth = useAuth()
    const [sabeel, setSabeel] = useState("")
    const [error, setErrors] = useState("")

    const checkIfAlreadyRegistered = async () => {
        const response = await apiService.get(`api/miqaat_registration/${miqaat_id}`)
        const response_data = await response.json()
        console.log("Existing registrations")
        setExistingRegistration(response_data)
        if (response_data.length > 0) {
            setRegisterCount(response_data[0].user_count)
        }

    }

    const fetchInformation = async () => {
        
        if (auth.isAuthenticated===true && auth.context_userId){
            const response = await apiService.get("api/family_members?user_id=" + auth.context_userId)
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setFamilyMemberCount(data.length)
                setSabeel(data[0].sabeel)

            } else {
                console.log("Invalid User")
            }
        }
    }


   


    useEffect(() => {       
        fetchInformation()  
        checkIfAlreadyRegistered()
    }, [auth])

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Submitting form now --------------")
        if (parseInt(register_count) > family_member_count) {
            console.log("User is trying to add food for more family members than original in family ")
            setErrors("You cannot register members more than your family. Current family members count is [ " + family_member_count + " ]")
            return;
        }
        const body = {
            "miqaat_id": miqaat_id,
            "sabeel_id": sabeel,
            "user_count": register_count,
        }
        console.log(JSON.stringify(body))
        const response = await apiService.post("api/miqaat_registration", body)
        if (response.ok) {
            console.log("successfully added entry for counting")
            console.log(await response.json())
            setErrors("")
            const modal=document.getElementById('miqaat_registration_model') as  HTMLDialogElement
            modal.close()
            checkIfAlreadyRegistered()
        }
        else {
            console.log("error occured in miqaat registration")
        }

    }

    const submitUpdateForm = async (e: React.FormEvent) => {

        e.preventDefault()
        if (parseInt(register_count) > family_member_count) {
            console.log("User is trying to add food for more family members than original in family ")
            setErrors("You cannot register members more than your family. Current family members count is [ " + family_member_count + " ]")
            return;
        }
        const body = {
            "miqaat_id": miqaat_id,
            "sabeel_id": sabeel,
            "user_count": register_count,
        }
        console.log(JSON.stringify(body))
        const response = await apiService.put("api/miqaat_registration", body)
        if (response.ok) {
            console.log("successfully update entry for counting")
            console.log(await response.json())
            setErrors("")
            const modal=document.getElementById('miqaat_registration_update_model')as HTMLDialogElement
            modal.close()
            checkIfAlreadyRegistered()
        }
        else {
            console.log("error occured in miqaat registration")
        }

    }

    const removeRegistration=async()=>{
        console.log("removing now")
        const body = {
            "miqaat_id": miqaat_id,
            "sabeel_id": sabeel,
            "user_count": register_count,
        }
        const response=await apiService.delete("api/miqaat_registration", body)
        if (response.ok){
            console.log("Registration Deleted Successfully")
            checkIfAlreadyRegistered()

        }else{
            console.log("Something went wrong while removing registration")
        }

    }

    return (<>

        <div className="mt-6 flex flex-wrap justify-center gap-4">

            {existing_registration ? existing_registration.length > 0 ? <>
                <button
                    onClick={() => (document.getElementById('miqaat_registration_update_model') as HTMLDialogElement).showModal()}
                    className="btn btn-outline px-6 py-3 text-md font-medium shadow hover:shadow-md">Update</button>

                <button
                    onClick={removeRegistration}
                    className="btn btn-error btn-outline px-6 py-3 text-md font-medium shadow hover:shadow-md">Delete</button>
            </>
                : <>
                    <button onClick={() => (document.getElementById('miqaat_registration_model')as HTMLDialogElement).showModal()}

                        className="btn btn-primary px-6 py-3 text-md font-medium shadow hover:shadow-md">
                        Register
                    </button>

                </> : <div>Loading..</div>}

        </div>


        <div className="mt-6 bg-gray-900 text-white p-4 rounded-lg text-center shadow">
            <p className="text-md font-semibold">👥 Registered: <span className="font-bold text-yellow-400">
                {existing_registration && existing_registration.length > 0 ? existing_registration[0].user_count :
                    <span>No Registration Recorded</span>
                }</span></p>
        </div>









        <dialog id="miqaat_registration_model"
            className="modal flex items-center justify-center">
            <div className="modal-box rounded-2xl shadow-xl bg-base-100 p-6">
                <h3 className="font-bold text-2xl text-center text-primary">Register</h3>
                <p className="py-4 text-gray-600 text-center">Total Family Members: {family_member_count}</p>
                <div className="modal-action flex flex-col items-center gap-4">
                    <form onSubmit={(e) => { submitForm(e) }} className="w-full space-y-4">
                        <div>
                            <label className="label text-gray-700" htmlFor="email">Enter Counting</label>
                            <input
                                type="number"
                                id="username"
                                className="input input-bordered w-full rounded-lg"
                                placeholder="Enter your username"
                                value={register_count}
                                onChange={(e) => setRegisterCount(e.target.value)}
                                required
                            />
                        </div>
                        <p>{error}</p>

                        <div className="flex justify-between gap-2">
                            <button type="submit" className="btn btn-primary w-[45%]">Register</button>
                            <button className="btn btn-outline w-[45%]"
                                type="button"
                                onClick={() => (document.getElementById('miqaat_registration_model')as HTMLDialogElement).close()}
                            >Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>


        {/* Update Dialog */}
        <dialog id="miqaat_registration_update_model"
            className="modal flex items-center justify-center">
            <div className="modal-box rounded-2xl shadow-xl bg-base-100 p-6">
                <h3 className="font-bold text-2xl text-center text-primary">Update Registration</h3>
                <p className="py-4 text-gray-600 text-center">Total Family Members: {family_member_count}</p>
                <div className="modal-action flex flex-col items-center gap-4">
                    <form onSubmit={(e) => { submitUpdateForm(e) }} className="w-full space-y-4">
                        <div>
                            <label className="label text-gray-700" htmlFor="email">Enter Counting</label>
                            <input
                                type="number"
                                id="updateMemberCount"
                                className="input input-bordered w-full rounded-lg"
                                placeholder="Member Count"
                                value={register_count}
                                onChange={(e) => setRegisterCount(e.target.value)}
                                required
                            />
                        </div>
                        <p>{error}</p>

                        <div className="flex justify-between gap-2">
                            <button type="submit" className="btn btn-primary w-[45%]">Register</button>
                            <button className="btn btn-outline w-[45%]"
                                type="button"
                                onClick={() => (document.getElementById('miqaat_registration_update_model') as HTMLDialogElement).close()}
                            >Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>



    </>)


}

export default Miqaat_Register_Modal