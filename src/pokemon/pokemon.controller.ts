import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { PaginationDto } from 'src/common/dto/pagination.dto'
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe'
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
  findAll(@Query() query: PaginationDto) {
    return this.pokemonService.findAll(query)
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
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id)
  }
}
