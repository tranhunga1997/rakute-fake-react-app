import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { checkLogin, login } from '../../redux/slice/userLoginSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

Login.propTypes = {
    className: PropTypes.string,
    toggle: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
}

const remarkStyle = {
    paddingLeft: "16px",
    fontSize: "0.8em",
    lineHeight: "0"
}

function Login(props) {
    const { className, toggle, isOpen } = props;
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)

    /**
     * Hàm xử lý action đăng nhập
     * @param {Event} e 
     */
    const loginHandle = (e) => {
        const form = document.querySelector("#loginForm")
        const username = form["username"].value;
        const password = form["password"].value;
        dispatch(login({ username, password }));
        dispatch(checkLogin());
    }

    /**
     * Hàm xử lý thông báo đăng nhập
     * @param {userLoginState} params 
     * @returns 
     */
    const notificateHandle = (params) => {
        const { success, error, notice } = params;

        if (success) {
            return (
                <Alert color="success">
                    {notice}
                </Alert>
            )
        } else if (error) {
            return (
                <Alert color="danger">
                    {notice}
                </Alert>
            )
        } else {

            return "";
        }
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>ログイン</ModalHeader>
            <ModalBody>
                {notificateHandle(userLogin)}
                <Form id="loginForm" onSubmit={loginHandle}>
                    <FormGroup>
                        <Label for="username">ユーザ</Label>
                        <Input type="text" name="username" id="username" placeholder="ユーザを入力してください" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">パスワード</Label>
                        <Input type="password" name="password" id="password" placeholder="パスワードを入力してください" />
                    </FormGroup>
                    <FormGroup className="text-end">
                        <p className="text-muted">新規登録、<Link to="/user/register">こちら</Link></p>
                        <Button color="primary" onClick={loginHandle}>ログイン</Button>{' '}
                        <Button color="secondary" onClick={toggle}>閉じる</Button>
                    </FormGroup>
                </Form>
            </ModalBody>
            <hr style={{ marginTop: "0" }} />
            <div className="remark" style={remarkStyle}>
                <p>ユーザ：test001</p>
                <p>パスワード：123123123</p>
            </div>
        </Modal>
    )
}

export default Login;