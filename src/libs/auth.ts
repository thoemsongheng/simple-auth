import { redirect } from "next/navigation";
import { deleteSession, setSession } from "./session";

// sample user data
const user = {
  id: 1,
  name: "Heng",
  email: "heng@local.com",
  password: "123456",
};

export async function logIn(email: string, password: string) {
  // login logic
  if (email !== user.email || password !== user.password) {
    // as a auth should send some sort of error message and code
    return console.error("Username or passeord is incorrect!");
  }

  // run set new session and redirect to home page
  await setSession(String(user.id));
  return redirect("/");
}

export async function logOut() {
  // run delete session token and redirect to /login
  await deleteSession();
  return redirect("/login");
}
