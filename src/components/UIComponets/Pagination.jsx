const Pagination = ({ setPage, currentPage, setCurrentPage, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div className="flex mt-4 bottom-10 w-[200px] overflow-x-auto pb-1">
      {pages.map((page) => (
        <button
          type="button"
          key={page}
          className={`mx-1 min-h-[35px] min-w-[35px] rounded-md ${
            currentPage === page
              ? "bg-brand text-white"
              : "bg-gray bg-opacity-10"
          }`}
          onClick={() => {
            setCurrentPage(page);
            setPage(page);
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
