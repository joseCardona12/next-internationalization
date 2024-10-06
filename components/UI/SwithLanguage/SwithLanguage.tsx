import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
export default function SwithLanguage(): React.ReactElement{
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        Cookie.set("locale", event.target.value);
        router.refresh();
    }
    return (
        <select name="select-language" onChange={handleChange}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
        </select>
    )
}