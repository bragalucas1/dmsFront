export const authService = {
    getCurrentUserId: () => {
      return 1; 
    },
  
    isCurrentUser: (userId: number) => {
      return userId === authService.getCurrentUserId();
    }
  };