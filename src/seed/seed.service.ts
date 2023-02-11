import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AxiosAdapter } from 'src/common/adapters/axios.adapter'
import { Pokemon } from 'src/pokemon/entities/pokemon.entity'
import { PokeResponse } from './interfaces/poke-res.interface'

@Injectable()
export class SeedService {
  private dataURL: string

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
  ) {
    this.dataURL = this.configService.get<string>('dataURL')
  }

  private async getData() {
    const data = await this.http.get<PokeResponse>(this.dataURL)

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
