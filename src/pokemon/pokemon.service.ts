import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { isValidObjectId, Model } from 'mongoose'
import { CreatePokemonDto } from './dto/create-pokemon.dto'
import { UpdatePokemonDto } from './dto/update-pokemon.dto'
import { Pokemon } from './entities/pokemon.entity'

@Injectable()
export class PokemonService {
  constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()

    try {
      return await this.pokemonModel.create(createPokemonDto)
    } catch (error) {
      if (error.code === 11000) throw new BadRequestException(`pokemon exists in db ${JSON.stringify(error.keyValue)}`)
      throw new InternalServerErrorException("Can't create pokemon")
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

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`
  }
}
