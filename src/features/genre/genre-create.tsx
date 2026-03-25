import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Genre } from "../../types/genres";
import { GenreForm } from "./components/genre-form";
import {
  initialState as GenreInitialState,
  useCreateGenreMutation,
  useGetCategoriesQuery,
} from "./genre-slice";

export const GenreCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: categories } = useGetCategoriesQuery();
  const [createGenre, status] = useCreateGenreMutation();
  const [genre, setGenre] = useState<Genre>(GenreInitialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGenre((prevGenre) => ({
      ...prevGenre,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createGenre({
      id: genre.id,
      name: genre.name,
      categories_id: [""],
    });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Genre created successfully!", { variant: "success" });
    }

    if (status.isError) {
      enqueueSnackbar("Failed to create genre.", { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Genre</Typography>
          </Box>
        </Box>

        {/* Genre form */}
        <GenreForm
          genre={genre}
          categories={categories?.data}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  );
};
