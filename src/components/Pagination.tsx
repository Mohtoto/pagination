const Pagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }: any) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const maxPagesToShow = 10;
  const pages = [];

  for (let i = 1; i <= Math.min(totalPages, maxPagesToShow); i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-8 space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 text-sm rounded-md transition-all duration-200 
            ${page === currentPage
              ? 'bg-blue-600 text-white font-semibold'
              : 'bg-white text-gray-800 hover:bg-blue-100 hover:text-blue-700'}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
