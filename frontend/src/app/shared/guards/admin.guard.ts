import { inject, Inject } from "@angular/core"; // Angular DI utilities
import { CanActivateFn, Router } from "@angular/router"; // Route guard types + navigation
import { AuthService } from "../services/auth.service"; // Auth service

export const adminGuard: CanActivateFn = () => { // Admin route guard
    const auth = inject(AuthService); // Inject auth service
    const router = inject(Router); // Inject router

    const user = auth.getCurrentUser(); // Get current user
    if (user?.role === 'admin') return true; // Allow only admins

    router.navigate(['/']); // Redirect non-admin users
    return false; // Block access
};