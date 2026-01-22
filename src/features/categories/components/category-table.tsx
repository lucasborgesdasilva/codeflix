import { Delete } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Results } from "../../../types/category";

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];
  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: string) => void;
}

export const CategoryTable = ({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete
}: Props) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: perPage,
  });

  const filterModel = {
    items: [],
  }

  const rowCount = data?.meta.total ?? 0;


  const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: 'is_active',
      headerName: 'Active?',
      width: 150,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      type: "date"
    },
    {
      field: 'id',
      headerName: 'Actions',
      headerAlign: "center",
      flex: 1,
      align: "center",
      type: "string",
      renderCell: renderActionsCell,
    },
  ];

  function mapDataToGridRows(data: Results) {
    const { data: categories } = data;
    return categories.map(category => ({
      id: category.id,
      name: category.name,
      is_active: category.is_active,
      createdAt: new Date(category.created_at),
    }));
  }

  function renderIsActiveCell(row: GridRenderCellParams) {
    return (
      <Typography color={row.value ? "success" : "secondary"}>
        {row.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDelete(params.value)}
        aria-label="delete"
      >
        <Delete />
      </IconButton>
    )
  }

  function renderNameCell(params: GridRenderCellParams) {
    return (
      <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
        <Link style={{ textDecoration: "none" }} to={`/categories/edit/${params.id}`} >
          <Typography color="primary">{params.value}</Typography>
        </Link>
      </Box>
    )
  }

  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        filterMode="server"
        filterModel={filterModel}
        paginationMode="server"
        paginationModel={paginationModel}
        pagination
        pageSizeOptions={rowsPerPage}
        loading={isFetching}
        rowCount={rowCount}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableRowSelectionOnClick
        showToolbar
        checkboxSelection={false}
        onPaginationModelChange={model => {
          setPaginationModel(model);

          handleOnPageChange(model.page + 1);
          handleOnPageSizeChange(model.pageSize);
        }}
      />
    </Box>
  )
}
