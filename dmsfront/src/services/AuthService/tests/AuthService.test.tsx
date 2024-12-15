import { authService } from '../AuthService';

describe('AuthService', () => {
  describe('getCurrentUserId', () => {
    it('should return the current user id', () => {
      const userId = authService.getCurrentUserId();
      expect(userId).toBe(1);
    });
  });

  describe('isCurrentUser', () => {
    it('should return true if the given userId is the current user', () => {
      const result = authService.isCurrentUser(1);
      expect(result).toBe(true);
    });

    it('should return false if the given userId is not the current user', () => {
      const result = authService.isCurrentUser(2);
      expect(result).toBe(false);
    });
  });
});