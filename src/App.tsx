import { Typography } from "@mui/material";
import { ThemeProvider, Box } from "@mui/system";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { appTheme } from "./config/theme";
import { Routes, Route, Link } from "react-router-dom";
import { EditCategory } from "./features/categories/EditCategory";
import { ListCategory } from "./features/categories/ListCategory";
import { CreateCategory } from "./features/categories/CreateCategory";
import { SnackbarProvider } from "notistack";

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          component="main"
          sx={{
            height: "100vh",
            backgroundColor: (theme) => theme.palette.grey[900],
            color: (theme) => theme.palette.common.white,
          }}
        >
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<ListCategory />} />
              <Route path="/categories" element={<ListCategory />} />
              <Route path="/categories/create" element={<CreateCategory />} />
              <Route path="/categories/edit/:id" element={<EditCategory />} />

              <Route path="*" element={<Typography>Not Found</Typography>} />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
