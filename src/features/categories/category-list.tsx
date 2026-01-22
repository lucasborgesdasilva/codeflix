import { Box, Button } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./category-slice";
import { CategoryTable } from "./components/category-table";

export const CategoryList = () => {
  const [perPage] = useState(10);
  const [rowsPerPage] = useState([10, 25, 50, 100]);
  const [search, setSearch] = useState([]);

  const { data, isFetching, error } = useGetCategoriesQuery();
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
  const { enqueueSnackbar } = useSnackbar();

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
  }

  function handleOnPageChange(page: number) {
    console.log(page)
  }

  function handleOnPageSizeChange(page: number) {
    console.log(page)
  }

  function handleOnFilterChange(filterModel: GridFilterModel) {
    console.log(filterModel)
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar("Category deleted success!", { variant: "success" });
    }

    if (deleteCategoryStatus.error) {
      enqueueSnackbar("Category not deleted", { variant: "error" });
    }
  }, [deleteCategoryStatus, enqueueSnackbar])

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

      <CategoryTable
        data={data}
        isFetching={isFetching}
        perPage={perPage}
        rowsPerPage={rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleOnFilterChange}
      />
    </Box>
  )
};