import * as React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiIconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Button, useMediaQuery } from "@mui/material";
import Popover from "@mui/material/Popover"; // Import Popover



const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.spacing(1),
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginLeft: 0,
    width: "100%",
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: theme.spacing(32),
        [theme.breakpoints.down("sm")]: {
            "width": theme.spacing(14),

        },
        [theme.breakpoints.up("md")]: {
            "&:focus": {
                width: theme.spacing(48),
            },
        },
    },
}));

const Navbar = ({ setSearchTerm }) => {
    const theme = useTheme();
    const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchInput, setSearchInput] = React.useState('')


    const handleAccountCircleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchTerm(searchInput); // Pass search input to parent component
    };

    const open = Boolean(anchorEl);
    const id = open ? 'account-circle-popover' : undefined;


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: theme.palette.text,
                    boxShadow: theme.shadows[1],
                    borderBottom: theme.spacing(0.2),
                }}
            >
                <Toolbar disableGutters>
                    <MuiGrid container spacing={2} sx={{ px: 2 }} >
                        {!isMobileScreen && <>
                            <MuiGrid item>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                >
                                    Grocery
                                </Typography>
                            </MuiGrid>
                            <MuiGrid item flexGrow={1}></MuiGrid></>
                        }

                        <MuiGrid item flexGrow={isMobileScreen && 1} >
                            <form onSubmit={handleSearch}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ "aria-label": "search" }}
                                        value={searchInput}
                                        onChange={handleSearchInputChange}
                                    />
                                </Search>
                            </form>
                        </MuiGrid>
                        {!isMobileScreen && <MuiGrid item flexGrow={1}></MuiGrid>}
                        <MuiGrid item >
                            <MuiGrid container spacing={2}>
                                <MuiGrid item >
                                    <MuiIconButton onClick={handleAccountCircleClick} >
                                        <AccountCircleIcon />
                                    </MuiIconButton>
                                </MuiGrid>
                                <MuiGrid item>
                                    <MuiButton startIcon={<AddShoppingCartIcon />}
                                        fullWidth variant="contained"
                                        sx={{ backgroundColor: "#0C831F", height: "45px", width: "150px" }}>
                                        My Cart
                                    </MuiButton>
                                </MuiGrid>
                            </MuiGrid>
                        </MuiGrid>
                    </MuiGrid>
                </Toolbar>
            </AppBar>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ bgcolor: 'background.paper', p: 2 }}>
                    <Button fullWidth>
                        <Typography sx={{
                            color: 'black'
                        }}>
                            User Profile
                        </Typography>
                    </Button>
                    <Button fullWidth>
                        <Typography sx={{
                            color: 'black'
                        }}>
                            Orders
                        </Typography>
                    </Button>
                    <Button fullWidth>
                        <Typography sx={{
                            color: 'black'
                        }}>
                            Log Out
                        </Typography>
                    </Button>
                </Box>
            </Popover>
        </Box >
    )
}

export default Navbar
