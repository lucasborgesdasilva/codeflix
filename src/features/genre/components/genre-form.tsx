import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Category } from "../../../types/category";
import { Genre } from "../../../types/genres";

type GenreFormProps = {
  genre: Genre;
  categories?: Category[];
  isLoading?: boolean;
  isDisabled?: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const GenreForm = ({
  genre,
  categories,
  isLoading = false,
  isDisabled = false,
  handleSubmit,
  handleChange,
}: GenreFormProps) => {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <TextField
                required
                name="name"
                label="Name"
                value={genre.name}
                disabled={isDisabled}
                onChange={handleChange}
                slotProps={{ htmlInput: { "data-testid": "name" } }}
              />
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Autocomplete
              multiple
              disablePortal
              loading={isLoading}
              options={categories || []}
              value={genre.categories}
              disabled={isDisabled || !categories}
              getOptionLabel={(option) => option.name} // Se fugir do formato que o autocomplete espera, é necessário usar essa função para mapear o valor.
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categories"
                  data-testid="categories-input"
                />
              )}
              onChange={(_, value) => {
                handleChange({ target: { name: "categories", value } } as any);
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box display="flex" gap={2}>
              <Button variant="contained" component={Link} to="/categories">
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isDisabled || isLoading}
              >
                {isLoading ? "Loading..." : "Save"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
