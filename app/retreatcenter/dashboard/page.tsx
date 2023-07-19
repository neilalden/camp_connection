"use client"
import { RootState } from "@/services/redux/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";


const DashboardPage = () => {
    const user = useSelector((state: RootState) => state.User.user)
    const router = useRouter();
    if (!user) router.push("/signin")
    return (
        <div>Dashboard</div>
    )
}


export default DashboardPage