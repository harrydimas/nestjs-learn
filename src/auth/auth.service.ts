import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/auth.signin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
        const user = await this.userService.findOne(signInDto.username);
        if (user) {
            const isMatch = await bcrypt.compare(signInDto.password, user.password);
            if (isMatch) {
                const payload = { sub: user.id, username: user.username };
                return {
                    access_token: await this.jwtService.signAsync(payload),
                };
            }
        }
        throw new UnauthorizedException();
    }
}
