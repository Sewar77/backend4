import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
export default function AdminLayout() {
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
