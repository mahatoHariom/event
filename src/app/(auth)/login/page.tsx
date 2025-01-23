// import RegisterForm from "@/components/auth/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/auth/LoginForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/events");
  }

  return <LoginForm />;
}
