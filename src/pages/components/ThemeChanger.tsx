import useTheme from "@/hooks/useTheme";
import { Input } from "antd";

export default function ThemeChanger(){
    const [theme, setTheme] = useTheme()

    return (
        <div>
            <Input value={theme} onChange={e=>setTheme(e.target.value)} type="color"></Input>           
        </div>
    )
}