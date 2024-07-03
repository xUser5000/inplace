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
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function CreateOffersPage() {
    const navigate = useNavigate()
    const { token } = useAuth()
    const [createErr, setCreateErr] = useState<string | null>(null)

    const formSchema = z.object({
        title: z.string().nonempty(),
        // longitude: z.number().min(-180).max(180),
        // latitude: z.number().min(-90).max(90),
        images: z.array(z.string()),
        isFurnished: z.boolean(),
        offerPrice: z.number(),
        offerType: z.string(),
        floorNumber: z.number().int(),
        roomCount: z.number().int(),
        bathroomCount: z.number().int(),
        bedCount: z.number().int(),
        area: z.number(),
        appliances: z.array(z.string()).optional(),
        // notes: z.string().optional(),
        description: z.string().max(50)
    })



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            // longitude: 0,
            // latitude: 0,
            images: [""],
            isFurnished: false,
            offerType: "for_rent",
            offerPrice: 0,
            floorNumber: 0,
            roomCount: 0,
            bathroomCount: 0,
            bedCount: 0,
            area: 0,
            appliances: [],
            // notes: "",
            description: ""
        },
    })

    function handleFileChange(event: any) {
        const files = Array.from(event.target.files);
        const fileURLs = files.map((file: any) => URL.createObjectURL(file));
        form.setValue('images', fileURLs);
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Creating offer", values)
        setCreateErr(null)
        fetch(import.meta.env.VITE_API_URL + "/offers/create", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'x-auth-token': token || ""
            },
            body: JSON.stringify(values),
        }).then(res => res.json()).then(data => {
            if (data.message) {
                setCreateErr(data.message)
            } else {
                navigate("/profile/offers")
            }
        })
    }

    return (
        <Card className="my-10 py-5 mx-auto container ">
            <CardHeader>
                <CardTitle>Create Offer</CardTitle>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        {/* <FormField
                            control={form.control}
                            name="longitude"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Longitude</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Longitude" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="latitude"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Latitude</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Latitude" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}


                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Images</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Image URL" {...field}

                                            onChange={event => field.onChange(event.target.value.split(","))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-between">
                            <FormField
                                control={form.control}
                                name="isFurnished"
                                render={({ field }) => (
                                    <FormItem
                                        className="flex items-center gap-3"
                                    >
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>Is Furnished</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                            <FormField
                                control={form.control}
                                name="offerType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Offer type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a verified email to display" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="for_rent">For Rent</SelectItem>
                                                <SelectItem value="for_sale">For Sale</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )} />

                            <FormField
                                control={form.control}
                                name="offerPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Offer Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Offer price" {...field}
                                                onChange={event => field.onChange(+event.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="floorNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Floor Number</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Floor Number" {...field}

                                                onChange={event => field.onChange(+event.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="roomCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Room Count</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Room Count" {...field}

                                                onChange={event => field.onChange(+event.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bathroomCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bathroom Count</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Bathroom Count" {...field}
                                                onChange={event => field.onChange(+event.target.value)}
                                            />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bedCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bed Count</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Bed Count" {...field}
                                                onChange={event => field.onChange(+event.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="area"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Area</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Area" {...field}
                                                onChange={event => field.onChange(+event.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="appliances"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Appliances</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Appliance" {...field}

                                                onChange={event => field.onChange(event.target.value.split(","))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </div>
                        {/* <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Notes" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        {createErr && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{createErr}</AlertDescription>
                            </Alert>
                        )}

                        <Button className="w-full" type="submit">Create Offer</Button>
                    </form>
                </Form>
            </CardContent>
        </Card >
    )
}
