import {
  Box,
  Paper,
  Typography
} from "@mui/material";
import { useState } from "react";
import { ICategory } from "./category-slice";
import { CategoryForm } from "./components/category-form";

export const CategoryCreate = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [category, setCategory] = useState<ICategory>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: "",
    updated_at: ""
  });

  const handleChange = () => {
    console.log('Salvo!');
  }

  const handleToggle = () => {
    console.log('Toggled!');
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
          category={category}
          isDisabled={isDisabled}
          isLoading={false}
          onSubmit={() => console.log('Submitado!')}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  )
};