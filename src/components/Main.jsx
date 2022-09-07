import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Category from "./Category";
import Footer from "./Footer";
import Header from "./Header";
import Slider from "./Slider";
import "./styles.scss";

function Main() {
    return (
        <>
            <header>
                <Header />
            </header>
            <img src="https://r.r10s.jp/com/inc/home/20080930/ris/img/pitari_mno/20220725_mno_1890x50_pc_04_all.png" width={"100%"} />
            <main>
                <Slider />
                <Container className="mt-3">
                    <Row>
                        <Col sm={3} xl={3}>
                            <Category />
                        </Col>
                        <Col>
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Main;