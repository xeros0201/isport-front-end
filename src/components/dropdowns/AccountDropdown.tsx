import { DropdownInput } from "../input";
import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { useCheckAuth, useForceRerender } from "../../hooks";

enum OPTION {
    WEB_PORTAL = "Web Portal",
    ADMIN_PORTAL = "Admin Portal",
    LOGOUT = "Logout",
}

const AccountDropdown = () => {
    const [accountName, setAccountName] = useState("");
    const [value, setValue] = useState("");
    const { isCheckingAuth, isAuthed, user } = useCheckAuth();
    const forceRerender = useForceRerender();
    const navigate = useNavigate();
    const location = useLocation();

    // Prevent dropdown value from changing
    useEffect(() => {
        setAccountName(`${user?.firstName} ${user?.lastName}`);
        if (value !== accountName) setValue(accountName)
    }, [value, user]);

    // Filter options based on admin/public route
    const options = useMemo(() => {
        const { pathname } = location;
        const isAdminRoute = pathname.startsWith(import.meta.env.VITE_ADMIN_PREFIX);
        return [
            isAdminRoute
                ? { value: OPTION.WEB_PORTAL, label: OPTION.WEB_PORTAL }
                : { value: OPTION.ADMIN_PORTAL, label: OPTION.ADMIN_PORTAL },
            { value: OPTION.LOGOUT, label: OPTION.LOGOUT },
        ];
    }, [location]);

    // Handle option selection
    const handleChange = (value: string) => {
        switch (value) {
            case OPTION.WEB_PORTAL:
                navigate(import.meta.env.VITE_DEFAULT_PUBLIC_ROUTE)
                break;
            case OPTION.ADMIN_PORTAL:
                navigate(import.meta.env.VITE_DEFAULT_ADMIN_ROUTE);
                break;
            case OPTION.LOGOUT:
                logout().then(() => navigate(import.meta.env.VITE_LOGIN_ROUTE));
                break;
            default:
                break;
        }
        forceRerender();
    };

    // Do not show component if user is not authed
    if (isCheckingAuth || !isAuthed) return null;

    return (
        <DropdownInput
            dropDownName="account-dropdown"
            value={accountName}
            options={options}
            onChange={handleChange}
        />
    );
};

export default AccountDropdown;