import { Body, Controller, Get, Post, Res, Logger, HttpStatus, UseInterceptors,Param } from '@nestjs/common'
import { CreateNestAppDto } from '../DTO/nestApp.dto';
import { NestAppService } from '../Services/nestapp.service';
import { jwtValidateInterceptor } from 'src/Interceptors/auth.interceptor';
import { ApiBody, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateNestDto } from 'src/DTO/updateNest.dto';
import { FastifyReply } from 'fastify';

@ApiTags('NestApp')
@ApiBearerAuth()
@Controller()
@UseInterceptors(jwtValidateInterceptor)
export class NestAppController {
    constructor(private readonly nestAppService: NestAppService) { }

    @Post('/saveNest')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiBody({ type: CreateNestAppDto })
    async createNestApp(@Res() res:FastifyReply , @Body() createNestAppDto: CreateNestAppDto) {
        try {
            const newNestApp = await this.nestAppService.createNestApp(createNestAppDto);
            return res.status(HttpStatus.OK).send(newNestApp);
        } catch (err) {
            Logger.warn(err);
            return res.status(err.status).send(err.response);
        }
    }

    @Get('/getAll')
    @ApiResponse({ status: 200, description: 'The records has been retrieved successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getAllNest(@Res() res: FastifyReply) {
        try {
            const data = await this.nestAppService.getNestApp();
            return res.status(HttpStatus.OK).send(data);
        } catch (err) {
            Logger.warn(err);
            return res.status(err.status).send(err.response);
        }
    }

    @Post('/update/:id')
    async updateNest(@Res() response:FastifyReply,@Param('id') id:string ,@Body() updateNestDto:UpdateNestDto) {
        try {
            let result = await this.nestAppService.updateNestApp(id,updateNestDto);
            return response.status(HttpStatus.OK).send(result)
        } catch(err) {
            return response.status(err.status).send(err.response);
        }
    }
}