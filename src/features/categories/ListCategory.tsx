import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridCellParams,
  GridToolbar,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

export const ListCategory = () => {
  const categories = useAppSelector(selectCategories);

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: {
        debounceMs: 500,
      },
    },
  };

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    is_active: category.is_active,
    createdAt: category.created_at.replaceAll("-", "/"),
  }));

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

  function renderActionCell(params: GridCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => console.log("clicou")}
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
