import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import googleImg from "../../../../assets/icons/google.png";
import { useNavigate } from "react-router";
import AxiosPublic from "../../../../hooks/Axios/AxiosPublic";

const GoogleSignIn = () => {
  const { googleSingIn } = useContext(AuthContext);
  const Axios = AxiosPublic();
  const navigate = useNavigate();
  const btnHandler = () => {
    googleSingIn().then((res) => {
      const user = {
        displayName: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
      };
      Axios.post("/users", user); // Save user to the database
      navigate("/dashboard"); // Redirect to the dashboard
    });
  };
  return (
    <>
      <section className="flex items-center justify-center min-h-screen px-5">
        <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-base-100 text-base-content dark:bg-gray-50 dark:text-gray-800">
          <h2 className="mb-3 text-3xl font-semibold text-center">
            Welcome to the App
          </h2>
          <p className="text-sm text-center text-base-content-secondary dark:text-gray-600">
            Login to your account using your Google account
          </p>
          <div className="my-6 space-y-4">
            <button
              onClick={btnHandler}
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-4 space-x-4 border border-base-300 rounded-md dark:border-gray-600  hover:bg-base-200 cursor-pointer"
            >
              <img className="w-8 h-8" src={googleImg} alt="google icon" />
              <p className="hover:text-base-content-secondary">
                Continue with Google
              </p>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default GoogleSignIn;
