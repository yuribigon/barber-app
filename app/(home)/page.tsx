import Header from "../_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import BarberShopItem from "./_components/barbershop-item";
import { db } from "../_lib/prisma";
import { Key } from "react";

export default async function Home() {
  
  const barbershops = await db.barbershop.findMany();

  return (
    <div>
      <Header />

      <div className="px-5 pt-5 ">
        <h2 className="text-xl font-bold">Olá, Yuri!</h2>
        <p className="text-sm">
          {format(new Date(), "EEEE',' d 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-5">
        <Search />
      </div>

      <div className="px-5 mt-6">
          <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">Agendamentos</h2>
        <BookingItem />
      </div>

      <div className="mt-6">
          <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>

          <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop: { id: Key | null | undefined; }) => (
              <BarberShopItem key={barbershop.id} barbershop={barbershop}/>
            ))}
          </div>
      </div>
    </div>
  );
}
