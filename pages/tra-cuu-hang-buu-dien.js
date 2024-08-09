import Layout from "../src/components/Layout";
import client from "../src/components/ApolloClient";
import NAV_QUERY from "../src/queries/nav";
import parse from "html-react-parser";
import { PAGE_BY_SLUG_QUERY } from "../src/queries/page-by-slug";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import PostBody from "../src/components/post-body";

const TraCuuHangBuuDien = ({
    page,
    seo,
    siteSeo,
    mainMenu,
    mobileMenu,
    footerMenu,
    footerMenu2,
    productCategories,
}) => {
    const router = useRouter();
    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    const fullHead = parse(seo?.fullHead);
    const [itemCode, setItemCode] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://api.myems.vn/TrackAndTraceItemCode?itemcode=${router.query.q}&language=0`)
            .then((res) => res.json())
            .then((data) => {
                setItemCode(data)
                setLoading(false)
            })
    }, [])
    return (
        <Layout
            siteSeo={siteSeo}
            mainMenu={mainMenu}
            mobileMenu={mobileMenu}
            footerMenu={footerMenu}
            footerMenu2={footerMenu2}
            productCategories={productCategories}
        >
            <Head>{fullHead}</Head>
            <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
                <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
                    Trang chủ / {page.title}
                </p>
                <h1 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">
                    {page.title}
                </h1>
                {isLoading ? (<div class="pt-5 text-center text-yellow-500 text-2xl">
                    Đang tìm kiếm định vị bưu gửi {router.query.q}. Vui lòng chờ trong
                    giây lát...
                </div>) : (<div className="pt-1">
                    {itemCode?.Message === 'An error has occurred.' && <p class="text-center text-yellow-500 text-2xl pt-16">
                        Không tìm thấy định vị bưu gửi <strong>{router.query.q}</strong>. Hệ thống đang bảo trì, vui lòng kiểm
                        tra lại sau 5 phút...
                    </p>}
                    {itemCode?.TBL_INFO && <div>
                        <p class="text-gray-500 text-xl mt-10">
                            Người gửi: {itemCode.TBL_INFO.HO_TEN_GUI}
                        </p>
                        <p class="text-gray-500 text-xl">
                            Gửi đến: {itemCode.TBL_INFO.DIA_CHI_NHAN}
                        </p>
                        <p class="text-gray-500 text-xl">
                            Khối lượng: {itemCode.TBL_INFO.KHOI_LUONG}g
                        </p>

                        <h3 class="text-blue-500 text-xl mt-16">
                            Mã vận đơn:{itemCode.TBL_INFO.MAE1} -
                            {itemCode.TBL_INFO.BC_GUI}
                        </h3>

                        <ol class="pt-12 relative border-l border-gray-200 dark:border-gray-700">
                            {itemCode.List_TBL_DINH_VI.map(({ NGAY, GIO, VI_TRI, TRANG_THAI, DIEN_THOAI }, index) => <li key={index}>
                                <div
                                    class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                                <time class="pl-2 mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{
                                    `${NGAY} ${GIO}`}</time>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    {VI_TRI}
                                </h3>
                                <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                    {TRANG_THAI} {DIEN_THOAI}
                                </p>
                            </li>)}
                        </ol>

                        <h3 class="text-lg font-semibold text-blue-900 dark:text-white">
                            Thông tin phát
                        </h3>
                        <ol class="pt-12 relative border-l border-gray-200 dark:border-gray-700">
                            {itemCode.List_TBL_DELIVERY.map(({ NGAY_TRANG_THAI, GIO_TRANG_THAI, VI_TRI, TRANG_THAI }, index) => <li key={index}>
                                <div
                                    class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                                <time class="pl-2 mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{
                                    `${NGAY_TRANG_THAI} ${GIO_TRANG_THAI}`}</time>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    {VI_TRI}
                                </h3>
                                <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                    {TRANG_THAI}
                                </p>
                            </li>)}
                        </ol>

                        <p class="text-center text-gray-500 text-xs mt-10">
                            &copy;2022 bởi
                            <a class="text-blue-500 hover:text-blue-800" href="https://www.longwebstudio.net/">Lỗ Văn Long</a>.
                        </p>
                    </div>}
                </div>)}
                <PostBody content={page.content} />
            </div>




        </Layout>
    );
};

export default TraCuuHangBuuDien;

export async function getStaticProps() {
    const {
        data: {
            mainMenu,
            footerMenu,
            footerMenu2,
            mobileMenu,
            siteSeo,
            productCategories,
        },
    } = await client.query({
        query: NAV_QUERY,
    });

    const { data } = await client.query({
        query: PAGE_BY_SLUG_QUERY,
        variables: { slug: "tra-cuu-hang-buu-dien" },
    });

    return {
        props: {
            mainMenu: mainMenu.nodes,
            footerMenu: footerMenu.nodes,
            footerMenu2: footerMenu2.nodes,
            mobileMenu: mobileMenu.nodes,
            siteSeo: siteSeo.schema,
            productCategories: productCategories.nodes,
            seo: data?.page?.seo ?? "",
            page: data?.page ?? {},
        },
    };
}
