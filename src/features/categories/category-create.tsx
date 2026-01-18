import {
  Box,
  Paper,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createCategory, ICategory } from "./category-slice";
import { CategoryForm } from "./components/category-form";

export const CategoryCreate = () => {
  const dispatch = useAppDispatch();

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [categoryState, setCategoryState] = useState<ICategory>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: "",
    updated_at: ""
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createCategory(categoryState));
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
            <Typography variant="h4">Create Category</Typography>
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