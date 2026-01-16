import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "./Register.css";

import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { auth, provider, db } from "../../firebase/Firebase";
import { setDoc, doc } from "firebase/firestore";
import Snackbar from '@mui/material/Snackbar';

const RegisterUserSchema = z
  .object({
    username: z.string().min(4, "Username should be of minimum 4 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters").refine((val) => !val.includes(" "), {
      message: "Password must not contain spaces",
    }),
    cpassword: z.string().min(8, "Confirm Password not matches the above password"),
  })
  .refine((data) => data.password === data.cpassword, {
    path: ["cpassword"],
    message: "Confirm Password and Password doesn't match",
  });

type RegisterFormData = z.infer<typeof RegisterUserSchema>;


export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: "",
  });

  const showSnackbar = (
    message: string,
  ) => {
    setSnackbar({
      open: true,
      message,
    });
  };


  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterUserSchema),
    mode: "onChange",
  });


  const handleRegister = async (data: RegisterFormData) => {
    try {
      const { email, password, username } = data;

      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email,
          username,
        });
      }

      reset();
      // alert("Registration Successfull")
      showSnackbar("Registration successful");
      setTimeout(() => navigate("/"), 500);

    } catch (error) {
      showSnackbar("User Already Signed In");
      console.error(error);
    }
  };


  const handleSignin = async () => {
    try {

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      showSnackbar("Registration successful");
      navigate("/");
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
      }
    } catch (error) {
      alert("Invalid login");
      showSnackbar("Not able to sign in with google");
      navigate("/register");
    }
  };


  return (
    <>
      <div className="Design" style={{backgroundColor:"black"}}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwDiicpDsawpNveT7Ota2-EC_vZbP8vneTbg&sSpotify" alt="" />
        <p style={{ fontSize: "50px", background: "none", color: "white", display: "inline", marginTop: "0px", marginBottom: "0px" }}>Spotify</p>



        <form onSubmit={handleSubmit(handleRegister)} style={{ backgroundColor: "transparent"}}  >
          <TextField
            InputLabelProps={{
    sx: { color: 'white' }, 
  }}
            InputProps={{
              sx: { borderRadius: '30px', color: "white", backgroundColor: "black", marginBottom: "10px", display: "inline", border: "2px solid white" },
            }}
            fullWidth
            label="Name"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            InputLabelProps={{
    sx: { color: 'white' }, 
  }}
            InputProps={{
              sx: { borderRadius: '30px', color: "white", backgroundColor: "black", marginBottom: "15px", display: "inline", border: "2px solid white" },
            }}
            fullWidth
            label="Email Address"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <FormControl fullWidth error={!!errors.password}>
            <InputLabel style={{color:"white"}}>Password</InputLabel>
            <OutlinedInput
              sx={{ borderRadius: '30px', color: "white", backgroundColor: "black", border: "2px solid white" ,marginBottom:"15px"}}
              type={showPassword ? "text" : "password"}
              {...register("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{errors.password?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth error={!!errors.cpassword}>
            <InputLabel style={{color:"white"}}>Confirm Password</InputLabel>
            <OutlinedInput
              sx={{ borderRadius: '30px', color: "white", backgroundColor: "transparent", border: "2px solid white"}}
              type={showPassword ? "text" : "password"}
              {...register("cpassword")}
            />
            <FormHelperText>{errors.cpassword?.message}</FormHelperText>
          </FormControl>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2,  borderRadius:"30px", padding:"10px"}}>
            Register
          </Button>

          <Typography align="center" sx={{ background: "transparent", color: "white", marginTop: "15px" }}>
            Already have an account? <Link style={{ textDecoration: "none", color: "white" }} to="/">Login</Link>
          </Typography>
        </form>
        <Button 
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 ,width:"400px", padding:"15px",border: " 2px solid white", color: "white", background: "none" ,borderRadius:"30px"}}
          onClick={handleSignin}
        >
          Sign up with Google
        </Button>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbar.message}
      />

    </>

  );
}
