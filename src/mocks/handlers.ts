import {http, HttpResponse} from "msw";
import {faker} from "@faker-js/faker";

const generateDate = () => {
    const lastWeek = new Date(Date.now());
    lastWeek.setDate(lastWeek.getDate() - 7);
    return faker.date.between({
        from: lastWeek,
        to: Date.now()
    });
}

const User = [
    {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
    {id: 'shinjung', nickname: '신정', image: '/myProfile.jpg'},
    {id: 'leoturtle', nickname: '레오', image: faker.image.avatar()},
];

export const handlers = [
    http.post('/api/login', () => {
        return HttpResponse.json({
            userId: 1,
            nickname: 'SJ',
            id: 'shinjung',
            image: '/myProfile.jpg',
        }, {
            headers: {
                'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
            }
        })
    }),
    http.post('/api/logout', () => {
        console.log('로그아웃');
        return new HttpResponse(null, {
            headers: {
                'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
            }
        })
    }),
    http.post('/api/users', async ({request}) => {
        console.log('회원가입');
        // return HttpResponse.text(JSON.stringify('user_exists'), {
        //     status: 403,
        // })
        return HttpResponse.text(JSON.stringify('ok'), {
            headers: {
                'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0'
            }
        })
    }),
    http.get('/api/postRecommends', async ({request}) => {
        return HttpResponse.json(
            [
                {
                    postId: 1,
                    User: User[0],
                    content: `${1} Z.com is so marvelous. I'm gonna buy that.`,
                    Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
                    createdAt: generateDate(),
                },
                {
                    postId: 2,
                    User: User[0],
                    content: `${2} Z.com is so marvelous. I'm gonna buy that.`,
                    Images: [
                        {imageId: 1, link: faker.image.urlLoremFlickr()},
                        // {imageId: 2, link: faker.image.urlLoremFlickr()},
                    ],
                    createdAt: generateDate(),
                },
                {
                    postId: 3,
                    User: User[0],
                    content: `${3} Z.com is so marvelous. I'm gonna buy that.`,
                    Images: [],
                    createdAt: generateDate(),
                },
                {
                    postId: 4,
                    User: User[0],
                    content: `${4} Z.com is so marvelous. I'm gonna buy that.`,
                    Images: [
                        {imageId: 1, link: faker.image.urlLoremFlickr()},
                        // {imageId: 2, link: faker.image.urlLoremFlickr()},
                        // {imageId: 3, link: faker.image.urlLoremFlickr()},
                        // {imageId: 4, link: faker.image.urlLoremFlickr()},
                    ],
                    createdAt: generateDate(),
                },
                {
                    postId: 5,
                    User: User[0],
                    content: `${5} Z.com is so marvelous. I'm gonna buy that.`,
                    Images: [
                        {imageId: 1, link: faker.image.urlLoremFlickr()},
                        // {imageId: 2, link: faker.image.urlLoremFlickr()},
                        // {imageId: 3, link: faker.image.urlLoremFlickr()},
                    ],
                    createdAt: generateDate(),
                },
            ]
        )
    }),
    http.get('/api/followingPosts', async ({request}) => {
        return HttpResponse.json(
            [
                {
                    postId: 1,
                    User: User[0],
                    content: `${1} Stop following me. I'm too famous.`,
                    Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
                    createdAt: generateDate(),
                },
                {
                    postId: 2,
                    User: User[0],
                    content: `${2} Stop following me. I'm too famous.`,
                    Images: [
                        {imageId: 1, link: faker.image.urlLoremFlickr()},
                        // {imageId: 2, link: faker.image.urlLoremFlickr()},
                    ],
                    createdAt: generateDate(),
                },
                {
                    postId: 3,
                    User: User[0],
                    content: `${3} Stop following me. I'm too famous.`,
                    Images: [],
                    createdAt: generateDate(),
                },
                {
                    postId: 4,
                    User: User[0],
                    content: `${4} Stop following me. I'm too famous.`,
                    Images: [
                        {imageId: 1, link: faker.image.urlLoremFlickr()},
                        // {imageId: 2, link: faker.image.urlLoremFlickr()},
                        // {imageId: 3, link: faker.image.urlLoremFlickr()},
                        // {imageId: 4, link: faker.image.urlLoremFlickr()},
                    ],
                    createdAt: generateDate(),
                },
                {
                    postId: 5,
                    User: User[0],
                    content: `${5} Stop following me. I'm too famous.`,
                    Images: [
                        {imageId: 1, link: faker.image.urlLoremFlickr()},
                        // {imageId: 2, link: faker.image.urlLoremFlickr()},
                        // {imageId: 3, link: faker.image.urlLoremFlickr()},
                    ],
                    createdAt: generateDate(),
                },
            ]
        )
    }),
    http.get('/api/search/:tag', async ({request, params}) => {
        const {tag} = params;
        return HttpResponse.json(
            [
                {
                    postId: 1,
                    User: User[0],
                    content: `${1} 검색결과 ${tag}`,
                    Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
                    createdAt: generateDate(),
                },
                {
                    postId: 2,
                    User: User[0],
                    content: `${2} 검색결과 ${tag}`,
                    Images: [
                        {imageId: 1, link: faker.image.urlLoremFlickr()},
                        // {imageId: 2, link: faker.image.urlLoremFlickr()},
                    ],
                    createdAt: generateDate(),
                },
                {
                    postId: 3,
                    User: User[0],
                    content: `${3} 검색결과 ${tag}`,
                    Images: [],
                    createdAt: generateDate(),
                },
                {
                    postId: 4,
                    User: User[0],
                    content: `${4} 검색결과 ${tag}`,
                    Images: [
                        {imageId: 1, link: faker.image.urlLoremFlickr()},
                        // {imageId: 2, link: faker.image.urlLoremFlickr()},
                        // {imageId: 3, link: faker.image.urlLoremFlickr()},
                        // {imageId: 4, link: faker.image.urlLoremFlickr()},
                    ],
                    createdAt: generateDate(),
                },
                {
                    postId: 5,
                    User: User[0],
                    content: `${5} 검색결과 ${tag}`,
                    Images: [
                        {imageId: 1, link: faker.image.urlLoremFlickr()},
                        // {imageId: 2, link: faker.image.urlLoremFlickr()},
                        // {imageId: 3, link: faker.image.urlLoremFlickr()},
                    ],
                    createdAt: generateDate(),
                },
            ]
        )
    }),
];
