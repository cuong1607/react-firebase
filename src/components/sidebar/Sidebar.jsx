import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import AlertDialogSlide from "../modal";
import { Button } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import Constant from "../../enum/Constant";

const Sidebar = () => {
    const { dispatchTheme } = useContext(DarkModeContext);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const { dispatch } = useContext(AuthContext)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const onClickClose = () => {
        setOpen(false);
    }
    const onClickComfirm = () => {
        dispatch({type: Constant.Logout});
        navigate("/login")
    }

    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">lamadmin</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Th???ng k??</span>
                        </li>
                    </Link>
                    <p className="title">LISTS</p>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Ng?????i d??ng</span>
                        </li>
                    </Link>
                    <Link to="/products" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreIcon className="icon" />
                            <span>S???n ph???m</span>
                        </li>
                    </Link>
                    <li>
                        <CreditCardIcon className="icon" />
                        <span>????n h??ng</span>
                    </li>
                    <li>
                        <LocalShippingIcon className="icon" />
                        <span>Giao h??ng</span>
                    </li>
                    <p className="title">USEFUL</p>
                    <li>
                        <InsertChartIcon className="icon" />
                        <span>Tr???ng th??i</span>
                    </li>
                    <li>
                        <NotificationsNoneIcon className="icon" />
                        <span>Th??ng b??o</span>
                    </li>
                    <p className="title">SERVICE</p>
                    <li>
                        <SettingsSystemDaydreamOutlinedIcon className="icon" />
                        <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyOutlinedIcon className="icon" />
                        <span>Nh???t k??</span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon className="icon" />
                        <span>C??i ?????t</span>
                    </li>
                    <p className="title">USER</p>
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Th??ng tin t??i kho???n</span>
                    </li>
                    <Button onClick={handleClickOpen}>
                        <li>
                            <ExitToAppIcon className="icon" />
                            <span>????ng xu???t</span>
                        </li>
                    </Button>
                </ul>
            </div>
            <div className="bottom">
                <div
                    className="colorOption"
                    onClick={() => dispatchTheme({ type: "LIGHT" })}
                ></div>
                <div
                    className="colorOption"
                    onClick={() => dispatchTheme({ type: "DARK" })}
                ></div>
            </div>
            <AlertDialogSlide
                header={"????ng xu???t"}
                title={"B???n c?? mu???n ????ng xu???t kh??ng?"}
                isLogout={open}
                setIsLogOut={setOpen}
                onClickClose = {onClickClose}
                onClickComfirm = {onClickComfirm}
            />
        </div>
    );
};

export default Sidebar;
