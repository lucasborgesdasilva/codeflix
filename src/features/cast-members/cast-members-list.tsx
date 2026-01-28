import { Box, Button } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteCastMemberMutation, useGetCastMembersQuery } from "./cast-members-slice";

const initialOptions = {
  page: 1,
  search: "",
  perPage: 10,
  rowsPerPage: [10, 20, 30],
}

export const CastMembersList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [options, setOptions] = useState(initialOptions);
  const { data, isFetching, error } = useGetCastMembersQuery(options);
  const [deleteCastMember, deleteCastMemberStatus] = useDeleteCastMemberMutation();

  async function deleteCastMembers(id: string) {
    await deleteCastMember({ id })
  }

  function handleOnPageChange(page: number) {
    options.page = page;
    setOptions({ ...options, page })
  }

  function handleOnPageSizeChange(perPage: number) {
    options.perPage = perPage;
    setOptions({ ...options, perPage })
  }

  function handleOnFilterChange(filterModel: GridFilterModel) {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join(" ");
      options.search = search;
      return setOptions({ ...options, search });
    }

    return setOptions({ ...options, search: "" })
  }

  useEffect(() => {
    if (deleteCastMemberStatus.isSuccess) {
      enqueueSnackbar("Cast member deleted!", { variant: "success" });
    }

    if (deleteCastMemberStatus.error) {
      enqueueSnackbar("Cast member not deleted", { variant: "error" });
    }

    if (error) {
      enqueueSnackbar("Error fetching cast members", { variant: "error" });
    }
  }, [deleteCastMemberStatus, enqueueSnackbar, error])

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/cast-members/create"
          sx={{ marginBottom: "1rem" }}>
          New Cast Member
        </Button>
      </Box>
    </Box>
  )
}
