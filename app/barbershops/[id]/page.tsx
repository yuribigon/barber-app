import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPin, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { Key } from "react";

interface BarbershopDetailsPageProps {
    params: {
        id?: string;
    }
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {
    if (!params.id) {
        return null;
    }

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include: {
            services: true,
        }
    })

    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />
            <div className="p-5 flex flex-col gap-3">
                {barbershop.services.map((service: { id: Key | null | undefined; }) => (
                    <ServiceItem key={service.id} service={service} />
                ))}
            </div>
        </div>
    )
}

export default BarbershopDetailsPage;