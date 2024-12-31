import { account } from "./appwrite";
import { AppDispatch } from "@/store/store";
import { setUser, clearUser } from "@/store/userSlice";

export const signup = async (email: string, password: string, name: string) => {
  await account.create("unique()", email, password, name);
};

export const login = async (
  email: string,
  password: string,
  dispatch: AppDispatch
) => {
  const session = await account.createSession(email, password);
  const user = await account.get();
  sessionStorage.setItem("user", JSON.stringify(user));
  dispatch(setUser({ id: user.$id, email: user.email }));
};

export const logout = async (dispatch: AppDispatch) => {
  await account.deleteSession("current");
  sessionStorage.removeItem("user");
  dispatch(clearUser());
};

export const getUserFromSession = async (dispatch: AppDispatch) => {
  const storedUser = sessionStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    dispatch(setUser({ id: user.$id, email: user.email }));
  } else {
    try {
      const user = await account.get();
      sessionStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser({ id: user.$id, email: user.email }));
    } catch {
      dispatch(clearUser());
    }
  }
};
