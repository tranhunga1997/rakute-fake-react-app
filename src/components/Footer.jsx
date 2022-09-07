import { Col, Container, Row } from "reactstrap";
import fbQr from "../asserts/imgs/fb-qr.jpg";

function Footer() {
    return (
        <>
            <Container>
                <hr />
                <Row>
                    <Col>
                        <h4 className="title">楽天ショッピング</h4>
                        <ul>
                            <li><h5>Facebook</h5></li>
                            <li><img src={fbQr} width={100} /></li>
                        </ul>
                    </Col>
                    <Col>
                        <ul>
                            <li><h5>Back end</h5></li>
                            <li>楽天Api</li>
                        </ul>
                        <ul>
                            <li><h5>Front end</h5></li>
                            <li>ReactJs</li>
                            <li>ReactStrap</li>
                            <li>JSX</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Footer;