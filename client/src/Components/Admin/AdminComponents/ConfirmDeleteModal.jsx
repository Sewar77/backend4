import { Box, Button, Modal, Typography } from "@mui/material";

export default function ConfirmDeleteModal({
  openModal,
  setOpenModal,
  setProductId,
  productId,
  deleteProduct,
}) {
  return (
    <>
      <Modal
        open={openModal}
        onClose={() => (setOpenModal(false), setProductId(null))}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h3">Confirm Delete</Typography>
          <Typography variant="h6">
            Are you sure you want to delete this item?
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => (deleteProduct(productId), setOpenModal(false))}
            >
              OK
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => (setOpenModal(false), setProductId(null))}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
