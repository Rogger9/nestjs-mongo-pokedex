import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommonModule } from 'src/common/common.module'
import { PokemonModule } from 'src/pokemon/pokemon.module'
import { SeedController } from './seed.controller'
import { SeedService } from './seed.service'

@Module({
  imports: [ConfigModule, PokemonModule, CommonModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
