"use client"
import { RootState } from "@/services/redux/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";


const BookPage = () => {
    const user = useSelector((state: RootState) => state.User.user)
    const router = useRouter();
    if (!user) router.push("/signin")
    return (
        <div>Book</div>
    )
}


export default BookPage