import { useTransition } from "react";
import "../Styles/Register.css";
import { Link } from "react-router-dom";
import PostFetch from "../CustomHooks/PostFetch";
import toast from "react-hot-toast";
function Register() {
  const { FetchData, loading, userData } = PostFetch();
  const [isPending, startTransition] = useTransition();

  const SubmitHandler = async (formData) => {
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    if (data.username === "" || data.email === "" || data.password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    };
    startTransition(async () => {
      try {
        await FetchData(
          "http://localhost:3000/user/v1/register",
          options,
          (data) => console.log(data)
        );
      } catch (error) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div className="full-container">
      <div className="Register-form-container">
        <form action={SubmitHandler} className="register-form">
          <label htmlFor="name">Name</label>
          <input type="text" name="username" id="name" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <button disabled={isPending} type="submit">
            Register
          </button>
        </form>
        <div className="sign-in-option">
          <p>Already a user?</p>
          <Link id="signinlink" to="/signin">
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
