import Button from "../ui/Button"


const Cta = () => {
    return (
        <>
            <section className="px-4 py-16">
                <div className="mx-auto max-w-6xl bg-primary text-surface gap-6 p-6 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="flex flex-col items-start">
                        <h3 className="text-2xl font-bold mb-2">¿Tenés una propiedad?</h3>
                        <span className="md:hidden text-text-muted">Publicá gratis y recibí reservas de todo el país.</span>
                        <span className="hidden sm:inline text-text-muted max-w-4/6">Publicá tu espacio gratis y empezá a recibir reservas de todo el país. 
Nosotros nos encargamos de la verificación y los pagos.</span>
                    </div>
                    <div>
                        <Button variant="primary" href="/auth/login" children="Publicar mi propiedad" />
                    </div>

                </div>
            </section>

        </>
    )
}

export default Cta