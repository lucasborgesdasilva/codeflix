import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Category } from "../../types/category";
import { useGetCategoryQuery, useUpdateCategoryMutation } from "./category-slice";
import { CategoryForm } from "./components/category-form";

export const CategoryEdit = () => {
  const id = useParams().id || "";
  const { enqueueSnackbar } = useSnackbar();
  const { data: category } = useGetCategoryQuery({ id });
  const [updateCategory, status] = useUpdateCategoryMutation();
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    is_active: false,
    deleted_at: "",
    created_at: "",
    updated_at: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateCategory(categoryState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value })
  }

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked })
  }

  useEffect(() => {
    if (category) {
      setCategoryState(category.data);
    }
  }, [category])

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Category updated successfully!", { variant: "success" });
    }

    if (status.error) {
      enqueueSnackbar("Some went wrong!", { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={categoryState}
          isDisabled={status.isLoading}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  )
};