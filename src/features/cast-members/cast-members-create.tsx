import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { CastMember } from "../../types/cast-members";
import { initialState, useCreateCastMemberMutation } from "./cast-members-slice";
import { CastMemberForm } from "./components/cast-members-form";

export const CastMembersCreate = () => {
  const [castMemberState, setCastMemberState] = useState<CastMember>(initialState);
  const [createCastMember, status] = useCreateCastMemberMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createCastMember(castMemberState);
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Cast member created successfully!", { variant: "success" });
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
            <Typography variant="h4">Create Cast Member</Typography>
          </Box>
        </Box>
        <CastMemberForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          castMember={castMemberState}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
        />
      </Paper>
    </Box>
  )
}
