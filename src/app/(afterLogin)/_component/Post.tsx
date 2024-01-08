import style from './post.module.css';
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "@/app/(afterLogin)/_component/PostArticle";
import {faker} from "@faker-js/faker";

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = {
    noImage?: boolean
}

export default function Post({noImage}: Props) {
    const target = {
        User: {
            id: 'elonmusk',
            nickname: 'Elon Musk',
            image: '/yRsRRjGO.jpg',
        },
        content: '트위터 클론코딩하기',
        createdAt: new Date(),
        Images: [] as any[],
        postId: 1
    }

    if (Math.random() > 0.5 && !noImage) {
        target.Images.push(
            {imageId: 1, link: faker.image.urlLoremFlickr()}
        )
    }

    return (
        <PostArticle post={target}>
            <div className={style.postWrapper}>
                <div className={style.postUserSection}>
                    <Link href={`/${target.User.id}`} className={style.postUserImage}>
                        <img src={target.User.image} alt={target.User.nickname}/>
                        <div className={style.postShade}/>
                    </Link>
                </div>
                <div className={style.postBody}>
                    <div className={style.postMeta}>
                        <Link href={`/${target.User.id}`}>
                            <span className={style.postUserName}>{target.User.nickname}</span>
                            &nbsp;
                            <span className={style.postUserId}>@{target.User.id}</span>
                            &nbsp;
                            •
                            &nbsp;
                        </Link>
                        <span className={style.postDate}>{dayjs(target.createdAt).fromNow(true)}</span>
                    </div>
                    <div>{target.content}</div>
                    <div className={style.postImageSection}>
                        {target.Images && target.Images.length > 0 && (
                            <Link
                                href={`${target.User.id}/status/${target.postId}/photo/${target.Images[0].imageId}`}
                                className={style.postImageSection}
                            >
                                <img src={target.Images[0]?.link} alt=""/>
                            </Link>
                        )}
                    </div>
                    <ActionButtons/>
                </div>
            </div>
        </PostArticle>
    );
}
