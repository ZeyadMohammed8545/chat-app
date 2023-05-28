import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "userSlice/registerUser",
  async (userData) => {
    try {
      const userForm = new FormData();
      userForm.append("name", userData.name);
      userForm.append("email", userData.email);
      userForm.append("password", userData.password);
      userForm.append("userImage", userData.userImage);

      const apiResponse = await axios.post(
        "http://localhost:4000/auth/new-user",
        userForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(apiResponse);
      const { data, status } = apiResponse;
      return {
        status: status,
        response: data.message,
      };
    } catch (err) {
      return {
        response: err.response.data.message,
        status: err.response.status,
      };
    }
  }
);

const UserSlice = createSlice({
  name: "userSlice",
  initialState: {
    isLoading: false,
    errMessage: "",
    successMessage: "",
  },
  reducers: {
    clearErrMessage: (state, action) => {
      state.errMessage = "";
      return state;
    },
    clearSuccessMessage: (state, action) => {
      state.successMessage = "";
      return state;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      return state;
    },
    setErrMessage: (state, action) => {
      state.errMessage = action.payload;
      return state;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    //register User Cases
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
      return state;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload.response;
      return state;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200 || action.payload.status === 201) {
        state.successMessage = action.payload.response;
        state.errMessage = "";
      } else {
        state.errMessage = action.payload.response;
        state.successMessage = "";
      }

      return state;
    });
  },
});

export default UserSlice.reducer;
export const {
  clearErrMessage,
  clearSuccessMessage,
  setLoading,
  setSuccessMessage,
  setErrMessage,
} = UserSlice.actions;
