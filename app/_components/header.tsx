"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, CircleUserRoundIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Header = () => {
    const { data, status } = useSession();

    const handleLoginClick = () => {
        signIn("google");
    }

    const handleLogoutClick = () => {
        signOut();
    }

    return (
        <Card>
            <CardContent className="p-5 justify-between items-center flex flex-row">
                <Image src='/logo.png' alt="logo fsw" height={22} width={120} />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="p-0">
                        <SheetHeader className="text-left border-b border-solid border-secondary p-5">
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>

                        {data?.user ? (
                            <div className="flex justify-between px-5 py-3 items-center">
                                <div className="flex items-center gap-3 ">
                                    <Avatar>
                                        <AvatarImage src={data.user?.image ?? ""} />
                                    </Avatar>
                                    <h2 className="font-bold">{data.user?.name}</h2>

                                </div>
                                <Button variant="secondary" size="icon" onClick={handleLogoutClick}>
                                    <LogOutIcon />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col px-5 py-6 gap-3">
                                <div className="flex gap-2 items-center">
                                    <CircleUserRoundIcon size={32} className="text-gray-400" />
                                    <h2 className="text-sm">Olá, realize seu login!</h2>
                                </div>
                                <div>
                                    <Button className="w-full justify-start" variant="secondary" onClick={handleLoginClick}>
                                        <LogInIcon className="mr-2" size={18} />
                                        Fazer Login
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col gap-3 px-5">
                            <Button variant="outline" className="justify-start" asChild>
                                <Link href="/">
                                    <HomeIcon size={18} className="mr-2" />
                                    Início
                                </Link>
                            </Button>

                            {data?.user && (
                                <Button variant="outline" className="justify-start" asChild>
                                    <Link href="/bookings">
                                    <CalendarIcon size={18} className="mr-2" />
                                    Agendamentos
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    );
}

export default Header;