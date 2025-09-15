import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Switch } from "antd"

interface ThemeToggleProps {
    isDarkMode: boolean;
    onChange: (checked: boolean) => void;
}

export const ThemeToggle = ({ isDarkMode, onChange }: ThemeToggleProps) => {
    return (
        <Switch
            checked={isDarkMode}
            onChange={onChange}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
        />
    )
}