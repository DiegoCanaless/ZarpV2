import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    console.log("🌱 Conectado a la BD...")

    // Contraseña común para todos los usuarios de prueba (hasheada)
    const defaultPassword = await bcrypt.hash("password123", 10)

    // ============================================================
    // 1. CATÁLOGOS (upsert = re-ejecutable)
    // ============================================================

    // TypeProperty
    const casaType = await prisma.typeProperty.upsert({
        where: { name: "Casa" }, update: {}, create: { name: "Casa" }
    })
    const deptoType = await prisma.typeProperty.upsert({
        where: { name: "Departamento" }, update: {}, create: { name: "Departamento" }
    })
    const cabanaType = await prisma.typeProperty.upsert({
        where: { name: "Cabaña" }, update: {}, create: { name: "Cabaña" }
    })
    const loftType = await prisma.typeProperty.upsert({
        where: { name: "Loft" }, update: {}, create: { name: "Loft" }
    })

    // TypePerson
    const adultoType = await prisma.typePerson.upsert({
        where: { name: "Adulto" }, update: {}, create: { name: "Adulto" }
    })
    const ninoType = await prisma.typePerson.upsert({
        where: { name: "Niño" }, update: {}, create: { name: "Niño" }
    })
    const bebeType = await prisma.typePerson.upsert({
        where: { name: "Bebé" }, update: {}, create: { name: "Bebé" }
    })

    // Feature
    const wifiFeature = await prisma.feature.upsert({
        where: { name: "WiFi" }, update: {}, create: { name: "WiFi", icon: "wifi" }
    })
    const piletaFeature = await prisma.feature.upsert({
        where: { name: "Pileta" }, update: {}, create: { name: "Pileta", icon: "water" }
    })
    const parrillaFeature = await prisma.feature.upsert({
        where: { name: "Parrilla" }, update: {}, create: { name: "Parrilla", icon: "grill" }
    })
    const estacionamientoFeature = await prisma.feature.upsert({
        where: { name: "Estacionamiento" }, update: {}, create: { name: "Estacionamiento", icon: "parking" }
    })
    const aireFeature = await prisma.feature.upsert({
        where: { name: "Aire acondicionado" }, update: {}, create: { name: "Aire acondicionado", icon: "snowflake" }
    })
    const calefaccionFeature = await prisma.feature.upsert({
        where: { name: "Calefacción" }, update: {}, create: { name: "Calefacción", icon: "flame" }
    })
    const lavarropasFeature = await prisma.feature.upsert({
        where: { name: "Lavarropas" }, update: {}, create: { name: "Lavarropas", icon: "washing-machine" }
    })
    const vistaMarFeature = await prisma.feature.upsert({
        where: { name: "Vista al mar" }, update: {}, create: { name: "Vista al mar", icon: "waves" }
    })

    console.log("  → Catálogos creados")

    // ============================================================
    // 2. USUARIOS (upsert = re-ejecutable)
    // ============================================================

    const admin = await prisma.user.upsert({
        where: { email: "admin@zarp.com" },
        update: { password: defaultPassword },
        create: {
            name_Complete: "Admin Zarp",
            email: "admin@zarp.com",
            role: "ADMIN",
            verification_Email: true,
            password: defaultPassword
        }
    })

    const juan = await prisma.user.upsert({
        where: { email: "juan@zarp.com" },
        update: { password: defaultPassword },
        create: {
            name_Complete: "Juan Pérez",
            email: "juan@zarp.com",
            role: "PROPIETARIO",
            verification_Email: true,
            password: defaultPassword
        }
    })

    const carla = await prisma.user.upsert({
        where: { email: "carla@zarp.com" },
        update: { password: defaultPassword },
        create: {
            name_Complete: "Carla Rodríguez",
            email: "carla@zarp.com",
            role: "PROPIETARIO",
            verification_Email: true,
            password: defaultPassword
        }
    })

    const maria = await prisma.user.upsert({
        where: { email: "maria@zarp.com" },
        update: { password: defaultPassword },
        create: {
            name_Complete: "María García",
            email: "maria@zarp.com",
            role: "CLIENTE",
            verification_Email: true,
            password: defaultPassword
        }
    })

    const pedro = await prisma.user.upsert({
        where: { email: "pedro@zarp.com" },
        update: { password: defaultPassword },
        create: {
            name_Complete: "Pedro López",
            email: "pedro@zarp.com",
            role: "CLIENTE",
            verification_Email: false,
            password: defaultPassword
        }
    })

    console.log("  → Usuarios creados")

    // ============================================================
    // 3. IDENTITY VERIFICATION
    // ============================================================

    // Juan: aprobado
    await prisma.identityVerification.upsert({
        where: { userId: juan.id },
        update: {},
        create: {
            userId: juan.id,
            status: "APPROVED",
            idCard_Front: "https://picsum.photos/seed/dni-juan-front/300/200",
            idCard_Back: "https://picsum.photos/seed/dni-juan-back/300/200"
        }
    })

    // Carla: pendiente
    await prisma.identityVerification.upsert({
        where: { userId: carla.id },
        update: {},
        create: {
            userId: carla.id,
            status: "PENDING",
            idCard_Front: "https://picsum.photos/seed/dni-carla-front/300/200",
            idCard_Back: "https://picsum.photos/seed/dni-carla-back/300/200"
        }
    })

    // María: rechazada
    await prisma.identityVerification.upsert({
        where: { userId: maria.id },
        update: {},
        create: {
            userId: maria.id,
            status: "REJECTED",
            idCard_Front: "https://picsum.photos/seed/dni-maria-front/300/200",
            idCard_Back: "https://picsum.photos/seed/dni-maria-back/300/200",
            review: "La foto del DNI está borrosa, subí una más clara"
        }
    })

    console.log("  → Identity verifications creadas")

    // ============================================================
    // 4. PROPIEDADES + PROPERTY VERIFICATION (nested create)
    // ============================================================

    const casaPlaya = await prisma.property.create({
        data: {
            name_Property: "Casa en la playa",
            description: "Hermosa casa con acceso directo a la playa. Ideal para familias que buscan relajarse con vista al mar.",
            price: 150,
            location: "Mar del Plata",
            address: "Av. Constitución 1200",
            ownerId: juan.id,
            typePropertyId: casaType.id,
            property_verification: {
                create: { status: "PENDING" }
            }
        }
    })

    const cabanaMontana = await prisma.property.create({
        data: {
            name_Property: "Cabaña de montaña",
            description: "Cabaña rústica rodeada de bosques, con chimenea y vista a los lagos. Perfecta para desconectarse.",
            price: 120,
            location: "Bariloche",
            address: "Ruta 40 km 25",
            ownerId: juan.id,
            typePropertyId: cabanaType.id,
            property_verification: {
                create: { status: "APPROVED", comment: "Verificada correctamente" }
            }
        }
    })

    const loftCentro = await prisma.property.create({
        data: {
            name_Property: "Loft céntrico",
            description: "Loft moderno en el corazón de Buenos Aires. A pasos del subte y de los mejores restaurantes.",
            price: 90,
            location: "Buenos Aires",
            address: "Av. Corrientes 350",
            ownerId: carla.id,
            typePropertyId: loftType.id,
            property_verification: {
                create: { status: "APPROVED" }
            }
        }
    })

    const deptoVista = await prisma.property.create({
        data: {
            name_Property: "Depto con vista",
            description: "Departamento de lujo con vista panorámica al Río de la Plata. Amplio y luminoso.",
            price: 200,
            location: "Puerto Madero",
            address: "Av. Alicia Moreau de Justo 2050",
            ownerId: carla.id,
            typePropertyId: deptoType.id,
            property_verification: {
                create: { status: "PENDING" }
            }
        }
    })

    console.log("  → Propiedades creadas")

    // ============================================================
    // 5. FOTOS (createMany — eficiente para inserts masivos)
    // ============================================================

    await prisma.photos.createMany({
        data: [
            // Casa playa (3 fotos)
            { propertyId: casaPlaya.id, url: "https://picsum.photos/seed/playa1/800/600", order: 1 },
            { propertyId: casaPlaya.id, url: "https://picsum.photos/seed/playa2/800/600", order: 2 },
            { propertyId: casaPlaya.id, url: "https://picsum.photos/seed/playa3/800/600", order: 3 },
            // Cabaña (2 fotos)
            { propertyId: cabanaMontana.id, url: "https://picsum.photos/seed/cabana1/800/600", order: 1 },
            { propertyId: cabanaMontana.id, url: "https://picsum.photos/seed/cabana2/800/600", order: 2 },
            // Loft (2 fotos)
            { propertyId: loftCentro.id, url: "https://picsum.photos/seed/loft1/800/600", order: 1 },
            { propertyId: loftCentro.id, url: "https://picsum.photos/seed/loft2/800/600", order: 2 },
            // Depto (1 foto)
            { propertyId: deptoVista.id, url: "https://picsum.photos/seed/depto1/800/600", order: 1 },
        ]
    })

    console.log("  → Fotos creadas")

    // ============================================================
    // 6. CAPACIDADES (N:N con quantity)
    // ============================================================

    await prisma.propertyCapacity.createMany({
        data: [
            // Casa playa: 2 adultos, 1 niño, 1 bebé
            { propertyId: casaPlaya.id, type_personId: adultoType.id, quantity: 2 },
            { propertyId: casaPlaya.id, type_personId: ninoType.id, quantity: 1 },
            { propertyId: casaPlaya.id, type_personId: bebeType.id, quantity: 1 },
            // Cabaña: 2 adultos, 2 niños
            { propertyId: cabanaMontana.id, type_personId: adultoType.id, quantity: 2 },
            { propertyId: cabanaMontana.id, type_personId: ninoType.id, quantity: 2 },
            // Loft: 2 adultos
            { propertyId: loftCentro.id, type_personId: adultoType.id, quantity: 2 },
            // Depto: 2 adultos, 1 niño
            { propertyId: deptoVista.id, type_personId: adultoType.id, quantity: 2 },
            { propertyId: deptoVista.id, type_personId: ninoType.id, quantity: 1 },
        ]
    })

    console.log("  → Capacidades creadas")

    // ============================================================
    // 7. FEATURES (N:N)
    // ============================================================

    await prisma.featureProperty.createMany({
        data: [
            // Casa playa: WiFi, Pileta, Parrilla, Estacionamiento, Vista al mar
            { propertyId: casaPlaya.id, featureId: wifiFeature.id },
            { propertyId: casaPlaya.id, featureId: piletaFeature.id },
            { propertyId: casaPlaya.id, featureId: parrillaFeature.id },
            { propertyId: casaPlaya.id, featureId: estacionamientoFeature.id },
            { propertyId: casaPlaya.id, featureId: vistaMarFeature.id },
            // Cabaña: WiFi, Parrilla, Calefacción
            { propertyId: cabanaMontana.id, featureId: wifiFeature.id },
            { propertyId: cabanaMontana.id, featureId: parrillaFeature.id },
            { propertyId: cabanaMontana.id, featureId: calefaccionFeature.id },
            // Loft: WiFi, Aire acondicionado, Lavarropas
            { propertyId: loftCentro.id, featureId: wifiFeature.id },
            { propertyId: loftCentro.id, featureId: aireFeature.id },
            { propertyId: loftCentro.id, featureId: lavarropasFeature.id },
            // Depto: WiFi, Aire acondicionado, Vista al mar, Lavarropas
            { propertyId: deptoVista.id, featureId: wifiFeature.id },
            { propertyId: deptoVista.id, featureId: aireFeature.id },
            { propertyId: deptoVista.id, featureId: vistaMarFeature.id },
            { propertyId: deptoVista.id, featureId: lavarropasFeature.id },
        ]
    })

    console.log("  → Features asignadas")

    // ============================================================
    // 8. REVIEWS
    // ============================================================

    await prisma.review.create({
        data: {
            userId: maria.id,
            propertyId: casaPlaya.id,
            comment: "Hermosa casa, volvimos a la playa todos los días. ¡Muy recomendable!",
            stars: 5
        }
    })

    await prisma.review.create({
        data: {
            userId: pedro.id,
            propertyId: loftCentro.id,
            comment: "Muy bien ubicado, el check-in fue súper fácil y el departamento es tal cual las fotos.",
            stars: 4
        }
    })

    console.log("  → Reviews creadas")

    // ============================================================
    // 9. BOOKINGS + PAYMENTS (nested create)
    // ============================================================

    // María reserva Casa en la playa (3 noches) — CONFIRMED + Payment COMPLETED
    await prisma.booking.create({
        data: {
            tenantId: maria.id,
            ownerId: juan.id,
            propertyId: casaPlaya.id,
            start_Date: new Date("2026-08-20"),
            end_Date: new Date("2026-08-23"),
            status: "CONFIRMED",
            totalPrice: 450,
            payment: {
                create: {
                    amount: 450,
                    stripePaymentId: "pi_mock_0001",
                    status: "COMPLETED"
                }
            }
        }
    })

    // Pedro reserva Loft (4 noches) — COMPLETED + Payment COMPLETED
    await prisma.booking.create({
        data: {
            tenantId: pedro.id,
            ownerId: carla.id,
            propertyId: loftCentro.id,
            start_Date: new Date("2026-07-01"),
            end_Date: new Date("2026-07-05"),
            status: "COMPLETED",
            totalPrice: 360,
            payment: {
                create: {
                    amount: 360,
                    stripePaymentId: "pi_mock_0002",
                    status: "COMPLETED"
                }
            }
        }
    })

    // María reserva Casa de vuelta (2 noches) — CHECKED_IN + Payment PENDING
    await prisma.booking.create({
        data: {
            tenantId: maria.id,
            ownerId: juan.id,
            propertyId: casaPlaya.id,
            start_Date: new Date("2026-08-25"),
            end_Date: new Date("2026-08-27"),
            status: "CHECKED_IN",
            totalPrice: 300,
            payment: {
                create: {
                    amount: 300,
                    stripePaymentId: "pi_mock_0003",
                    status: "PENDING"
                }
            }
        }
    })

    console.log("  → Bookings + Payments creados")
    console.log("✅ Seed completado — todas las tablas tienen datos")
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
