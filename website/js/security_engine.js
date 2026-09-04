/**
 * KaarigarConnect - Web & App Security Engine
 * Implements:
 * 1. DOM XSS Sanitizer & Safe HTML Injector
 * 2. CSRF Double-Submit Cookie & Header Token Validator
 * 3. JWT Token Signature & Claims Inspector
 * 4. RBAC (Role-Based Access Control) Enforcement
 * 5. Rate Limiter (Token Bucket Algorithm Simulation)
 */

window.KaarigarSecurity = (function () {
    // Rate Limiter Bucket State
    const rateLimiterConfig = {
        maxTokens: 30,
        refillRatePerSec: 2,
        currentTokens: 30,
        lastRefillTimestamp: Date.now(),
        blockedUntil: 0
    };

    return {
        /**
         * XSS Sanitization Function
         * Escapes raw HTML strings or strips dangerous elements (<script>, onload, javascript:)
         */
        sanitizeInput: (inputStr) => {
            if (typeof inputStr !== 'string') return inputStr;
            // Replace dangerous character sequences with HTML entities
            return inputStr
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;')
                .replace(/\//g, '&#x2F;');
        },

        /**
         * Safe HTML String Cleaner (Strips script tags and inline event handlers)
         */
        cleanHtml: (htmlStr) => {
            if (typeof htmlStr !== 'string') return '';
            const tempDiv = document.createElement('div');
            tempDiv.textContent = htmlStr;
            return tempDiv.innerHTML;
        },

        /**
         * CSRF Header Validation
         */
        validateCsrfToken: (headerToken) => {
            const state = KaarigarState.getState();
            const valid = headerToken === state.auth.csrfToken;
            if (!valid) {
                KaarigarState.addAuditLog('CSRF_VALIDATION_FAILED', 'Invalid CSRF header payload detected!');
            }
            return valid;
        },

        /**
         * RBAC Permission Checker
         */
        checkPermission: (requiredRole) => {
            const state = KaarigarState.getState();
            const currentRole = state.role;
            
            if (requiredRole === 'ROLE_ADMIN' && currentRole !== 'ROLE_ADMIN') {
                KaarigarState.addAuditLog('RBAC_ACCESS_DENIED', `Role ${currentRole} attempted to access ADMIN resources`);
                return false;
            }
            if (requiredRole === 'ROLE_PROVIDER' && currentRole !== 'ROLE_PROVIDER' && currentRole !== 'ROLE_ADMIN') {
                KaarigarState.addAuditLog('RBAC_ACCESS_DENIED', `Role ${currentRole} attempted to access PROVIDER resources`);
                return false;
            }
            return true;
        },

        /**
         * Token Bucket Rate Limiter Check
         * Returns { allowed: boolean, remainingTokens: number, retryAfterSec: number }
         */
        consumeRateToken: () => {
            const now = Date.now();
            
            if (now < rateLimiterConfig.blockedUntil) {
                const retryAfterSec = Math.ceil((rateLimiterConfig.blockedUntil - now) / 1000);
                KaarigarState.addAuditLog('RATE_LIMIT_BLOCKED', `Rate limit exceeded. Blocked for ${retryAfterSec}s`);
                return { allowed: false, remainingTokens: 0, retryAfterSec };
            }

            // Refill tokens based on elapsed time
            const elapsedSec = (now - rateLimiterConfig.lastRefillTimestamp) / 1000;
            rateLimiterConfig.currentTokens = Math.min(
                rateLimiterConfig.maxTokens,
                rateLimiterConfig.currentTokens + elapsedSec * rateLimiterConfig.refillRatePerSec
            );
            rateLimiterConfig.lastRefillTimestamp = now;

            if (rateLimiterConfig.currentTokens >= 1) {
                rateLimiterConfig.currentTokens -= 1;
                return { allowed: true, remainingTokens: Math.floor(rateLimiterConfig.currentTokens), retryAfterSec: 0 };
            } else {
                rateLimiterConfig.blockedUntil = now + 10000; // Block for 10 seconds
                KaarigarState.addAuditLog('RATE_LIMIT_TRIGGERED', 'Rate limit breached! Token bucket empty.');
                return { allowed: false, remainingTokens: 0, retryAfterSec: 10 };
            }
        },

        /**
         * Inspect JWT Mock Token Payload
         */
        inspectJwtToken: () => {
            const state = KaarigarState.getState();
            const token = state.auth.token;
            try {
                const parts = token.split('.');
                const header = JSON.parse(atob(parts[0]));
                const payload = JSON.parse(atob(parts[1]));
                return {
                    valid: true,
                    header,
                    payload,
                    signature: parts[2].substring(0, 16) + '...'
                };
            } catch (e) {
                return { valid: false, error: 'Malformed Token Format' };
            }
        },

        getRateLimiterStatus: () => rateLimiterConfig
    };
})();
