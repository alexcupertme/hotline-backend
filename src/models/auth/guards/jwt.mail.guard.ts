import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtMailGuard extends AuthGuard('jwt-mail') {}
