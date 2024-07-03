import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { User } from "@/lib/types";
import { Logo } from "@/components/Logo"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})


export function Login() {
    const navigate = useNavigate()
    const { user, login } = useAuth()

    useEffect(() => {
        console.log("user is", user)
        if (user) {
            return navigate("/")
        }
    }, [user])


    const [loginErr, setLoginErr] = useState<string | null>(null)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoginErr(null)
        fetch(import.meta.env.VITE_API_URL + "/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password
            }),
        }).then(res => res.json()).then(data => {
            if (data.message) {
                setLoginErr(data.message)
            }

            if (data.token) {
                let user: User = {
                    id: data.user.id,
                    first_name: data.user.first_name,
                    last_name: data.user.last_name,
                    phone_number: data.user.phone_number,
                    bio: data.user.bio,
                    email: data.user.email,
                    verified: data.user.verified,
                    createdAt: data.user.createdAt,
                    updatedAt: data.user.updatedAt,
                }
                login({ user: user, token: data.token })
                return navigate("/")
            }

        })
    }

    return (
        <Card className=" w-[350px] md:w-[450px] mx-auto mt-20 ">
            <CardHeader>
                <Logo className="w-64 mx-auto my-10" />
                <CardTitle>Login</CardTitle>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {loginErr && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{loginErr}</AlertDescription>
                            </Alert>
                        )}

                        <div className="flex items-center justify-between mb-1">
                            <div className="flex-1"></div>
                            {/* <Label asChild>
                                <Link to="/forgot-password">
                                    Forgot Password ?</Link>
                            </Label> */}
                            <Label asChild>
                                <Link to="/register">Register</Link>
                            </Label>
                        </div>

                        <Button className="w-full" type="submit">Login</Button>
                    </form>
                </Form>

            </CardContent>

        </Card>
    )
}


