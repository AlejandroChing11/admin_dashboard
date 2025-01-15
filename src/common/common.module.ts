import { Module } from '@nestjs/common';

import { UserModule } from 'src/user/usuario.module';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [UserModule]
})
export class CommonModule { }
