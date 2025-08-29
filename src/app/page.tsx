import Image from "next/image";

export default function Home() {
  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section
        className="relative w-full h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/AI_Construction_Bridge.png')",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Image
            src="/images/HISL_Logo.jpeg"
            alt="HISL Logo"
            width={200}
            height={200}
          />
          <p className="text-white text-xl mt-4">
            Intelligence for Sovereign Offline Leadership
          </p>
        </div>
      </section>

      {/* Sovereign AI Globe Section */}
      <section className="py-16 text-center">
        <Image
          src="/images/globe_3d_with_ravens.png"
          alt="Sovereign AI Globe"
          width={400}
          height={400}
          className="mx-auto"
        />
        <p className="mt-4 text-lg">Global Offline-First AI Control</p>
      </section>

      {/* Mythology Section */}
      <section className="py-16 flex flex-col items-center">
        <div className="flex justify-center gap-8">
          <Image
            src="/images/raven_huginn.png"
            alt="Raven Huginn"
            width={200}
            height={200}
          />
          <Image
            src="/images/raven_muninn.png"
            alt="Raven Muninn"
            width={200}
            height={200}
          />
        </div>
        <p className="mt-4 text-lg">
          Huginn and Muninn: Thought and Memory in Sovereign AI
        </p>
      </section>

      {/* Footer */}
      <footer className="py-8 flex flex-col items-center">
        <Image
          src="/images/IngegAI_Logo.png"
          alt="IntegAI Logo"
          width={150}
          height={150}
        />
        <div className="opacity-50 mt-4">
          <Image
            src="/images/Hard_Hat_digital_paperwork.jpeg"
            alt="Watermark"
            width={100}
            height={100}
          />
        </div>
      </footer>
    </main>
  );
}
