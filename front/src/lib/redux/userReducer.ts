import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

type typeInfos = { 
    firstName: string,
    lastName: string,
    nickName: string,
    email: string,
} | null
type typeUser = {
    isLogged: boolean,
    infos: typeInfos,
}

const initialState: typeUser = {
    isLogged: false,
    infos: null,
  }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUserReducer: (state, action: PayloadAction<typeInfos>)=>{
       state.isLogged = true;
       state.infos = action.payload;
    },
    logoutUserReducer: (state, action: PayloadAction<undefined>)=>{
        state.isLogged =  false;
        state.infos = null;       
    }
  },
});

export const {loginUserReducer, logoutUserReducer} = userSlice.actions;
export const selectUser = (state: RootState)=> state.user
export default userSlice.reducer;