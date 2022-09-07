import { faCartShopping, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, Row } from "reactstrap";
import productApi from "../api/productApi";
import Login from "../features/user/Login";
import { checkLogin, logout, resetStatus } from "../redux/slice/userLoginSlice";
import { filterShose } from "../redux/thunk/productThunk";
import "./styles.scss";

function Header() {
    const dispatch = useDispatch();
    const { userLogin, cart, product, userModal } = useSelector(state => state)
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [autoCompleteData, setAutoCompleteData] = useState([]);
    const [loginModalFlag, setLoginModalFlag] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);

    /**
     * Hàm xử lý mở modal login
     * @param {Event} e 
     */
    const loginModalToggle = (e) => {
        setLoginModalFlag(!loginModalFlag);
        dispatch(resetStatus());
    }

    /**
     * Hàm xử lý đăng xuất
     */
    const logoutHandle = () => {
        dispatch(logout());
        dispatch(checkLogin());
    }


    /**
     * Hàm xử lý submit form
     * @param {Event} e 
     * @returns nothing
     */
    const formSubmitHandle = (e) => {
        e.preventDefault();
        if (!searchValue) {
            return;
        }
        navigate(`/search?keyword=${searchValue}`)
        dispatch(filterShose({ keyword: searchValue, hits: 20 }))
    }

    /**
     * Hàm khởi tạo danh sách tìm kiếm gợi ý
     * @param {Array} data 
     * @returns 
     */
    const renderAutoCompleteData = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            return (
                <>
                    <ul className="auto-complete-wrapper">
                        {data.map((item, idx) => (
                            <li key={idx} onClick={() => window.open(item.url)}>{item.name}</li>
                        ))}
                    </ul>
                </>
            )
        }
    }

    useEffect(() => {
        dispatch(checkLogin())
    }, [loginModalFlag])

    useEffect(() => {
        if (userLogin.isLogin) {
            loginModalToggle();
        }
    }, [userLogin.isLogin])

    useEffect(() => {
        if (searchValue && searchValue.length > 2) {
            productApi.shoseFilter({ keyword: searchValue, hits: 4 })
                .then(response => response.Items)
                .then(items => {
                    setAutoCompleteData(items.map(item => ({ name: item.itemName, url: item.itemUrl })))
                })
                .catch(error => setAutoCompleteData(["検索結果が見つかりません。"]))
        }
    }, [searchValue])

    return (
        <>
            <Container fluid>
                <Row className="align-items-center">
                    <Col sm="auto" lg="auto" xl="auto">
                        {/* LOGO */}
                        <Link to="/">
                            <img src="https://r.r10s.jp/com/img/thumb/logo/logo_rakuten_25th.svg" />
                        </Link>
                    </Col>
                    <Col className="position-relative">
                        {/* Form tìm kiếm */}
                        <Form
                            onSubmit={formSubmitHandle}
                            autoComplete="off"
                            onBlur={(e) => setAutoCompleteData([])}
                        >
                            <Input type="text"
                                onChange={(e) => setSearchValue(e.target.value)}
                                onFocus={(e) => setSearchValue("")}
                                autoComplete="off"
                                value={searchValue} placeholder="検索..." />
                            {renderAutoCompleteData(autoCompleteData)}
                        </Form>
                    </Col>
                    <Col sm="auto" lg="auto" xl="auto" className="notifications">
                        {/* giỏ hàng, tài khoản,... */}
                        <Link to="/user/cart" className="cart-info">
                            <span className="cart-item-count">{cart.items.length}</span>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </Link>
                        <Link to="#"><FontAwesomeIcon icon={faMessage} /></Link>
                    </Col>
                    <Col sm="auto" lg="auto" xl="auto" className="accounts" >
                        {userLogin.isLogin ?
                            <ButtonDropdown isOpen={userDropdown} toggle={() => setUserDropdown(!userDropdown)}>
                                <DropdownToggle caret>
                                    {userLogin.username}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem >ユーザ情報</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={logoutHandle}>ログアウト</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                            :
                            <>
                                <Button
                                    outline
                                    color="secondary"
                                    onClick={loginModalToggle}
                                >
                                    ログイン
                                </Button>
                                <Login
                                    isOpen={loginModalFlag}
                                    toggle={loginModalToggle}
                                />
                            </>
                        }

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Header;