import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, isValidObjectId, Model } from 'mongoose'
import { CreatePokemonDto, UpdatePokemonDto } from './dto'
import { Pokemon } from './entities/pokemon.entity'

@Injectable()
export class PokemonService {
  constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()

    try {
      return await this.pokemonModel.create(createPokemonDto)
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findAll() {
    return await this.pokemonModel.find()
  }

  async findById(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id')

    const pokemon = await this.pokemonModel.findById(id)

    if (!pokemon) throw new NotFoundException('pokemon not found')

    return pokemon
  }

  async findOne({ name, no }: UpdatePokemonDto) {
    const filter: FilterQuery<Pokemon> = {}
    if (name) filter.name = name
    if (no) filter.no = no

    const pokemon = await this.pokemonModel.findOne(filter)

    if (!pokemon) throw new NotFoundException('pokemon not found')

    return pokemon
  }

  async update(_id: string, updatePokemonDto: UpdatePokemonDto) {
    await this.findById(_id)

    if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase()

    try {
      return await this.pokemonModel.findByIdAndUpdate(_id, updatePokemonDto, { new: true })
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(id: string) {
    const pokemon = await this.findById(id)
    pokemon.deleteOne()

    return { message: 'pokemon deleted' }
  }

  private handleExceptions(err: any) {
    if (err.code === 11000) throw new BadRequestException(`pokemon exists in db ${JSON.stringify(err.keyValue)}`)
    throw new InternalServerErrorException()
  }
}
