import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const BASE_URL = "https://localhost:44320/api/"

const initialState = {
    posts: [],
    value:1,
    status: "idle",
    error: ""
}

export const fetchStudents = createAsyncThunk("posts/fetchStudents", async () => {
  const response = await axios.get(BASE_URL+"Employee/GetAllStudent");
  console.log(response.data)
  return response?.data
});


export const deletePost = createAsyncThunk("post/deletePost", async (initialPost) => {
  const {id} = initialPost
  try {
      const response = await axios.delete(BASE_URL+"Employee/DeleteStudent?id="+id);
      if (response?.status === 200) return initialPost;
      return `${response.status} : ${response.statusText}`;
  } catch (error) {
      return error.message
  }
})





export const counterSlice = createSlice({
    name:'counter',
    initialState:initialState,
    reducers:{
        increment: (state) => {
            state.value += 1
          },
          decrement: (state) => {
            state.value -= 1
          },
          incrementByAmount: (state, action) => {
            state.value += action.payload
          },
      
    },
    extraReducers(builder) {
      builder
          .addCase(fetchStudents.pending, (state, action) => {
              state.status = "loading"
          })
          .addCase(fetchStudents.fulfilled, (state, action) => {
              state.status = "succeeded"
              state.posts = state.posts.concat(action.payload);
          })
          .addCase(fetchStudents.rejected, (state, action) => {
              state.status = "failed"
              state.error = action.error.message
          })
          .addCase(deletePost.fulfilled, (state, action) => {
              if (!action?.payload.id) {
                  console.log("could not delete");
                  console.log(action.payload)
                  return 
              }

              const { id } = action.payload;
              const OldPosts = state.posts.filter(post => 
              post.id !== id)
              state.posts = OldPosts
          })
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)


};
export const selectAllPosts = (state) => state.counter.posts;
export const getPostsError = (state) => state.counter.error;
export const getPostsStatus = (state) => state.counter.status;


export const selectCount = (state) => state.counter.value

export default counterSlice.reducer
