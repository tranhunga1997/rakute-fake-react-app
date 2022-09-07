import { faCartPlus, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Badge, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import productApi from "../../api/productApi";
import CardContainer from "../../components/CardContainer";
import MyPagination from "../../components/MyPagination";
import { addItem, deleteItem } from "../../redux/slice/userCartSlice";
import "./styles.scss";

function ProductList() {
    const params = useParams();
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state)
    const { state } = useLocation();
    const [items, setItems] = useState([]);
    const [pageInfo, setPageInfo] = useState({ page: 1, totalPage: 1 });
    const [genreName, setGenreName] = useState("");
    const { categoryId } = params;
    const cartItems = cart.items;
    /**
     * Hàm thêm sản phẩm vào giỏ hàng
     * @param {Object} item 
     */
    const addCart = (item) => {
        let cloneItem = {...item}
        cloneItem.quantity = 1
        dispatch(addItem(cloneItem));
    }

    /**
     * Hàm xóa sản phẩm khỏi giỏ hàng
     * @param {Code} itemCode 
     */
    const removeItemInCart = (itemCode) => {
        dispatch(deleteItem(itemCode));
    }

    /**
     * Hàm khởi tạo nút thêm sản phẩm vào giỏ hàng
     * @param {Array} cartItems 
     * @param {Object} item 
     * @returns 
     */
    const renderCartMark = (cartItems, item) => {
        let isExist = cartItems.filter(ite => ite?.itemCode === item.itemCode);

        return isExist.length != 0 ?
            <Badge
                className="cart-mark"
                color="primary"
                onClick={(e) => removeItemInCart(item.itemCode)}
            >
                <FontAwesomeIcon icon={faCheckCircle} />
            </Badge>
            :
            <Badge
                className="cart-mark"
                color="secondary"
                onClick={(e) => addCart(item)}
            >
                <FontAwesomeIcon icon={faCartPlus} />
            </Badge>
    }


    /**
     * Function: lấy data từ api
     * @param {number} categoryId 
     * @param {number} page 
     * @param {number} limit 
     */
    const getData = async (categoryId, page, limit) => {
        productApi.shoseFilter({
            // call shose api data
            genreId: categoryId,
            page,
            hits: limit
        }).then(data => {
            const { Items, page, pageCount } = data;
            setItems(Items)
            setPageInfo({
                // Set page info
                page,
                totalPage: pageCount
            })
        })
    }

    /**
     * Function: xử lý chuyển trang
     * @param {number} page 
     */
    const changePageHandle = (page) => {
        getData(categoryId, page, 30);
    }

    useEffect(() => {
        setItems([])
        setPageInfo({ page: 1, totalPage: 1 })
        setGenreName(state.genreName)
        getData(categoryId, 1, 30)
    }, [categoryId])

    return (
        <>
            <CardContainer
                title={genreName}
                readMoreFlag={false}
            >
                {items.map(item => (
                    <>
                        <Card key={item.itemCode} >
                            {renderCartMark(cartItems, item)}

                            <div onClick={() => window.open(item.itemUrl)}>
                                <CardImg src={item.imageFlag == 1 ?
                                    item.mediumImageUrls[0]
                                    :
                                    "https://res.cloudinary.com/teepublic/image/private/s--79EwJk3z--/t_Preview/b_rgb:000000,c_limit,f_auto,h_630,q_90,w_630/v1608236443/production/designs/17519845_0.jpg"}
                                    style={{ width: "100%" }} />
                                <CardBody>
                                    <CardTitle>{item.itemName}</CardTitle>
                                    <CardText className="text-end">{Intl.NumberFormat("ja-JP").format(item.itemPrice)}円</CardText>
                                </CardBody>
                            </div>
                        </Card>
                    </>
                ))}
            </CardContainer>
            <MyPagination
                currentPage={pageInfo.page}
                totalPage={pageInfo.totalPage}
                onClick={changePageHandle}
            />
        </>
    )
}

export default ProductList;