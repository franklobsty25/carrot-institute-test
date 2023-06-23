import {
  Controller,
  HttpStatus,
  Res,
  Get,
  UseGuards,
  Body,
  Put,
  Delete,
  Post,
  Query,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDTO, FilterTableDTO, UpdateTableDTO } from './dto';
import { ResponseService } from 'src/common/helpers/response.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  GetTableFromParam,
  TableAccessGuard,
  TableParamGuard,
} from './decorator/table-param-decorator';
import { TableDocument } from './schema/table.schema';
import { RoleGuard } from '../auth/guards/role.guard';
import { CurrentUser } from '../user/decoretors/current-user.decorator';
import { UserDocument } from '../user/schema/user.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Table')
@ApiBearerAuth('defaultBearerAuth')
@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('list')
  async fetch(
    @Res() res: Response,
    @Query() payload: FilterTableDTO,
  ): Promise<void> {
    try {
      const { docs, ...metadata } = await this.tableService.fetchTables(
        payload,
      );

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Tables fetched successfully',
        docs,
        metadata,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @TableParamGuard()
  @Get(':tableId')
  async getTable(
    @Res() res: Response,
    @GetTableFromParam() table: TableDocument,
  ): Promise<void> {
    try {
      ResponseService.json(
        res,
        HttpStatus.OK,
        'Table found successfully',
        table,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  async create(
    @Res() res: Response,
    @CurrentUser() user: UserDocument,
    @Body() createTableDTO: CreateTableDTO,
  ): Promise<void> {
    try {
      const tableDocument = await this.tableService.createTable(
        user,
        createTableDTO,
      );
      ResponseService.json(
        res,
        HttpStatus.OK,
        'Table created successfully',
        tableDocument,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @TableAccessGuard()
  @Put(':tableId/edit')
  async update(
    @Res() res: Response,
    @GetTableFromParam() table: TableDocument,
    @Body() updateTableDTO: UpdateTableDTO,
  ): Promise<void> {
    try {
      const updatedTable = await this.tableService.updateTable(
        table._id,
        updateTableDTO,
      );

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Table information updated successfully',
        updatedTable,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @TableAccessGuard()
  @Delete(':tableId/delete')
  async delete(
    @Res() res: Response,
    @GetTableFromParam() table: TableDocument,
  ): Promise<void> {
    try {
      const deleteTable = await this.tableService.softDeleteTable(table._id);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Table information deleted successfully',
        deleteTable,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }
}
