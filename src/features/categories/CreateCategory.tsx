import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Category, createCategory } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";
import { useSnackbar } from "notistack";

export const CreateCategory = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    created_at: "",
    updated_at: "",
    deleted_at: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(createCategory(categoryState));
    enqueueSnackbar("Category created successfully", { variant: "success" });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

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
          onChange={handleChange}
          onToggle={handleToggle}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
};
