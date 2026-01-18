import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategoryById } from "./category-slice";
import { CategoryForm } from "./components/category-form";

export const CategoryEdit = () => {
  const id = useParams().id || "";
  const category = useAppSelector(state => selectCategoryById(state, id));
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

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
          onSubmit={() => console.log('atualizado!')}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  )
};