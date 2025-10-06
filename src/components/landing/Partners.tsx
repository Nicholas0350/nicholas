import { partners } from '@/data/partners'
import Image from 'next/image'
import { WobbleCard } from '@/components/ui/wobble-card'

export default function Partners() {
  return (
    <section id="services" className="py-16 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Trusted Partners</h2>
          <p className="text-sm text-[--color-muted-foreground]">
            Compliance teams and organizations we work with
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
          {/* Financial Advisers Register - Large feature card */}
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-gradient-to-br from-pink-800 to-pink-600 min-h-[500px] lg:min-h-[300px]"
            className=""
          >
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Australia&apos;s most comprehensive financial adviser database
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                Access real-time data on 84,000+ ASIC-regulated entities and financial advisers across Australia.
              </p>
            </div>
            <Image
              src={partners[0].logo}
              width={500}
              height={500}
              alt={partners[0].name}
              className="absolute -right-4 lg:-right-[20%] filter grayscale -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>

          {/* ChatGPT AU - Medium card */}
          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gradient-to-br from-purple-800 to-purple-600">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              AI-powered compliance intelligence
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Leveraging ChatGPT for regulatory insights and automated compliance monitoring.
            </p>
          </WobbleCard>

          {/* AgentBox - Small card */}
          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gradient-to-br from-blue-900 to-blue-700">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Real estate compliance solutions
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Streamlined compliance for property and real estate professionals.
            </p>
          </WobbleCard>

          {/* FinPunter + Loving Home - Large bottom card */}
          <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-gradient-to-br from-indigo-900 to-indigo-700 min-h-[500px] lg:min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Financial insights and home care compliance
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                Comprehensive compliance solutions for financial services and aged care providers across Australia.
              </p>
            </div>
            <Image
              src={partners[3].logo}
              width={500}
              height={500}
              alt={partners[3].name}
              className="absolute -right-10 md:-right-[20%] lg:-right-[10%] filter grayscale -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
        </div>
      </div>
    </section>
  );
}
