import { partners } from '@/data/partners'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="transition-all duration-200 hover:shadow-md hover:scale-105 h-full">
                <CardContent className="p-4 flex flex-col items-center justify-center gap-3 h-full min-h-[120px]">
                  <div className="relative w-full h-12 flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={48}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                  <p className="text-xs text-center text-[--color-muted-foreground] group-hover:text-[--color-foreground] transition-colors">
                    {partner.name}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
