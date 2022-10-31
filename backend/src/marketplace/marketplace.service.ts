import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateMarketplaceDto } from './dto/create-marketplace.dto'
import { UpdateMarketplaceDto } from './dto/update-marketplace.dto'

@Injectable()
export class MarketplaceService {
  constructor(private prisma: PrismaService) {}

  async create(createMarketplaceDto: CreateMarketplaceDto) {
    console.log({
      createMarketplaceDto,
    })

    const slug = createMarketplaceDto.slug
      ? createMarketplaceDto.slug
      : createMarketplaceDto.name

    const data: any = {
      name: createMarketplaceDto.name,
      slug: slug,
    }

    // check existence
    const addresses = createMarketplaceDto.contractAddresses
    if (addresses && addresses.length > 0) {
      let i = 0
      const create = await Promise.all(
        Array(addresses.length)
          .fill(null)
          .map(async () => {
            try {
              // Check for existence
              const upsertContract = await this.prisma.contract.upsert({
                where: {
                  address: addresses[i],
                },
                update: {},
                create: {
                  address: addresses[i++], // increment
                },
              })

              console.log({
                upsertContract,
              })

              return {
                assignedBy: 'admin',
                assignedAt: new Date(),
                contract: {
                  connect: {
                    id: upsertContract.id,
                  },
                },
              }
            } catch (error) {
              throw error
            }
          }),
      )
      data.contracts = {
        create,
      }
    }

    const createMarketplace = await this.prisma.marketplace.create({
      data,
    })

    return createMarketplace
  }

  findAll() {
    return `This action returns all marketplace`
  }

  async findOne(id: number) {
    const marketplace = await this.prisma.marketplace.findUnique({
      where: {
        id,
      },
      include: {
        contracts: {
          include: {
            contract: true,
          },
        },
      },
    })
    return marketplace
  }

  update(id: number, updateMarketplaceDto: UpdateMarketplaceDto) {
    return `This action updates a #${id} marketplace`
  }

  remove(id: number) {
    return `This action removes a #${id} marketplace`
  }
}
