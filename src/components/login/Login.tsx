import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "./Login.css"
import Snackbar from '@mui/material/Snackbar';

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
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";

import { auth, provider } from "../../firebase/Firebase";


const LoginSchema = z.object({
    email: z.string().email("Email is invalid"),
    password: z.string().min(8, "Password should be of 8 characters")
})

type LoginFormData = z.infer<typeof LoginSchema>

export default function Login() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<LoginFormData>(
        {
            resolver: zodResolver(LoginSchema),
            mode: "onChange",
        })
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

    const handleLogin = async (data: LoginFormData) => {

        try {
            const { email, password } = data;
            await signInWithEmailAndPassword(auth, email, password);
            // alert("User Logged in successfully");
            showSnackbar("User Logged In Successfully")
            setTimeout(() => navigate("/dashboard"),500)

        }
        catch (error) {
            // alert("Invalid username or password")
            showSnackbar("Invalid Username Or Password")
            // setTimeout(() => navigate("/register"),500)

        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            // alert("User Logged in successfully");
            showSnackbar("User Logged In Successfully")
            setTimeout(() => navigate("/dashboard"),500)

        }
        catch (error) {
            // alert("Google sign in failed")
            showSnackbar("User Logged In Successfully")
            // setTimeout(() => navigate("/register"),500)
        }
    };
    
     return (
    <>
    <div className="DesignLogin">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwDiicpDsawpNveT7Ota2-EC_vZbP8vneTbg&sSpotify" alt="" />
        <p style={{ fontSize: "50px", background: "none", color: "white", display: "inline", marginTop: "0px", marginBottom: "20px" }}>Spotify</p>
 
      <form onSubmit={handleSubmit(handleLogin)} style={{ backgroundColor: "transparent", display:"flex" , flexDirection:"column" ,gap:"10px" ,width:"400px" }} >
        
        
        <TextField
        InputLabelProps={{
    sx: { color: 'white' }, 
  }}
          InputProps={{
              sx: { borderRadius: '30px', color: "white", backgroundColor: "black", marginBottom: "10px", display: "inline", border: "2px solid white" },
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
          
            sx={{ borderRadius: '30px', color: "white", backgroundColor: "black", border: "2px solid white" }}
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

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 , borderRadius:"30px" ,padding:"10px"}} >
          Login
        </Button>

      
      </form>
          <Button
           style={{ border: " 2px solid white", color: "white", background: "none" ,borderRadius:"30px" }}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 ,width:"400px", padding:"15px" }}
        onClick={handleGoogleLogin}
      >
        Login with Google
      </Button>

        <Typography sx={{ background: "transparent", color: "white", marginTop: "15px" }} align="center" >
          Don’t have an account? <Link style={{ textDecoration: "none", color: "white" }} to="/register">Sign up</Link>
        </Typography>
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

