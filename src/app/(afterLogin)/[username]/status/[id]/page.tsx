import style from './singlePost.module.css';
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";

type Props = {
    params: {
        id: string;
    }
}

export default function Page({params}: Props) {
    const {id} = params;

    return (
        <div className={style.main}>
            <div className={style.header}>
                <BackButton/>
                <h3 className={style.headerTitle}>게시하기</h3>
            </div>
            <SinglePost id={id}/>
            <CommentForm/>
            <div>
                {/* 답글 */}
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>
    );
}
