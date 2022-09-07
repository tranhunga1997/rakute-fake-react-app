import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getShoseGenres } from "../redux/thunk/genreThunk";
import "./styles.scss";

function Category() {
    const dispatch = useDispatch();
    const genreState = useSelector(state => state.genre)

    /**
     * Hàm khởi tạo danh sách genre
     * @param {reduxState} genreState 
     * @returns 
     */
    const renderCategory = (genreState) => {
        const { brothers, current, childrens, pending, success, error } = genreState;
        return brothers.map(brother => (
            <li key={brother.genreId}>
                {brother.genreName}
                <ul className="item-list">
                    {childrens.map(children => (
                        <li key={children.genreId}>
                            <Link
                                to={`/category/${children.genreId}`}
                                state={{ genreName: children.genreName }}
                            >
                                {children.genreName}
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>
        ))
    }

    useEffect(() => {
        dispatch(getShoseGenres({ genreId: 100480 }))
    }, [])

    return (
        <nav>
            <hr />
            <h5>ジャンル一覧</h5>
            <ul className="category-list">
                {renderCategory(genreState)}
            </ul>
        </nav>
    )
}

export default Category;