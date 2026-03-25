import { Box, Paper, Typography } from "@mui/material";
import { GenreForm } from "./components/genre-form";

export const GenreCreate = () => {
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
          genre={{}}
          categories={[]}
          isLoading={false}
          isDisabled={false}
          handleSubmit={() => {}}
          handleChange={() => {}}
        />
      </Paper>
    </Box>
  );
};
