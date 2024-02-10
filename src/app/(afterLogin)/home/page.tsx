import style from './home.module.css';
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";

async function getPostRecommends() {
    const res = await fetch('http://localhost:9090/api/postRecommends', {
        next: {
            tags: ['post', 'recommends'],
        }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function Home() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ['post', 'recommends'], queryFn: getPostRecommends});
    const dehydratedState = dehydrate(queryClient);

    queryClient.getQueryData(['post', 'recommends']);

    return (
        <main className={style.main}>
            <HydrationBoundary state={dehydratedState}>
                <TabProvider>
                    <Tab/>
                    <PostForm/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </TabProvider>
            </HydrationBoundary>
        </main>
    )
}
