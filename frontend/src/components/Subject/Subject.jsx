import React from "react";
import { Grid, Box, Typography, Button, Card, CardContent, CardActionArea, CardMedia } from "@mui/material";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const NavbarContainer = ({ children }) => (
  <div style={{ backgroundColor: "#0c0e0d", color: "lightgray", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    {children}
  </div>
);

const Subjects = () => {
  return (
    <>
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

      {/* <Typography variant="h6" style={{ fontWeight: "700",paddingTop: "30px", paddingLeft: "55px" , fontSize:40, color: "lightgray"}}>Subjects</Typography> */}
      <Grid container spacing={6} sx={{ p: 6, height: "100%" }}>
      
        <Grid item xs={11} md={6} lg={3} xl={3}>
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
                      delay: 0.1,
                    },
                  },
                }}
                whileInView="visible"
                viewport={{ once: true }}
              >
          <Card sx={{ backgroundColor: "#1c1c1c", color: "white" }}>
            <CardActionArea component={NavLink} to="/courses">
              <CardMedia
                component="img"
                height="140"
                image="..\src\assets\chem.png"
                alt="Subject 1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ color: "#ff6542" }}>
                  Chemistry
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ color: "lightgray" }}>
                Experienced chemistry tutor dedicated to helping students grasp complex concepts and excel in their understanding of chemical principles
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </motion.div>
        </Grid>

        <Grid item xs={11} md={6} lg={3} xl={3}style={{ position: "relative", paddingBottom: "2px" }} >
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
                      delay: 0.1,
                    },
                  },
                }}
                whileInView="visible"
                viewport={{ once: true }}
              >
            <Box sx={{ position: "absolute", top: "33px", right: "-10px", backgroundColor: "#ff6542", color: "white", padding: "4px", borderRadius: "4px", zIndex: 1 }}>
    <Typography variant="body2">Coming Soon</Typography>
  </Box>
          <Card sx={{ backgroundColor: "#1c1c1c", color: "white" }}>
            <CardActionArea component={NavLink} to="">
                
              <CardMedia
                component="img"
                height="140"
                image="..\src\assets\phy.png"
                alt="Subject 2"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div"style={{ color: "#ff6542" }}>
                  Physics
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ color: "lightgray" }}>
                Educational tool designed to aid students in understanding complex physics concepts, providing personalized assistance, explainations, and practice problems to enhance learning outcomes
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </motion.div>
        </Grid>
        {/* Add more grid items for other subjects if needed */}
      </Grid>
    </>
  );
};

export default Subjects;