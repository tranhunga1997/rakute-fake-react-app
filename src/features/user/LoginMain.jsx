import { Outlet } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./styles.scss";

function LoginMain() {
    return (
        <>
            <header>
                <Header />
            </header>
            <img src="https://r.r10s.jp/com/inc/home/20080930/ris/img/pitari_mno/20220725_mno_1890x50_pc_04_all.png" width={"100%"} />
            <main>
                <Container className="mt-3">
                    <Row>
                        {/* <Col sm={3} xl={3} className="user-menu-wrapper">
                            <div className="is-not-login-wrapper">
                                <Button color="secondary">ログイン</Button>
                            </div>
                            <div className="user-menu">
                                <ul>
                                    <li>ユーザ情報</li>
                                </ul>
                            </div>
                        </Col> */}
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

export default LoginMain;