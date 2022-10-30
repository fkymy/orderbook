import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { DemoService } from './demo.service'
import { CreateDemoDto } from './dto/create-demo.dto'
import { UpdateDemoDto } from './dto/update-demo.dto'

@Controller('demo')
@ApiTags('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Post()
  @ApiCreatedResponse()
  create(@Body() createDemoDto: CreateDemoDto) {
    return this.demoService.create(createDemoDto)
  }

  @Get()
  @ApiOkResponse()
  findAll() {
    return this.demoService.findAll()
  }

  @Get(':id')
  @ApiOkResponse()
  findOne(@Param('id') id: string) {
    return this.demoService.findOne(+id)
  }

  @Patch(':id')
  @ApiOkResponse()
  update(@Param('id') id: string, @Body() updateDemoDto: UpdateDemoDto) {
    return this.demoService.update(+id, updateDemoDto)
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.demoService.remove(+id)
  }
}
