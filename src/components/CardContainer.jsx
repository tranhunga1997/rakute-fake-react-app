import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import "./styles.scss";

CardContainer.propTypes = {
    title: PropTypes.string.isRequired,
    readMoreLink: PropTypes.string,
    readMoreFlag: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

CardContainer.defaultProps = {
    readMoreLink: "#"
}

function CardContainer({ title, readMoreLink, readMoreFlag, children }) {

    return (
        <div className="card-wrapper">
            <div className="title-wraper">
                <p>{title}</p>
                {readMoreFlag && <Link to={readMoreLink}>もっと見る</Link>}
            </div>
            <div className="content-wraper">
                {children}
            </div>
        </div>
    )
}

export default CardContainer;