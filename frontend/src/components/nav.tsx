

import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { ModeToggle } from "./theme-toggle"
import { Logo } from "./Logo"
import { Button } from "./ui/button"

export function Nav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            className={cn("w-full px-8 py-4 flex items-center justify-between space-x-4 lg:space-x-6 border-b ", className)}
            {...props}
        >
            <div className="flex items-center space-x-5">
                <Logo />
                <Link
                    to="/"
                    className="text-sm font-medium transition-colors hover:text-primary"
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    About
                </Link>

            </div>
            <div className="flex items-center space-x-4">
                <Button size={"sm"} asChild>
                    <Link to="/login">
                        login
                    </Link>
                </Button>
                <ModeToggle />
            </div>
        </nav>
    )
}