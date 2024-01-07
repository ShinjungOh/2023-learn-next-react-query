import Home from "@/app/(afterLogin)/home/page";

type Props = {
    params: {
        username: string,
        id: string,
        photoId: string
    }
}

// 모달 뒷배경
export default function Page({params}: Props) {
    params.id // 1
    params.photoId // 1
    params.username

    return (
        <Home/>
    );
}
