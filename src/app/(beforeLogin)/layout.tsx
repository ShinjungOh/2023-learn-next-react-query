import styles from '@/app/page.module.css';

type Props = {
    children: React.ReactNode,
    modal: React.ReactNode
}

export default function Layout({children, modal}: Props) {
    return (
        <div className={styles.container}>
            Before Login 레이아웃
            {children}
            {modal}
            {/*패러렐 라우트, @붙은 디렉토리 요소 */}
        </div>
    )
}
