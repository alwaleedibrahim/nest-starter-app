import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<string> {
    const user: User = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isCorrect: boolean = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isCorrect) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload: any = {
      email: user.email,
      role: 'user',
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return token;
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = await this.userModel.create(createUserDto);
    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userModel.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user: User = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async remove(id: string): Promise<User> {
    const user: User = await this.userModel.findByIdAndDelete(id);
    return user;
  }
}
