import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
const jwtService = new JwtService()
describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard(jwtService)).toBeDefined();
  });
});
