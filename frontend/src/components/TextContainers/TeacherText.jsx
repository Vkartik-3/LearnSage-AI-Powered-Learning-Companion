import { Box, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';

function TeacherText({ type, message, video}) {
  let listItems;
 if (video && video.length > 0) {
    listItems = video.map((item) => {
      // Extract the video ID from the URL
      const video_id = item.url.split('=')[1]

      return (
        <div key={video_id}>
          <br></br>
          <h2>{item.title}</h2>
          
          <iframe 
            width="560" 
            height="315" 
            src={`https://www.youtube.com/embed/${video_id}`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
          <br></br>
        </div>
      );
    });
 } 
  return (
    <>
      <Box
        sx={{
          px: "min(200px,10%)",
          py: "70px",
          color: "lightgray",
          background: "#202426",
          width: "100%",
          border: "1px solid #1c1f2a",
        }}
      >
        <Box
          sx={{
            display: "flex",
            mb: "15px",
            alignItems: "center",
            gap: "10px",
          }}
          className="chat_text"
        >
          <Typography sx={{ background: "#1c1c1c", p: 2, borderRadius: "5px" }}>
            Teacher
          </Typography>
          <Typography
            sx={{
              color:
                type === "question"
                  ? "lightgreen"
                  : type === "explaination"
                  ? "lightgreen"
                  : type == "hint"
                  ? "lightgreen"
                  : "lightgreen", //either question ,explaination or answer
              textTransform: "capitalize",
            }}
          >
            {type}
          </Typography>
        </Box>
        <div markdown="1">
        
        <ReactMarkdown>
        {message}
        </ReactMarkdown>
        
        
        </div>
        <div>{listItems}</div>
      </Box>
      {/* <Box
      sx={{
        display: "flex",
        mb: "15px",
        alignItems: "center",
        gap: "10px",
      }}
      // className="chat_text"
      >
        {listItems}
      </Box> */}
    </>
  );
}

export default TeacherText;
