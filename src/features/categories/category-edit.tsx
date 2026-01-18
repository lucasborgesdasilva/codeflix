import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ICategory, selectCategoryById, updateCategory } from "./category-slice";
import { CategoryForm } from "./components/category-form";

export const CategoryEdit = () => {
  const id = useParams().id || "";
  const dispatch = useAppDispatch();
  const category = useAppSelector(state => selectCategoryById(state, id));
  const { enqueueSnackbar } = useSnackbar();

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [categoryState, setCategoryState] = useState<ICategory>(category);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateCategory(categoryState));
    enqueueSnackbar("Success updating category!", { variant: "success" });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value })
  }

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked })
  }

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
          isDisabled={isDisabled}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  )
};