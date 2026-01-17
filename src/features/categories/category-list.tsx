import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./category-slice";

export const CategoryList = () => {
  // Dentro de Hooks o react-reducer já tem criado um hook com a tipagem do store e passando o useSelector
  // Então ao invés de usar o useSelector direto, sem a tipagem, usamos o que o react-reducer criou
  // Inclusive dentro de hooks, ele fala para usarmos o useAppSelector e useAppDispatch ao invés de useSelector e useDispatch.
  const categories = useAppSelector(selectCategories);

  const rows: GridRowsProp = categories.map(category => ({
    id: category.id,
    name: category.name,
    is_active: category.is_active,
    createdAt: new Date(category.created_at)
  }))

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
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
      renderCell: renderActionsCell,
    },
  ];

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
        onClick={() => console.log(params.value)}
        aria-label="delete"
      >
        <Delete />
      </IconButton>
    )
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          sx={{ marginBottom: "1rem" }}>
          New Category
        </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          filter: {
            filterModel: {
              items: [],
              quickFilterValues: [],
            },
          },
        }}
        pageSizeOptions={[2, 20, 50, 100]}
        filterDebounceMs={500}
        showToolbar
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableRowSelectionOnClick
      />
    </Box>
  )
};