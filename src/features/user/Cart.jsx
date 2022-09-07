import { faArrowLeft, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { deleteItem, subTotalPriceCalc, updateItem } from "../../redux/slice/userCartSlice";
import "./styles.scss";

function Cart() {
    const { cart, userLogin } = useSelector(state => state);
    const dispatch = useDispatch();
    // const [totalPriceWithoutTax, setTotalPriceWithoutTax] = useState(() => cart.items.map(item => item.itemPrice).reduce((price1, price2) => price1 + price2, 0));
    /**
     * Hàm xử lý sự kiện click thay đổi số lượng sản phẩm
     * @param {Event} e 
     * @param {Function} callback 
     * @param {itemObject} item 
     */
    const changeCountClickHandle = (e, callback, item) => {
        e.preventDefault();
        callback(e, item);

    }
    /**
     * Hàm tăng số lượng sản phẩm
     * @param {Event} e 
     * @param {itemObject} item
     */
    const plusCountHandle = (e, item) => {
        const input = e.target.parentNode.parentNode.querySelector("input[type=text]");
        const cloneItem = { ...item, quantity: Number.parseInt(input.value) + 1 };
        dispatch(updateItem(cloneItem));
        dispatch(subTotalPriceCalc())
        // setTotalPriceWithoutTax(prev => prev + item.itemPrice);
    }

    /**
     * Hàm giảm số lượng sản phẩm
     * @param {Event} e 
     * @param {itemObject} item
     */
    const minusCountHandle = (e, item) => {
        const input = e.target.parentNode.parentNode.querySelector("input[type=text]");
        const cloneItem = {...item, quantity: Number.parseInt(input.value) - 1};

        if (input.value == input.min) return;

        dispatch(updateItem(cloneItem));
        dispatch(subTotalPriceCalc())
        // setTotalPriceWithoutTax(prev => prev - item.itemPrice);
    }

    /**
     * Hàm xóa vật phẩm trong giỏ hàng
     * @param {itemCode} code 
     */
    const deleteItemInCart = (code) => {
        dispatch(deleteItem(code))
        dispatch(subTotalPriceCalc())
    }

    useEffect(() => {
        dispatch(subTotalPriceCalc())
    }, [])

    return (
        <section className="h-100 h-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div
                            className="card card-registration card-registration-2"
                            style={{ borderRadius: 15 }}
                        >
                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                                                <h6 className="mb-0 text-muted">{cart.items.length}アイテム</h6>
                                            </div>
                                            {/* Start Item */}
                                            {cart.items.map(item => (
                                                <Fragment key={item.itemCode}>
                                                    <hr className="my-4" />
                                                    <div className="row mb-4 d-flex justify-content-between align-items-center">
                                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src={item.mediumImageUrls[0]}
                                                                className="img-fluid rounded-3"
                                                                alt={item.itemName}
                                                            />
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 className="text-muted">{item.shopName}</h6>
                                                            <h6 className="text-black mb-0">{item.itemName}</h6>
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                            <button
                                                                className="btn btn-link px-2"
                                                                onClick={(e) => changeCountClickHandle(e, minusCountHandle, item)}
                                                            >
                                                                <FontAwesomeIcon icon={faMinus} />
                                                            </button>
                                                            <Input 
                                                                min={1}
                                                                name="quantity"
                                                                value={item.quantity}
                                                                type="text"
                                                                className="form-control form-control-sm"
                                                                readOnly
                                                            />
                                                            <button
                                                                className="btn btn-link px-2"
                                                                onClick={(e) => changeCountClickHandle(e, plusCountHandle, item)}
                                                            >
                                                                <FontAwesomeIcon icon={faPlus} />
                                                            </button>
                                                        </div>
                                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                            <h6 className="mb-0">{Intl.NumberFormat("ja-JP").format(item.itemPrice)}円</h6>
                                                        </div>
                                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                            <a
                                                                className="trash text-muted"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    deleteItemInCart(item.itemCode)
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            ))}
                                            {/* End Item */}
                                            <hr className="my-4" />
                                            <div className="pt-5">
                                                <h6 className="mb-0">
                                                    <Link to="/" className="text-body">
                                                        <FontAwesomeIcon icon={faArrowLeft} />{' '}
                                                        Back to shop
                                                    </Link>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 bg-grey">
                                        <div className="p-5">
                                            <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="text-uppercase">小計</h5>
                                                <h5>{Intl.NumberFormat("ja-JP").format(cart.subTotalPrice)}円</h5>
                                            </div>
                                            <h5 className="text-uppercase mb-3">ギフトコード</h5>
                                            <div className="mb-5">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="form3Examplea2"
                                                        className="form-control form-control-lg"
                                                    />
                                                    <label className="form-label" htmlFor="form3Examplea2">
                                                        コードを入力してください
                                                    </label>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-5">
                                                <h5 className="text-uppercase">合計</h5>
                                                <h5>{Intl.NumberFormat("ja-JP").format(Math.floor(cart.subTotalPrice + cart.subTotalPrice * 10 / 100))}円</h5>
                                            </div>
                                            {userLogin.isLogin ?
                                                <button
                                                    type="button"
                                                    className="btn btn-dark btn-block btn-lg"
                                                    data-mdb-ripple-color="dark"
                                                >
                                                    会計
                                                </button>
                                                :
                                                <button
                                                    type="button"
                                                    className="btn btn-dark btn-block btn-lg"
                                                    data-mdb-ripple-color="dark"
                                                >
                                                    ログイン
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart;