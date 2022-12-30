import { Box } from "@mui/material";
import { ReactNode } from "react";
import { Container } from "@mui/system";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
