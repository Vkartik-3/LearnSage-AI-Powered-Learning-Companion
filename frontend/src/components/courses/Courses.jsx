import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Navbar from "../navbar/Navbar";
import Container from "@mui/material/Container";
import Rating from "@mui/material/Rating";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
const NavbarContainer = ({ children }) => (
  <div style={{ backgroundColor: "#0c0e0d", color: "lightgray", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    {children}
  </div>
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflowY: "auto",
  p: 4,
  maxHeight: "90vh",
  bgcolor: "#1c1c1c",
};

function Courses() {
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});

  const handleOpen = (e, item) => {
    setmodalVisibility(true);
    setSelectedCourse(item);
  };
  const handleClose = (e, item) => {
    setmodalVisibility(false);
    setSelectedCourse({});
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
       .get("http://127.0.0.1:8000/api/courses/") // Replace with your Django server address
       .then(function (response) {
         console.log(response);
         setItems(response?.data);
       })
       .catch(function (error) {
         console.log(error);
       });
   }, []);
   

  return (
    <>
      {/* <Navbar />
       */}
       <NavbarContainer>
        <Box display="flex" alignItems="center">
        <img src="..\src\assets\logo.png" alt="Logo" style={{ width: "200px", marginRight: "20px" }} />
          {/* <Typography variant="h6" style={{ fontWeight: "400", color:"e6dddd" }}>Subjects</Typography> */}
        </Box>
        
       <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <NavLink 
          to="/subject" 
          style={{ 
            textDecoration: 'none', 
            marginRight: '20px',
            borderBottom: location.pathname === '/subject' ? '2px solid #ff6542' : 'none'
          }}
        >
          <Button color="inherit">Subjects</Button>
        </NavLink>
        <NavLink 
          to="/courses" 
          style={{ 
            textDecoration: 'none', 
            marginRight: '20px',
            borderBottom: location.pathname === '/courses' ? '2px solid #ff6542' : 'none'
          }}
        >
          <Button color="inherit">Courses</Button>
        </NavLink>
        <NavLink 
          to="/quiz" 
          style={{ 
            textDecoration: 'none',
            marginRight: '20px',
            borderBottom: location.pathname === '/quiz' ? '2px solid #ff6542' : 'none'
          }}
        >
          <Button color="inherit">Test Yourself</Button>
        </NavLink>
        <NavLink 
          to="/login" 
          style={{ 
            textDecoration: 'none',
            borderBottom: location.pathname === '/login' ? '2px solid #ff6542' : 'none'
          }}
        >
          <Button color="inherit">Logout</Button>
        </NavLink>
      </div>
</NavbarContainer>

      <Container maxWidth={false} sx={{ display: "flex" }}>
        <Grid container spacing={6} sx={{ p: 6, height: "100%" }}>
          {items.map((item) => (
            <Grid item xs={11} md={6} lg={3} xl={3} key={item.id}>
              <motion.div
                initial="hidden"
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 30,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.0,
                    },
                  },
                }}
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    width: "100%",
                    bgcolor: "#1c1c1c",
                  }}
                >
                  <CardActionArea onClick={(e) => handleOpen(e, item)}>
                    <CardMedia
                    style={{
                      height: '190px',
                      width: '100%',
                      // paddingTop: '75%', 
                      objectFit: 'cover', 
                  }}
                      component="img"
                      height="190"
                      image={item?.image}
                      alt={item?.name}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        sx={{ color: "#ff6542" }}
                      >
                        {item?.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="lightgray"
                        className="truncate-3"
                      >
                        {item?.about}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Typography
                          sx={{ mr: 1, color: "#faaf00", fontSize: "14px" }}
                        >
                          {item?.ratingNum}
                        </Typography>
                        <Rating
                          size="small"
                          name="half-rating-read"
                          defaultValue={item?.ratingNum}
                          precision={0.5}
                          readOnly
                        />
                        <Typography sx={{ ml: 1 }} variant="body2" color="gray">
                          ({item?.rating})
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalVisibility}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={modalVisibility}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h4"
                color="#ff6542"
              >
                {selectedCourse?.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography sx={{ mr: 1, color: "#faaf00", fontSize: "14px" }}>
                  {selectedCourse?.ratingNum}
                </Typography>
                <Rating
                  size="small"
                  name="half-rating-read"
                  defaultValue={selectedCourse?.ratingNum}
                  precision={0.5}
                  readOnly
                />
                <Typography sx={{ ml: 1 }} variant="body2" color="gray">
                  ({selectedCourse?.rating})
                </Typography>
              </Box>
              <Typography
                id="transition-modal-description"
                sx={{ mt: 2, color: "gray" }}
              >
                {selectedCourse?.about}
              </Typography>

              <Typography
                id="transition-modal-description"
                variant="h5"
                sx={{ mt: 2, color: "#ff6542" }}
              >
                What will you learn?
              </Typography>
              <Grid
                container
                spacing={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ p: 2 }}
              >
                {selectedCourse?.what_learn?.split(',').map((objective) => (
    <Grid
        xs={12}
        md={4}
        sx={{ display: "flex", color: "gray" }}
        key={objective}
    >
        <DoneIcon sx={{ mr: "10px", color: "#ff6542" }} />
        {objective}
    </Grid>
))}

              </Grid>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <NavLink to={"../learn-course/" + selectedCourse.id}>
                  <Button
                    sx={{ mx: "auto" }}
                    variant="outlined"
                    color="warning"
                  >
                    {selectedCourse?.registered ? "Continue" : "Learn Now"}
                  </Button>
                </NavLink>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </>
  );
}

export default Courses;
