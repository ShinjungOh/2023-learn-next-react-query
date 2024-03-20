import style from './singlePost.module.css';
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getComments} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import {User} from "@/model/User";
import {Post} from "@/model/Post";
import {getUserServer} from "@/app/(afterLogin)/[username]/_lib/getUserServer";
import {getSinglePostServer} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePostServer";

type Props = {
    params: {
        id: string;
        username: string;
    }
}

export async function generateMetadata({params}: Props) {
    const user: User = await getUserServer({queryKey: ['users', params.username]});
    const post: Post = await getSinglePostServer({queryKey: ['posts', params.id]});
    return {
        title: `Z에서 ${user.nickname} 님 : ${post.content}`,
        description: post.content,
    }
}

export default async function Page({params}: Props) {
    const {id} = params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ['posts', id], queryFn: getSinglePostServer});
    await queryClient.prefetchQuery({queryKey: ['posts', id, 'comments'], queryFn: getComments});
    const dehydratedState = dehydrate(queryClient);

    return (
        <div className={style.main}>
            <HydrationBoundary state={dehydratedState}>
                <div className={style.header}>
                    <BackButton/>
                    <h3 className={style.headerTitle}>게시하기</h3>
                </div>
                <SinglePost id={id}/>
                <CommentForm id={id}/>
                <div>
                    <Comments id={id}/>
                </div>
            </HydrationBoundary>
        </div>
    );
}
