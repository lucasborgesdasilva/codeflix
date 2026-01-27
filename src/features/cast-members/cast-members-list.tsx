import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useGetCastMembersQuery } from "./cast-members-slice";

export const CastMembersList = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [rowsPerPage] = useState([10, 25, 50, 100]);

  const { enqueueSnackbar } = useSnackbar();

  const options = { perPage, search, page }

  const { data, isFetching, error } = useGetCastMembersQuery(options);

  function handleOnPageChange(page: number) {
    setPage(page + 1);
  }

  function handleOnPageSizeChange(perPage: number) {
    setPerPage(perPage)
  }

  function handleOnFilterChange(filterModel: GridFilterModel) {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join(" ");
      return setSearch(search);
    }

    return setSearch("")
  }

  useEffect(() => {


    if (error) {
      enqueueSnackbar("Error fetching categories", { variant: "error" });
    }
  }, [enqueueSnackbar, error])
  return (
    <div>CastMembersList</div>
  )
}
