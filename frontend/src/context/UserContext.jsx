import { createContext, useContext } from "react";
import toast, {Toaster} from 'react-hot-toast'
const UserContext = createContext()
import axios from "axios";
import { server } from "../main.jsx";
import { useState } from "react";
export const UserProvider = ({children}) => {
const [btnLoading, setBtnLoading] = useState(false);

    async function loginUser(email, navigate){
            setBtnLoading(true);
        try {
          const { data } = await axios.post(`${server}/api/user/login`, { email })
console.log("Response from backend:", data)
            console.log("VerifyToken:", data.verifyToken)
           toast.success(data.message)
           localStorage.setItem("verifyToken", data.verifyToken)

              navigate("/verify")
              setBtnLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    async function verifyUser(otp, navigate){
            const verifyToken = localStorage.getItem("verifyToken")
            setBtnLoading(true);
            if(!verifyToken){
                return toast.error("Token not found, please login again");
            }

        try {
          const { data } = await axios.post(`${server}/api/user/verify`, { otp, verifyToken })
console.log("Response from backend:", data)
            console.log("VerifyToken:", data.verifyToken)
           toast.success(data.message)
           localStorage.clear()
           localStorage.setItem("token", data.token)

            navigate("/")
            setBtnLoading(false);
            setIsAuth(true);
            setUser(data.user);
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }
    return (
        <UserContext.Provider value={{loginUser, btnLoading, isAuth, setIsAuth, user, verifyUser}}>
            {children}
            <Toaster/>
        </UserContext.Provider>
    )
}

export const UserData = () => useContext(UserContext)