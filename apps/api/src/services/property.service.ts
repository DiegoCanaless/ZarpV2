import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PropertyService {
  async create(data: { name: string; description: string; ownerId: string }) {
    return prisma.property.create({
      data: {
        name_Property: data.name,
        description: data.description,
        ownerId: data.ownerId,
        property_verification: {
          create: {}  // Status en PENDING por defecto
        }
      },
      include: {
        property_verification: true
      }
    });
  }
}
