import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    username: JSON.parse(localStorage.getItem("userInfo"))?.username || "",
    password: JSON.parse(localStorage.getItem("userInfo"))?.password || "",
    isLogin: false,
    pending: false,
    success: false,
    error: false,
    notice: "",
}

const userLoginSlice = createSlice({
    name: "userLogin",
    initialState: initialState,
    reducers: {
        checkLogin: (state) => {
            if (state.username === "test001" && state.password === "123123123")
                state.isLogin = true;
            else
                state.isLogin = false;
        },
        login: (state, action) => {
            const { username, password } = action.payload;

            try {
                if (!username || !password) {
                    throw new Error("Chưa nhập tài khoản hoặc mật khẩu.");
                }

                if (username !== "test001" || password !== "123123123") {
                    throw new Error("Tài khoản hoặc mật khẩu không đúng.")
                }

                localStorage.setItem("userInfo", JSON.stringify({
                    username: "test001",
                    password: "123123123"
                }))
                state.username = username;
                state.password = password;
                state.pending = false;
                state.success = true;
                state.error = false;
                state.notice = "Đăng nhập thành công";
            } catch (error) {
                state.pending = false;
                state.success = false;
                state.error = true;
                state.notice = error.message;
            }
        },

        logout: state => {
            localStorage.removeItem("userInfo");
            state.isLogin = false;
            state.username = "";
            state.password = "";
        },

        resetStatus: state => {
            state.pending = false;
            state.success = false;
            state.error = false;
            state.notice = "";
        }
    },
    extraReducers: {},
})

const { reducer, actions } = userLoginSlice;
const { login, resetStatus, checkLogin, logout } = actions;
export { login, resetStatus, checkLogin, logout };
export default reducer;