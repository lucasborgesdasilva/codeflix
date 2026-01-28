import { Delete } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Results } from "../../../types/cast-members";

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

export const CastMembersTable = ({
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
      flex: 1,
      field: 'name',
      headerName: 'Name',
      renderCell: renderNameCell,
    },
    {
      flex: 1,
      field: 'type',
      headerName: 'Type',
      type: "boolean",
      renderCell: renderTypeCell,
    },
    {
      flex: 1,
      field: 'id',
      headerName: 'Actions',
      headerAlign: "center",
      align: "center",
      type: "string",
      renderCell: renderActionsCell,
    },
  ];

  function mapDataToGridRows(data: Results) {
    const { data: castMembers } = data;
    return castMembers.map(castMember => ({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type
    }));
  }

  function renderTypeCell(row: GridRenderCellParams) {
    return (
      <Typography color="primary">
        {row.value === 1 ? "Director" : "Actor"}
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
        <Link style={{ textDecoration: "none" }} to={`/cast-members/edit/${params.id}`} >
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
        filterDebounceMs={300}
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

          handleOnPageChange(model.page);
          handleOnPageSizeChange(model.pageSize);
        }}
        onFilterModelChange={handleFilterChange}
      />
    </Box>
  )
}
