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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useMemo, useRef } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function CreateOffersPage() {
    const navigate = useNavigate()
    const { token } = useAuth()
    const [createErr, setCreateErr] = useState<string | null>(null);

    const [image, setImage] = useState<any | null>(null);
    const [isLocationDialogOpen, setIsLocationDialogOpen] = useState<boolean>(false);
    const [location, setLocation] = useState<any>({
        lat: 30.42477645760958,
        lng: 31.039046040333268
    });
    const markerRef = useRef<any>(null);
    const markerEventHandlers = useMemo(
        () => ({
          dragend() {
            const marker: any = markerRef.current
            if (marker != null) {
              setLocation(marker.getLatLng());
            }
          },
        }),
        [],
    )
    const formSchema = z.object({
        title: z.string().nonempty(),
        longitude: z.number().min(-180).max(180).nullable(),
        latitude: z.number().min(-90).max(90).nullable(),
        image: z.any().nullable(),
        isFurnished: z.boolean(),
        offerPrice: z.number(),
        offerType: z.string(),
        floorNumber: z.number().int(),
        roomCount: z.number().int(),
        bathroomCount: z.number().int(),
        bedCount: z.number().int(),
        area: z.number(),
        appliances: z.string().optional(),
        // notes: z.string().optional(),
        description: z.string().max(50)
    })



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            longitude: null,
            latitude: null,
            isFurnished: false,
            offerType: "for_rent",
            offerPrice: 0,
            floorNumber: 0,
            roomCount: 0,
            bathroomCount: 0,
            bedCount: 0,
            area: 0,
            appliances: "",
            description: ""
        },
    })

    function handleImageChange(event: any) {
        setImage(() => event.target.files[0]);
    }

    function handleLocationButtonClicked() {
        setIsLocationDialogOpen(true);
    }

    function onSubmit() {
        console.log("Creating offer");
        setCreateErr(null);
        const data = new FormData();
        console.log(form.getValues());
        Object.entries(form.getValues()).forEach(([key,value]) => {
            data.append(key, value);
        });
        data.append("images", image);
        data.delete("image");   // redundant entry (will be undefined anyway)
        console.log(data);
        fetch(import.meta.env.VITE_API_URL + "/offers/create", {
            method: "POST",
            headers: {
                'x-auth-token': token || ""
            },
            body: data,
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

                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Button
                                    className="w-full"
                                    type="button"
                                    variant={"outline"}
                                    onClick={handleLocationButtonClicked}
                                >
                                    Choose Location
                                    {" "}
                                    {
                                        form.getValues("longitude") && form.getValues("latitude") &&
                                        ( "(" + form.getValues("longitude") + ", " + form.getValues("latitude") + ")" )
                                    }
                                </Button>
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                        {/* Location Dialog */}
                        <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
                            <DialogContent className="sm:max-w-[90vw]" onCloseAutoFocus={() => false}>
                                <DialogHeader>
                                    <DialogTitle>Select the location of the apartment</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    Drag the marker to the desired location
                                </DialogDescription>
                                <div className="container">
                                {/*@ts-ignore*/}
                                <MapContainer center={location} zoom={13} style={{ height: '400px', width: '100%' }}>
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        <Marker
                                            position={location}
                                            /*@ts-ignore*/
                                            draggable={true}
                                            eventHandlers={markerEventHandlers}
                                            ref={markerRef}
                                        />
                                    </MapContainer>
                                </div>
                                <DialogFooter>
                                    <Button
                                        type="submit"
                                        onClick={() => {
                                            form.setValue("longitude", location.lng);
                                            form.setValue("latitude", location.lat);
                                            setIsLocationDialogOpen(false);
                                        }}
                                    >
                                        Save changes
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>


                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Input type="file" {...field} onChange={handleImageChange} />
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
