import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { CreatePokemonDto, UpdatePokemonDto } from './dto'
import { PokemonService } from './pokemon.service'

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto)
  }

  @Get('all')
  findAll() {
    return this.pokemonService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.pokemonService.findById(id)
  }

  @Get()
  findOne(@Query() query: UpdatePokemonDto) {
    return this.pokemonService.findOne(query)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(id, updatePokemonDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(id)
  }
}
