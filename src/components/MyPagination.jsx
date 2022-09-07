import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from "prop-types";

MyPagingation.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}

function MyPagingation(props) {
    const { currentPage, totalPage, onClick } = props;

    let pagingList = [];

    const pagingListInit = () => {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            if (i < 1) continue;
            if (i >= totalPage) break;
            pagingList.push(i);
        }
    }
    pagingListInit();

    const pageChangeHandle = (page) => {
        if (page != currentPage)
            onClick(page)
    }

    const prevButtonHandle = () => {
        onClick(currentPage - 1)
    }

    const nextButtonHandle = () => {
        onClick(currentPage + 1)
    }

    return (
        <Pagination className="pagination-wrapper d-flex justify-content-center mt-4">
            <PaginationItem disabled={pagingList[0] == 1}>
                <PaginationLink previous onClick={prevButtonHandle} />
            </PaginationItem>

            {currentPage > 3  ?
                <PaginationItem>
                    <PaginationLink onClick={() => pageChangeHandle(1)}>
                        1
                    </PaginationLink>
                </PaginationItem>
                :
                ""
            }

            {currentPage > 4 ?
                <PaginationItem disabled>
                    <PaginationLink >
                        ...
                    </PaginationLink>
                </PaginationItem>
                :
                ""
            }

            {pagingList.map(number => (
                <PaginationItem key={number} active={number == currentPage}>
                    <PaginationLink onClick={() => pageChangeHandle(number)}>
                        {number}
                    </PaginationLink>
                </PaginationItem>
            ))}

            {currentPage < totalPage - 3 ?
                <>
                    <PaginationItem disabled>
                        <PaginationLink >
                            ...
                        </PaginationLink>
                    </PaginationItem>
                </>
                :
                ""
            }

            <PaginationItem active={currentPage == totalPage}>
                <PaginationLink onClick={() => pageChangeHandle(totalPage)}>
                    {totalPage}
                </PaginationLink>
            </PaginationItem>

            <PaginationItem disabled={currentPage == totalPage}>
                <PaginationLink next onClick={nextButtonHandle} />
            </PaginationItem>
        </Pagination>
    )
}

export default MyPagingation;