import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { CommonModule } from './common/common.module'
import { envConfig } from './config/env.config'
import { joiValidationSchema } from './config/joi.validation'
import { PokemonModule } from './pokemon/pokemon.module'
import { SeedModule } from './seed/seed.module'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [envConfig], envFilePath: '.env.local', validationSchema: joiValidationSchema }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    MongooseModule.forRoot(process.env.DB_URI),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
