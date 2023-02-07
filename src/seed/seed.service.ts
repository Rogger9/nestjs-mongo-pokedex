import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import axios, { AxiosInstance } from 'axios'
import { Model } from 'mongoose'
import { Pokemon } from 'src/pokemon/entities/pokemon.entity'
import { PokeResponse } from './interfaces/poke-res.interface'

const LIMIT = 10

@Injectable()
export class SeedService {
  constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>) {}

  private readonly axios: AxiosInstance = axios

  private async getData() {
    const { data } = await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}`)

    const pokemons = data.results.map(({ name, url }) => {
      const no = +url.split('/').at(-2)
      return { name, no }
    })

    return pokemons
  }

  async initData() {
    await this.pokemonModel.deleteMany()

    const data = await this.getData()

    await this.pokemonModel.insertMany(data)

    return `Inserted ${data.length} pokemons in the DB`
  }
}
