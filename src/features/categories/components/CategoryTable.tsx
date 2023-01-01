import { Results } from "../../../types/Category";
import {
  GridFilterModel,
  GridCellParams,
  GridColDef,
  GridRowsProp,
  DataGrid,
} from "@mui/x-data-grid";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number;

  onPageChange: (page: number) => void;
  onFilterChange: (filter: GridFilterModel) => void;
  onPageSizeChange: (perPage: number) => void;
  onDelete: (id: string) => void;
};

export function CategoryTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  onPageChange,
  onFilterChange,
  onPageSizeChange,
  onDelete,
}: Props) {
  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: {
        debounceMs: 500,
      },
    },
  };

  function mapDataToGridRows(data: Results): GridRowsProp {
    return data.map(
      (category: {
        id: string;
        name: string;
        is_active: any;
        created_at: string;
      }) => ({
        id: category.id,
        name: category.name,
        isActive: category.is_active,
        createdAt: category.created_at.replaceAll("-", "/"),
      })
    );
  }

  const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];

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
    const { id } = params;

    return (
      <IconButton
        color="secondary"
        onClick={() => onDelete(id as string)}
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
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
