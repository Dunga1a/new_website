import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
