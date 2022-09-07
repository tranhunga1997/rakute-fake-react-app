import {Spinner} from "reactstrap";
import "./styles.scss";

function Loading() {
    return (
        <div className="loading">
                <Spinner type="border" color="primary"/>
        </div>
    )
}

export default Loading;