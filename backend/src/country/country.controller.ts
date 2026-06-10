import { Controller, Get, UseGuards } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from './entities/country.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getAllCountries(): Promise<Country[]> {
    return this.countryService.getAllCountries();
  }
}
