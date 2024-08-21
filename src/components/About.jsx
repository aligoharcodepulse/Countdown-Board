import { Container, Typography,Box } from "@mui/material"


const About = () => {
  return (
    <Container maxWidth='xl'>
         <Box sx={{ my: 6, textAlign: 'center',mb:6 }}>
                <Typography variant="h4" gutterBottom>Welcome to Our Latest Countdown Board Project!</Typography>
                <Typography variant="h5" gutterBottom>This board should help manage tasks added by</Typography>
                <Typography variant="h5" gutterBottom>user by dividing them into three sections:</Typography>
                <Typography variant="h5" gutterBottom>To Do, In Progress, and Completed.</Typography>
        </Box>
        <Box sx={{textAlign: 'center'}}>
                <Typography variant="h5" gutterBottom>In order to access these functionalities,</Typography>
                <Typography variant="h5" gutterBottom>just navigate to the home section in</Typography>
                <Typography variant="h5" gutterBottom> the above Navbar/ AppBar.</Typography>
        </Box>
    </Container>
  )
}

export default About
