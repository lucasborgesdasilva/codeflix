import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
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
    description: category.description,
    is_active: category.is_active
  }))

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'description', headerName: 'Description', width: 500 },
    { field: 'is_active', headerName: 'Active?', width: 100 },
  ];


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

      <DataGrid rows={rows} columns={columns} />
    </Box>
  )
};