import { useMemo, useState } from "react";
import { DropdownInput } from "../input";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavigationDropdownProps {
    menu: Menu;
}

const NavigationDropdown = ({ menu }: NavigationDropdownProps) => {
    const [value, setValue] = useState(menu[0].path);
    const location = useLocation();
    const navigate = useNavigate();

    // Convert menu to input options
    const options = useMemo(() => {
        return menu.map(({ label, path }) => ({
            value: path,
            label,
        }));
    }, []);
    
    // Update value if location changes
    useEffect(() => {
        const { pathname } = location;
        const newValue = options.find(({ value }) => value === pathname)?.value;
        if (newValue) setValue(newValue);
    }, [location]);

    return (
        <DropdownInput
            onChange={(path) => navigate(path)}
            options={options}
            value={value}
        />

    );
};

export default NavigationDropdown;