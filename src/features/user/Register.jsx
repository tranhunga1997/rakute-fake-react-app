import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

function Register() {

    const submitHandle = (e) => {
        console.log("đã submit");
    }

    return (
        <Container>
            <Row>
                <Col className="py-5 h-100">
                    <div
                        className="card card-registration card-registration-2"
                        style={{ borderRadius: 15 }}
                    >
                        <div className="p-5">
                            <div className="d-flex justify-content-between align-items-center mb-5">
                                <h1 className="fw-bold mb-0 text-black">新規登録</h1>
                            </div>
                            <hr className="my-4" />
                            <div>
                                <Form onSubmit={submitHandle}>
                                    <FormGroup>
                                        <Label for="username">ユーザ</Label>
                                        <Input type="text" name="username" id="username" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">パスワード</Label>
                                        <Input type="password" name="password" id="password" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">パスワード（確認用）</Label>
                                        <Input type="password" name="password" id="password" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="birthday">生年月日</Label>
                                        <p className="text-muted" style={{ fontSize: "0.7em" }}>ハイフン（-）なしを入力してください。</p>
                                        <Input type="text" name="birthday" id="birthday" placeholder="2021-01-01　→　20210101" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="sex">性別</Label>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="sex" />{' '}
                                                男性
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="sex" />{' '}
                                                女性
                                            </Label>
                                        </FormGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">メール</Label>
                                        <Input type="email" name="email" id="email" />
                                    </FormGroup>
                                    <FormGroup className="text-center">
                                        <Button color="primary" type="submit" >登録</Button>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;