import { Box, Typography } from "@mui/material";

function StudentText({ type, message, imagex }) {
  return (
    <>
      <Box
        sx={{
          px: "min(200px,10%)",
          py: "70px",
          color: "lightgray",
          background: "#202426",
          width: "100%",
          border: "1px solid #202426",
        }}
      >
        <Box
          sx={{
            display: "flex",
            mb: "15px",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography sx={{ background: "#1c1c1c", p: 2, borderRadius: "5px" }}>
            Student
          </Typography>
          <Typography
            sx={{
              textTransform: "capitalize",
              color:
                type === "doubt"
                  ? "#ff6542"
                  : type === "hint"
                  ? "#a52992"
                  : "lightgreen", //either doubt ,hint or answer
            }}
          >
            {type}
          </Typography>
        </Box>
        {message}
        <div>
    {imagex && (
      <img src={imagex} alt="Uploaded Image" /> // Display image if URL is available
    )}
  </div>
      </Box>
    </>
  );
}

export default StudentText;
