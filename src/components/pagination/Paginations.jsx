import { Pagination } from "antd";

const Paginations = ({ currentPage, limit, totalItems, handlePageChange, handleLimitChange }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <Pagination
        current={currentPage}
        pageSize={limit}
        total={totalItems}
        onChange={(page, pageSize) => handlePageChange(page, pageSize)} // Pass both page and pageSize
        showLessItems
        showQuickJumper
        showSizeChanger
        pageSizeOptions={['4', '8', '12', '16']} // Customize your options
        onShowSizeChange={(current, size) => handleLimitChange(size, current)} // Update limit when page size changes
      />
    </div>
  );
};

export default Paginations;
