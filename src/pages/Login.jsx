import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginView from "../components/auth/LoginView";
import { Toaster, toast } from 'react-hot-toast';
import { LoadingOverlay } from "../components/index";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
export default function LoginPage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSigin = async () => {
    if (!userId || !password) { return toast.error('Please Fill Up Mail ID and Password First.') }
    try {
      setIsLoading(true);
      const options = {
        url: 'http://13.233.142.147/ats/api/auth/login',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
          user_id: userId,
          password: password
        }
      };
      const loginPromise = await axios(options);
      if (loginPromise.error) {
        toast.error(loginPromise.error)
        toast.error("Login Failed!")
      } else if (loginPromise.status === 200) {
        toast.success("Login Successfully!")
        const { data } = loginPromise.data;
        console.log("data",data);
        const authToken = data?.authToken;
        console.log(authToken);
        const userDetailsString = JSON.stringify(data?.employee);
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userDetails', userDetailsString);
        navigate("/");
        await setUser({ authToken: authToken });
      } else {
      }
    } catch (error) {
      toast.error(`Something Went Wrong!, Getting Exception, ${error?.message}, ${error?.response?.data?.msg}`);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {isLoading && <LoadingOverlay />}
      <main>
        <title>SignIn</title>
      </main>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <LoginView setUserId={setUserId} setPassword={setPassword} handleSigin={handleSigin} />
    </>
  );
}