import { useTheme } from "./providers/theme-provider"

export function Logo({ className }: any) {

    const { theme } = useTheme()
    return (
        <img src={theme == "dark" ? "/logo.png" : "/logo-dark.png"} className={className || 'w-14'} alt="" />
    )

}