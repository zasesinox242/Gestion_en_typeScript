import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Equivalente server-side de tu AuthGuard de Angular: exige sesión activa. */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
