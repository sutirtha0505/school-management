"use client"
interface Props {
  children: React.ReactNode
  name?: string
  route: string
}
import { useRouter } from "next/navigation"

const NavigationLink = ({ children, name, route }: Props) => {
  const router = useRouter();
  return (
    <div
      className="flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100"
      onClick={() => {
        router.push(route);
      }}
    >
      {children}
      <p className="text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide">
        {name}
      </p>
    </div>
  )
}

export default NavigationLink