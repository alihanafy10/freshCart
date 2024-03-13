
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import MyVerticallyCenteredModal from "../goSignIn/GoSignIn";
import { storeContext } from "../../context/storeContext";
import { MyLoader } from "../contentLoaderProduct/ContentLoader";
import { toast } from "react-toastify";
import ReactPaginateSon from "./ReactPaginateSon";
import { useQuery } from "react-query";




export default function PaginatedItems({data}) {
  
  

  

  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(4);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;

    setItemOffset(newOffset);
    setCurrentPage(event.selected + 1);
  };
  useEffect(() => {
    if (currentItems && currentItems.length > 0) {
      const lastItemIndex = itemOffset + currentItems.length - 1;
      const itemsInCurrentPage = currentPage * itemsPerPage;

      if (lastItemIndex === data?.metadata?.results - 1 && lastItemIndex < itemsInCurrentPage) {
        const nextPage = currentPage + 1;
        setItemOffset((nextPage - 1) * itemsPerPage);
        setCurrentPage(nextPage);
      }
    }
    
  }, [currentItems, currentPage, itemOffset, data]);


  let { getWishlist } = useContext(storeContext);
    let { data: dataWish, refetch } = useQuery("getWish", getWishlist);
    let Arr = dataWish?.data?.data?.map((item) => item._id);
  return (
    <>
      <div className="row images mt-5 mb-4">
        {!currentItems
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <div
                key={index}
                className="col-lg-2 col-md-3 col-sm-6 position-relative my-3"
              >
                {<MyLoader />}
              </div>
            ))
          : currentItems &&
            currentItems?.map((item) => (
              <ReactPaginateSon
                key={item._id}
                item={item}
                arrIdWish={Arr}
                refetch={refetch}
              />
            ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageCount >= 5 ? 5 : pageCount}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeClassName="active"
      />
    </>
  );
}
