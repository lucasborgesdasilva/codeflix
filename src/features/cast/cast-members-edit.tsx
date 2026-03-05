import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CastMember } from "../../types/cast-members";
import { initialState, useGetCastMemberQuery, useUpdateCastMemberMutation } from "./cast-members-slice";
import { CastMemberForm } from "./components/cast-members-form";


export const CastMembersEdit = () => {
  const id = useParams().id || "";
  const { enqueueSnackbar } = useSnackbar();
  const { data: castMember } = useGetCastMemberQuery({ id });
  const [updateCastMember, status] = useUpdateCastMemberMutation();
  const [castMemberState, setCastMemberState] = useState<CastMember>(initialState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateCastMember(castMemberState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value })
  }

  useEffect(() => {
    if (castMember) {
      setCastMemberState(castMember.data);
    }
  }, [castMember])

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Cast member updated successfully!", { variant: "success" });
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
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>

        <CastMemberForm
          castMember={castMemberState}
          isDisabled={status.isLoading}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  )
};