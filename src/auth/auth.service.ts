import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string, name: string) {
    // Hash the password using argon2
    const hashedPassword = await argon2.hash(password);

    // Store the user in the database using Prisma
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Simulate email sending by logging the email content
    this.sendWelcomeEmail(user.email, user.name);

    return user;
  }

  private sendWelcomeEmail(email: string, name: string) {
    const emailContent = `
      To: ${email}
      Subject: Welcome to Our Platform!
      Body:
      Hello ${name},
      Welcome to our platform! Your account has been successfully created.
      If you have any questions, feel free to reach out.
      Best Regards,
      The Team
    `;

    console.log(emailContent);
  }
  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
