import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { App } from './entities/app.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Apps')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Crud({
  model: {
    type: App,
  },
  dto: {
    create: CreateAppDto,
    update: UpdateAppDto,
    replace: UpdateAppDto,
  },
})
@Controller('apps')
export class AppsController implements CrudController<App> {
  constructor(public service: AppsService) {}
}
