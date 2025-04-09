import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { ResgisterDto } from './dto/resgister.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ){}

  async register(dto:ResgisterDto){
    const userExists = await this.usersService.findOneByEmail(dto.email)
    if (userExists) throw new ConflictException("Email já cadastrado")

    const hashedPassword = await bcrypt.hash(dto.password, 10)
    const user = await this.usersService.create({...dto, password: hashedPassword})
    return this.generateTokens(user.id, user.email)
  }
  async login(dto: LoginDto){
    const user = await this.usersService.findOneByEmail(dto.email, user.password)
    if(!passwordMatch) throw new UnauthorizedException('Password inválida')
    return this.generateTokens(user.id, user.email)
  }

  private generateTokens(userId: string, email:string){
    const payloda = {sub: userId, email}

    const acessToken = this.jwtService.sign(payloda, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRATION,
    })
    return {acessToken}
  }



}
