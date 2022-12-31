import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategories, useGetCategoriesQuery } from "./categorySlice";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridCellParams,
  GridToolbar,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../app/hooks";
import { deleteCategory } from "./categorySlice";
import { useSnackbar } from "notistack";

export const ListCategory = () => {
  const { data, isFetching, error } = useGetCategoriesQuery();

  console.log(data, isFetching, error);

  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: {
        debounceMs: 500,
      },
    },
  };

  const rows: GridRowsProp = data
    ? data.map((car) => ({
        id: car.id,
        name: car.name,
        description: car.description,
        is_active: car.is_active,
        createdAt: car.created_at.replaceAll("-", "/"),
      }))
    : [];

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: "is_active",
      headerName: "Is Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      type: "dateTime",
    },
    {
      field: "id",
      headerName: "Action",
      flex: 1,
      renderCell: renderActionCell,
    },
  ];

  function renderNameCell(params: GridCellParams) {
    return (
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/categories/edit/${params.id}`}
      >
        <Typography color="primary">{params.value}</Typography>
      </Link>
    );
  }

  async function handleDelete(id: string) {
    dispatch(deleteCategory(id));
    enqueueSnackbar("Category deleted successfully", { variant: "success" });
  }

  function renderActionCell(params: GridCellParams) {
    const { id } = params;

    return (
      <IconButton
        color="secondary"
        onClick={() => handleDelete(id as string)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderIsActiveCell(params: GridCellParams) {
    return (
      <Typography color={params.value ? "primary" : "secondary"}>
        {params.value ? "Yes" : "No"}{" "}
      </Typography>
    );
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

      <Box sx={{ display: "flex", height: 600 }}>
        <DataGrid
          rowsPerPageOptions={[2, 20, 50, 100]}
          rows={rows}
          columns={columns}
          disableColumnSelector
          disableColumnFilter
          disableDensitySelector
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          componentsProps={componentProps}
        />
      </Box>
    </Box>
  );
};
