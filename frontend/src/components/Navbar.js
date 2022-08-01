// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { logout, reset } from '../features/auth/authSlice'
import { useState } from "react";

// MUI imports
import AppBar from "@mui/material/AppBar";
// import Button from '@mui/material/Button';
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const navigationLinks = [
  {
    name: "Features",
    href: "#",
  },
  {
    name: "Pricing",
    href: "#",
  },
  {
    name: "About",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  // const { employee } = useSelector((state) => state.auth)

  // const onLogout = () => {
  //     dispatch(logout())
  //     dispatch(reset())
  //     navigate('/')
  // }

  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" }, fontFamily: "Titillium Web, Arial, Tahoma, Helvetica, sans-serif" }}
      />
      <CssBaseline />
      <AppBar
        className="headerNav"
        position="sticky"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar disableGutters>
          <Link underline="none" component={RouterLink} to="/">
            <img src="/images/hppy-logo.svg" alt="Hppy" />
          </Link>

          {navigationLinks.map((link) => (
            <Link
              className={`${link.name}`}
              key={link.name}
              component={RouterLink}
              to={link.href}
              variant="button"
              color="text.primary"
              href="link.href"
              underline="hover"
              sx={{ my: 1, mx: 1.5, display: { xs: "none", md: "flex" } }}
            >
              {link.name}
            </Link>
          ))}
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              display: {
                xs: "flex",
                sm: "flex",
                md: "none",
                lg: "none",
                xl: "none",
              },
              order: {
                xs: "-1",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Login Button */}
          <Button
            variant="contained"
            className="LoginBtn"
            style={{ marginInlineStart: "auto", marginInlineEnd: "5%" }}
          >
            <Link
              component={RouterLink}
              to="/login"
              color="inherit"
              underline="hover"
            >
              Login
            </Link>
          </Button>
        </Toolbar>
        <SwipeableDrawer
          open={open}
          anchor="left"
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon></ChevronLeftIcon>
            <Link underline="none">
              <img src="/images/hppy-logo.svg" alt="Hppy" />
            </Link>
            <Divider />
          </IconButton>
          <Divider />
          <List>
            {navigationLinks.map((link) => (
              <ListItem key={link.name}>
                <Link
                  className={`${link.name}`}
                  key={link.name}
                  component={RouterLink}
                  to={link.href}
                  variant="button"
                  color="text.primary"
                  href="link.href"
                  underline="hover"
                  sx={{ my: 1, mx: 1.5, display: { xs: "Flex", md: "none" } }}
                >
                  {link.name}
                </Link>
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
      </AppBar>
      {/* <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "flex" },
                order: { xs: 1 },
              }}
            >
              <Link underline="none" component={RouterLink} to="/">
                <img src="/images/hppy-logo.svg" alt="Hppy" />
              </Link>
            </Typography>
            <nav>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                underline="none"
                sx={{ my: 1, mx: 1.5 }}
              >
                Features
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                underline="none"
                sx={{ my: 1, mx: 1.5 }}
              >
                Pricing
              </Link>
              <Link
                variant="button"
                color="text.primary"
                underline="none"
                sx={{ my: 1, mx: 1.5 }}
                component={RouterLink}
                to="/about"
              >
                About
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                underline="none"
                sx={{ my: 1, mx: 1.5 }}
              >
                Contact
              </Link>
              <Link
                component={RouterLink}
                to="/login"
                variant="button"
                sx={{ my: 1, mx: 1.5 }}
              >
                Login
              </Link>
            </nav>
          </Toolbar>
      </AppBar> */}
    </>
  );
};

export default Header;
