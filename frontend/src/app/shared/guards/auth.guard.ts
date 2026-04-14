import { CanActivateFn, Router } from "@angular/router"; // Route guard types + navigation
import { AuthService } from "../services/auth.service"; // Auth service
import { inject } from "@angular/core"; // Angular dependency injection

export const authGuard: CanActivateFn = () => { // Auth route guard
    const auth = inject(AuthService); // Inject auth service
    const router = inject(Router); // Inject router

    if (auth.isLoggedIn()) return true; // Allow access if logged in

    router.navigate(['/login']); // Redirect to login page
    return false; // Block access
};