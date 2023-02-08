import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated")
    ? localStorage.getItem("isAuthenticated")
    : false,
  user: localStorage.getItem("user_id")
    ? localStorage.getItem("user_id")
    : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  role: localStorage.getItem("role") ? localStorage.getItem("role") : null,
  globalMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      const data = action.payload;
      //save token and details information
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "admin");
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("isAuthenticated", true);
      return {
        ...state,
        isAuthenticated: true,
        user: data.user_id,
        token: data.token,
        role: "admin",
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case "SNACKBAR":
      return {
        ...state,
        globalMessage: action.payload.message,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    //TODO
    const role = localStorage.getItem("role");
    setInterval(() => {
      sdk.check(role);
    }, 2000);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
