import style from './home.module.css';
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspense";
import React, {Suspense} from "react";
import Loading from "@/app/(afterLogin)/home/loading";

export default async function Home() {
    return (
        <main className={style.main}>
            <TabProvider>
                <Tab/>
                <PostForm/>
                <Suspense fallback={<Loading/>}>
                    <TabDeciderSuspense/>
                </Suspense>
            </TabProvider>
        </main>
    )
}
