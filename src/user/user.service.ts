import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(addUserDto: AddUserDto): Promise<User> {
        const user = new User();
        user.username = addUserDto.username;
        user.password = await this.encryptPassword(addUserDto.password);

        return this.userRepository.save(user);
    }

    async findOne(username: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ username: username })
    }

    async encryptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }
}
