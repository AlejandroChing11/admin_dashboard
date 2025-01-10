import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe } from '@nestjs/common';
import { CommonService } from './common.service';
import { Auth, GetUser } from 'src/user/decorators';
import { validRoles } from 'src/user/interfaces';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService
  ) { }

  @Get('registros')
  @Auth(validRoles.admin)
  findAll() {
    return this.commonService.findAllUsers();
  }

  @Patch(':id/editar-preferencias')
  @Auth(validRoles.admin)
  editPreferences(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePreferencesDto: UpdatePreferencesDto
  ) {
    return this.commonService.editPreferences(id, updatePreferencesDto);
  }



}
