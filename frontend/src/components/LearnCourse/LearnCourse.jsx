import React, { useState, useEffect, useRef } from "react";
import ProgressSidebar from "./ProgressSidebar";
import Navbar from "../navbar/Navbar";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Typography, TextField, Backdrop } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import StudentText from "../TextContainers/StudentText";
import TeacherText from "../TextContainers/TeacherText";
import lottieData from "../../assets/lottie-data";
import { useParams } from "react-router-dom";

import Button from '@mui/material/Button';
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";

const NavbarContainer = ({ children }) => {
  const location = useLocation();

  return (
    <div style={{ backgroundColor: "#0c0e0d", color: "lightgray", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {children}
    </div>
  );
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: lottieData,

  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

import Lottie from "react-lottie";
function LearnCourse() {
  let { courseid } = useParams();
  const [courseDetails, setCourseDetails] = useState({});
  const [modules, setModuleDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [studentStage, setStudentStage] = useState("doubt"); // doubt or answer
  const [expectedSolution, setExpectedSolution] = useState({
    hint: "",
    question: "",
    answer: "",
  }); //state containing hint and answer if student is unable to answer the q
  const [currentModule, setCurrentModule] = useState(0);
  const [studentText, setStudentText] = useState("");
  const [courseDifficulty, setCourseDifficulty] = useState("medium");
  let inputimage=useRef(null);
  const [image,setimage] = useState("");
  // const [conversationList, setConversationList] = useState([
  //   {
  //     sender: "Teacher",
  //     type: "explaination",
  //     message:
  //       " Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create MachineLearning Algorithms in Python and RLearn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create Machine Learning Algorithms in Python and R",
  //   },
  //   {
  //     sender: "Student",
  //     type: "doubt",
  //     message:
  //       " Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create MachineLearning Algorithms in Python and RLearn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create Machine Learning Algorithms in Python and R",
  //   },
  //   {
  //     sender: "Teacher",
  //     type: "explaination",
  //     message:
  //       " Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create MachineLearning Algorithms in Python and RLearn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create Machine Learning Algorithms in Python and R",
  //   },
  // ]);

  console.log(courseDetails);
  console.log(modules[0]);
  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:8000/api/courses/coursedetails/" + courseid)
      .then(function (response) {
        console.log(response.data.coursedetails);
        setCourseDetails(response?.data?.coursedetails);
        setModuleDetails(response?.data?.modules);

        const curconversation =
          response?.data?.coursedetails?.modules?.[currentModule]?.conversation;
        console.log("conversation")
          console.log(curconversation?.length); 
        if (
          curconversation?.length == 0 ||
          curconversation?.[curconversation.length - 1]?.type ===
            "explaination" ||
          curconversation?.[curconversation.length - 1]?.type === "doubt"
        )
          setStudentStage("doubt");
        else setStudentStage("answer");

        console.log(studentStage);
        setLoading(false);
        
      })
      
    //   const firstModule = modules?.[0];
      
    //   if (firstModule) {
    //     // Set the current module to the first module
    //     setCurrentModule(firstModule.id);

    //     // Get the conversation of the current module
    //     const curconversation = firstModule;
        
    //     if (
    //       curconversation?.length == 0 ||
    //       curconversation?.[curconversation.length - 1]?.type ===
    //         "explaination" ||
    //       curconversation?.[curconversation.length - 1]?.type === "doubt"
    //     )
    //       setStudentStage("doubt");
    //     else setStudentStage("answer");
    //   }

    //   setLoading(false);
    // })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const curconversation =
      courseDetails?.modules?.[currentModule]?.conversation;
      console.log(curconversation?.length)

    if (curconversation != undefined && curconversation?.length == 0) {
      setLoading(true);
      console.log("topic")
      console.log(courseDetails?.modules?.[currentModule]?.topic)
      //if curconversation  exists and length is zero call chat gpt api to generate questions
      axios
        .post("http://localhost:8000/openai/explainllm/", {
          topic: courseDetails?.modules?.[currentModule]?.topic,
          difficulty: courseDifficulty,
        })
        .then((response) => {
          console.log(response?.data);
          setCourseDetails((prev) => ({
            ...prev,
            modules: [
              ...prev.modules.slice(0, currentModule),
              {
                ...prev.modules?.[currentModule],
                conversation: [
                  {
                    sender: "Teacher",
                    type: "explaination",
                    message: response?.data?.data,
                    video: response?.data?.video
                  },
                ],
              },
              ...prev.modules.slice(currentModule + 1),
            ],
          }));
          setLoading(false);
        })
        .catch(function (err) {
          console.log(err);

          setLoading(false);
        });
        // console.log(response);
    }
  }, [currentModule, courseDetails?.modules?.[currentModule]?.topic]);

  function studentTextSubmitHandler() {
    setLoading(true);
    switch (studentStage) {
      case "doubt":
        studentDoubtHandler();
        break;

      case "answer":
        studentAnswerHandler();
        break;
      default:
    }
    setStudentText("");
  }
  function studentDoubtHandler() {
    axios
      .post("http://localhost:8000/openai/doubtllm/", {
        topic: courseDetails?.modules?.[currentModule].topic,
        doubt: studentText,
      })
      .then(function (response) {
        console.log(response?.data?.data?.answer);
        setCourseDetails((prev) => ({
          ...prev,
          modules: [
            ...prev.modules.slice(0, currentModule),
            {
              ...prev.modules?.[currentModule],
              conversation: [
                {
                  sender: "Student",
                  type: "doubt",
                  message: studentText,
                },
                {
                  sender: "Teacher",
                  type: "explaination",
                  message: response?.data?.data?.answer,
                  
                },
              ],
            },
            ...prev.modules.slice(currentModule + 1),
          ],
        }));
        // console.log(courseDetails.modules?.[currentModule]?.conversation?.message)
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }

  function studentHintHandler() {
    setCourseDetails((prev) => ({
      ...prev,
      modules: [
        ...prev.modules.slice(0, currentModule),
        {
          ...prev.modules?.[currentModule],
          conversation: [
            // ...prev.modules?.[currentModule].conversation,
            {
              sender: "Teacher",
              type: "hint",
              message: expectedSolution.hint,
            },
          ],
        },
        ...prev.modules.slice(currentModule + 1),
      ],
    }));
  }
  function studentAnswerHandler() {
    //if answer is correct
    setLoading(true);

    axios
      .post("http://localhost:8000/openai/check/", {
        // topic: courseDetails?.modules?.[currentModule]?.topic,
        topic: "React",
        question: expectedSolution?.question,
        answer: studentText,
      })
      .then(function (response) {
        if (
          response?.data?.data?.answer_status?.toLowerCase() == "correct" ||
          response?.data?.data?.answer_status?.toLowerCase() == "correct."
        ) {
          setCourseDetails((prev) => ({
            ...prev,
            modules: [
              ...prev.modules.slice(0, currentModule),
              {
                ...prev.modules?.[currentModule],
                status: true,
                conversation: [
                  ...prev.modules?.[currentModule].conversation,
                  {
                    sender: "Student",
                    type: "answer",
                    message: studentText,
                  },
                  {
                    sender: "Teacher",
                    type: "correction",
                    message:
                      "Well done! You've perfected " +
                      modules?.[currentModule]?.topic,
                  },
                ],
              },
              ...prev.modules.slice(currentModule + 1),
            ],
          }));
        } else {
          setCourseDetails((prev) => ({
            ...prev,
            modules: [
              ...prev.modules.slice(0, currentModule),
              {
                ...prev.modules?.[currentModule],
                conversation: [
                  ...prev.modules?.[currentModule].conversation,
                  {
                    sender: "Student",
                    type: "answer",
                    message: studentText,
                  },
                  {
                    sender: "Teacher",
                    type: "explaination",
                    message:
                      "You're not quite correct. Feel free to ask me for a hint if you're stuck!",
                  },
                ],
              },
              ...prev.modules.slice(currentModule + 1),
            ],
          }));
        }

        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
        setLoading(false);
      });
  }
  function studentProceedandler() {
    setLoading(true);
    setStudentStage("answer");

    axios
      .post("http://localhost:8000/openai/question/", {
        topic: courseDetails?.modules?.[currentModule]?.topic,
      })
      .then(function (response) {
        console.log(response);

        setExpectedSolution({
          answer: response?.data?.data?.answer, //if user gives up
          hint: response?.data?.data?.hint,
          question: response?.data?.data?.question,
        });
        setCourseDetails((prev) => ({
          ...prev,
          modules: [
            ...prev.modules.slice(0, currentModule),
            {
              ...prev.modules?.[currentModule],
              conversation: [
                ...prev.modules?.[currentModule].conversation,
                {
                  sender: "Teacher",
                  type: "question",
                  message: response?.data?.data?.question,
                },
              ],
            },
            ...prev.modules.slice(currentModule + 1),
          ],
        }));

        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
        setLoading(false);
      });
  }
  function uploadimage(){
    inputimage.current.click();
    console.log("abc");
    handleImage
  }
  function handleImage(event){
    const file = event.target.files[0];
    
    console.log("abc",file);
    // const formData = new FormData();
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result; 
        // console.log(base64Image);
        send(base64Image);
        // img=base64Image;
      };
      reader.readAsDataURL(file);
    }
    setimage(file);
    
    
  }
  function send(baseimg){
    setLoading(true);
    console.log(baseimg);
    axios
      .post("http://localhost:8000/openai/photollm/", {
        topic: courseDetails?.modules?.[currentModule].topic,
        photo: baseimg,
      })
      .then(function (response) {
        console.log(response?.data?.data?.answer);
        setCourseDetails((prev) => ({
          ...prev,
          modules: [
            ...prev.modules.slice(0, currentModule),
            {
              ...prev.modules?.[currentModule],
              conversation: [
                {
                  sender: "Student",
                  type: "doubt",
                  message: "The uploaded image is : ",
                  imagex : baseimg,
                },
                {
                  sender: "Teacher",
                  type: "explanation",
                  message: response?.data?.data?.description,
                  
                },
              ],
            },
            ...prev.modules.slice(currentModule + 1),
          ],
        }));
        // console.log(courseDetails.modules?.[currentModule]?.conversation?.message)
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }
  return (
    <div>
      {/* <Navbar /> */}

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

      <Grid container sx={{ height: "90vh" }}>
        <Backdrop
          sx={{ color: "#202426", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        ></Backdrop>
        <Grid
          xs={12}
          md={3}
          lg={2}
          sx={{
            p: 0,
            m: 0,
            overflowY: "auto",
            height: "100%",
            background: "#202426",
            color: "white",
          }}
        >
          <ProgressSidebar
            currentModule={currentModule}
            setCurrentModule={setCurrentModule}
            courseDetails={courseDetails}
            setCourseDetails={setCourseDetails}
            modules={modules}
            setModuleDetails={setModuleDetails}
            courseDifficulty={courseDifficulty}
            setCourseDifficulty={setCourseDifficulty}
          />
        </Grid>
        <Grid
          xs={12}
          md={9}
          lg={10}
          sx={{
            overflowY: "auto",
            height: "90vh",
            width: "100%",
            background: "#202426",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          container
        >
          {loading && (
            <Lottie
              options={defaultOptions}
              height={400}
              width={400}
              isClickToPauseDisabled={true}
              style={{ position: "absolute" }}
            />
          )}
          <Box sx={{ minHeight: "50vh", width: "100%" }}>
            {courseDetails?.modules?.[currentModule]?.conversation.map(
              (conversation) => {
                return (
                  <>
                    {conversation.sender === "Teacher" ? (
                      <TeacherText
                        type={conversation?.type}
                        message={conversation?.message}
                        video={conversation?.video}
                      />
                    ) : (
                      <StudentText
                        type={conversation?.type}
                        message={conversation?.message}
                        imagex={conversation?.imagex}
                      />
                    )}
                  </>
                );
              }
            )}
          </Box>
          <Box
            sx={{
              height: "20vh",
              width: "100%",
              pb: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              bgcolor: "#202426",
              mt: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                bgcolor: "#202426",
                gap: "20px",
                width: "80%",
                my: "20px",
              }}
            >
              {studentStage == "doubt"
                ?courseDetails?.modules?.[currentModule]?.status == false && (
                    <>
                      <Typography
                        className="action_item cursor_pointer"
                        style={{backgroundColor: "#ff6542" }}
                        onClick={() => {
                          setStudentStage("doubt");
                        }}
                      >
                        Ask a Doubt
                      </Typography>

                      <Typography
                        className="action_item cursor_pointer"
                        
                        style={{backgroundColor: "#ff6542" , height:"45px"}}
                        onClick={uploadimage}
                        
                      >
                        <div>
                        <img src="..\src\assets\image.png" alt="upload" style={{height:"30px"}}/>
                        <input type="file"  ref={inputimage} onChange={handleImage} style={{ display: "none" }} />
                        </div>
                      </Typography>
                    </>
                  )
                :courseDetails?.modules?.[currentModule]?.status == false && (
                    <div>
                      <Typography
                        className="action_item cursor_pointer"
                        onClick={studentHintHandler}
                      >
                        Ask for a Hint
                      </Typography>
                    </div>
                  )
                  }
            </Box>
            <TextField
              id="outlined-basic"
              label={studentStage}
              variant="filled"
              color="warning"
              disabled={currentModule?.status === true}
              sx={{ width: "80%", bgcolor: "lightgray" }}
              value={studentText}
              onChange={(e) => setStudentText(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SendIcon
                      className="cursor_pointer"
                      onClick={
                        currentModule?.status === true
                          ? () => {}
                          : studentTextSubmitHandler
                      }
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default LearnCourse;



