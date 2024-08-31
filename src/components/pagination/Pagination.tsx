import Pagination from "@mui/material/Pagination";
import styles from "./Pagination.module.css";
import Stack from "@mui/material/Stack";

interface IPagination {
  currentPage: number;
  totalPage: number;
  onChangePage: (value: number) => void;
}

export default function BasicPagination({
  currentPage,
  totalPage,
  onChangePage,
}: IPagination) {
  return (
    <div className={styles["pagination"]}>
      <Stack spacing={1}>
        <Pagination
          count={totalPage}
          page={currentPage}
          size="large"
          color="primary"
          onChange={(_, value) => onChangePage(value)}
        />
      </Stack>
    </div>
  );
}
