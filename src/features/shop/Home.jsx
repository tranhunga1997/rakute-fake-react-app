import { faCartPlus, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import CardContainer from "../../components/CardContainer";
import MyPagingation from "../../components/MyPagination";
import { addItem, deleteItem } from "../../redux/slice/userCartSlice";
import { filterShose } from "../../redux/thunk/productThunk";
import "./styles.scss";

function Home() {
    const dispatch = useDispatch();
    const { product, cart } = useSelector(state => state);
    const { items, keyword, page, totalPage, limit } = product;

    /**
     * Hàm thêm sản phẩm vào giỏ hàng
     * @param {Object} item 
     */
    const addCart = (item) => {
        let cloneItem = {...item};
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
     * Hàm khởi tạo danh sách sản phẩm
     * @returns danh sách sản phẩm (jsx)
     */
    const renderItems = () => {
        let htmls = items.map(item => {
            const { itemName, itemCode, itemPrice, imageFlag, mediumImageUrls, itemUrl } = item;

            const clickHandle = (url) => {
                window.open(url)
            }

            return (
                <Card key={itemCode}>
                    {renderCartMark(cart.items, item)}
                    <CardImg src={imageFlag == 1 ?
                        mediumImageUrls[0]
                        :
                        "https://res.cloudinary.com/teepublic/image/private/s--79EwJk3z--/t_Preview/b_rgb:000000,c_limit,f_auto,h_630,q_90,w_630/v1608236443/production/designs/17519845_0.jpg"}
                        style={{ width: "100%" }}
                    />
                    <CardBody onClick={() => clickHandle(itemUrl)}>
                        <CardTitle>{itemName}</CardTitle>
                        <CardText className="text-end">{Intl.NumberFormat("ja-JP").format(itemPrice)}円</CardText>
                    </CardBody>
                </Card>
            )
        })
        return htmls;
    }

    /**
     * Hàm xử lý chuyển trang
     * @param {Number} page 
     */
    const changePageHandle = (page) => {
        if (keyword)
            dispatch(filterShose({ keyword, hits: limit, page }))
        else
            dispatch(filterShose({ genreId: 558926, hits: limit, page }))

    }

    useEffect(() => {
        dispatch(filterShose({ genreId: 558926, hits: 20 }))
    }, [])

    return (
        <>
            <CardContainer
                title="靴"
                readMoreFlag={false}
            >
                {renderItems()}
            </CardContainer>
            <MyPagingation
                currentPage={page}
                totalPage={totalPage}
                onClick={changePageHandle}
            />
        </>
    )
}

export default Home;