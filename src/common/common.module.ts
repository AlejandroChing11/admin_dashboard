import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { UserModule } from 'src/user/usuario.module';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [UserModule]
})
export class CommonModule { }
