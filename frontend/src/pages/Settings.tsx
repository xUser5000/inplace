import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuth } from "@/components/providers/auth-provider"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function SettingsPage() {
    const { user, token, login } = useAuth();
    const [ buttonEnabled, setButtonEnabled ] = useState<boolean>(true);

    const formSchema = z.object({
        first_name: z.string(),
        last_name: z.string(),
        bio: z.string(),
        phone_number: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: user?.first_name,
            last_name: user?.last_name,
            bio: "",
            phone_number: user?.phone_number,
        },
    })

    function onSubmit() {
        const values = form.getValues();
        setButtonEnabled(false);
        fetch(import.meta.env.VITE_API_URL + "/users/update", {
            method: "PATCH",

            headers: {
                'Content-Type': "application/json",
                'x-auth-token': token || ""
            },
            body: JSON.stringify({
                first_name: values.first_name,
                last_name: values.last_name,
                bio: values.bio,
                phone_number: values.phone_number
            }),
        }).then(res => res.json()).then(res => {
            setButtonEnabled(true);
            login({ user: res, token: token || "" });
        })
    }



    return (
        <Card className="w-full h-full mt-10">
            <CardHeader>
                <h1 className="font-bold text-xl md:text-3xl">Settings</h1>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col w-full h-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-5">
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First name</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="first name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="last_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="last name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="bio" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </form>

                        <Button type="submit" className="mt-5" disabled={!buttonEnabled} onClick={onSubmit}>
                            Update Profile
                        </Button>
                    </Form>
                </div>
            </CardContent>
        </Card>
    )
}