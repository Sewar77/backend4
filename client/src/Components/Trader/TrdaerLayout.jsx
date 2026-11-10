import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../Admin/Sidebar";
export default function TraderLayout() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box sx={{ flex: 1 }}>
          {/* side bar */}
          <Sidebar />
        </Box>
        <Box sx={{ flex: 4 }}>
          {/* other pages */}
          <Outlet />
          {/* outle is any other page */}
        </Box>
      </Box>
    </>
  );
}
