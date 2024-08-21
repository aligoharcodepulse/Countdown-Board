
import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <Button variant='contained' color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
