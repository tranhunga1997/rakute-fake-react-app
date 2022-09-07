import { UncontrolledCarousel } from "reactstrap";

function Slider() {
    return (
        <UncontrolledCarousel
            items={[
                {
                    key: 1,
                    caption: "",
                    src: 'https://r.r10s.jp/com/img/thumb/200309/message/bigbanner/2022/pc/128856_0_Wonderful_BigBanner.jpg'
                },
                {
                    key: 2,
                    caption: "",
                    src: 'https://r.r10s.jp/com/img/thumb/200309/message/bigbanner/2022/pc/129056_0_129056_Big_banner_PC_1890x300.png'
                },
                {
                    key: 3,
                    caption: "",
                    src: 'https://r.r10s.jp/com/img/thumb/200309/message/bigbanner/2022/pc/128108_0_bousai_2_1890x300.jpg'
                },
                {
                    key: 4,
                    caption: "",
                    src: 'https://r.r10s.jp/com/img/thumb/200309/message/bigbanner/2022/pc/129205_0_202209_ss_bigbanner_pre01_UXP_1890x300.jpg'
                }
            ]}
        />
    )
}

export default Slider;