import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridFilterModel,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCategories,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice";
import { CategoryTable } from "./components/CategoryTable";

export const ListCategory = () => {
  const { data, isFetching, error } = useGetCategoriesQuery();

  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  console.log(data, isFetching, error);

  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  async function handleDelete(id: string) {
    await deleteCategory({ id });
    enqueueSnackbar("Category deleted successfully", { variant: "success" });
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>

      <CategoryTable
        data={data}
        isFetching={isFetching}
        onDelete={handleDelete}
        perPage={0}
        onPageChange={function (page: number): void {
          throw new Error("Function not implemented.");
        }}
        onFilterChange={function (filter: GridFilterModel): void {
          throw new Error("Function not implemented.");
        }}
        onPageSizeChange={function (perPage: number): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Box>
  );
};
