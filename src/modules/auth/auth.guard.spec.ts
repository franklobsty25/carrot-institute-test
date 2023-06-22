import { AuthGuard } from '../user/guards/user-put-to-request.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
