import style from './home.module.css';
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";

export default function Home() {
    return (
        <main className={style.main}>
            <TabProvider>
                <Tab/>
                <PostForm/>
                <Post/>
            </TabProvider>
        </main>
    )
}
