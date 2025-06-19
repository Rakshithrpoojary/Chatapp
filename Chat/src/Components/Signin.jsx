import "../Styles/Register.css";
import { useUserContext } from "../Context/Context";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Signin() {
  const { SubmitHandler, loginData } = useUserContext();
  console.log("LOGINDATA", loginData);

  return (
    <div className="full-container">
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.3 }}
        className="Register-form-container"
      >
        <form action={SubmitHandler} className="register-form">
          <label htmlFor="email">Email</label>
          <input name="email" type="email" id="email" />
          <label htmlFor="password">Password</label>
          <input name="password" type="password" id="password" />
          <button type="submit">Signin</button>
          <p id="already-have-account">
            Already have an account?
            <Link id="register-link" to="/">
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Signin;
