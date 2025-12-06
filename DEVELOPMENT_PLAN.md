# 🗺️ RokTenh Map Service - Development Plan & Timeline

> **Project**: Map Service API Platform  
> **Duration**: 4 Weeks  
> **Focus**: Code Review, Issue Fixing & Backend API Integration

---

## 📊 Project Structure Overview

The project consists of **3 main application types**:

1. **LANDING** - Public-facing landing page for visitors
2. **PORTAL** - Authenticated user dashboard (Regular Users)
3. **SUPERADMIN** - Admin management interface (Admin Users)

---

## 🎯 4-WEEK DEVELOPMENT TIMELINE

---

# **WEEK 1 — UI Review & Fixing**

### **Phase 1.1: Landing Page Review**

**Feature**: Public Landing Interface

#### Tasks:

- **Task 1.1.1**: Review Landing Page Components

  - Sub-task: Audit `LandingPage.tsx` structure (1668 lines)
  - Sub-task: Check hero section responsiveness
  - Sub-task: Verify pricing calculator functionality
  - Sub-task: Test feature showcase animations
  - Sub-task: Validate CTA buttons and navigation

- **Task 1.1.2**: Fix UI/UX Issues

  - Sub-task: Fix Tailwind CSS class optimization (remove `border-[transparent]`, use `border-transparent`)
  - Sub-task: Optimize mobile menu toggle behavior
  - Sub-task: Fix overflow issues on small screens
  - Sub-task: Ensure proper font loading (EN/KM languages)
  - Sub-task: Fix sticky header z-index conflicts

- **Task 1.1.3**: Improve Performance
  - Sub-task: Lazy load hero images
  - Sub-task: Optimize animation performance
  - Sub-task: Reduce bundle size of landing components
  - Sub-task: Add loading skeletons for dynamic content

---

### **Phase 1.2: Portal (User Dashboard) Review**

**Feature**: Authenticated User Interface

#### Tasks:

- **Task 1.2.1**: Review Dashboard Components

  - Sub-task: Audit `AdminDashboard.tsx` (549 lines)
  - Sub-task: Check stat cards display and animations
  - Sub-task: Verify chart rendering (Recharts)
  - Sub-task: Test date filter functionality
  - Sub-task: Validate responsive layout on mobile/tablet

- **Task 1.2.2**: Review API Key Manager

  - Sub-task: Audit `APIKeyManager.tsx`
  - Sub-task: Test key creation flow
  - Sub-task: Verify copy-to-clipboard functionality
  - Sub-task: Check delete confirmation dialogs
  - Sub-task: Test pagination controls

- **Task 1.2.3**: Review Wallet Management

  - Sub-task: Audit `WalletManagement.tsx`
  - Sub-task: Check balance display accuracy
  - Sub-task: Test top-up dialog flow
  - Sub-task: Verify transaction history pagination
  - Sub-task: Test invoice generation (PDF)
  - Sub-task: Check date range filtering

- **Task 1.2.4**: Review Request Logs

  - Sub-task: Audit `RequestLogs.tsx`
  - Sub-task: Test filtering by status/endpoint/method
  - Sub-task: Verify search functionality
  - Sub-task: Check CSV export feature
  - Sub-task: Test virtual scrolling performance

- **Task 1.2.5**: Fix Portal UI Issues
  - Sub-task: Fix sidebar collapse animation
  - Sub-task: Resolve mobile menu overlap issues
  - Sub-task: Fix dropdown menu positioning
  - Sub-task: Ensure consistent spacing/padding
  - Sub-task: Fix notification panel scroll behavior

---

### **Phase 1.3: SuperAdmin Interface Review**

**Feature**: Admin Management Dashboard

#### Tasks:

- **Task 1.3.1**: Review User Management

  - Sub-task: Audit `UserManagement.tsx` (1011 lines)
  - Sub-task: Test user search and filtering
  - Sub-task: Verify balance adjustment functionality
  - Sub-task: Check suspend/activate user actions
  - Sub-task: Test CSV export for user data
  - Sub-task: Validate pagination and sorting

- **Task 1.3.2**: Review Pricing Management

  - Sub-task: Audit `PricingManagement.tsx`
  - Sub-task: Test pricing tier CRUD operations
  - Sub-task: Verify plan cost management
  - Sub-task: Check service endpoint pricing
  - Sub-task: Test bulk pricing updates

- **Task 1.3.3**: Fix SuperAdmin UI Issues
  - Sub-task: Fix table responsiveness on mobile
  - Sub-task: Resolve modal z-index conflicts
  - Sub-task: Fix form validation error displays
  - Sub-task: Ensure consistent admin action buttons
  - Sub-task: Fix data table sorting indicators

---

### **Phase 1.4: Cross-Cutting UI Fixes**

**Feature**: Global UI/UX Improvements

#### Tasks:

- **Task 1.4.1**: Fix Package.json Issues

  - Sub-task: Fix package name format (remove spaces: `"Map Service Final"` → `"map-service-final"`)
  - Sub-task: Verify all dependencies are properly installed
  - Sub-task: Check for peer dependency warnings

- **Task 1.4.2**: Fix Tailwind CSS Issues

  - Sub-task: Replace all `border-[transparent]` with `border-transparent` (172 errors in imports)
  - Sub-task: Optimize redundant utility classes
  - Sub-task: Fix custom color variable references

- **Task 1.4.3**: Component Cleanup

  - Sub-task: Remove unused import files in `src/imports/`
  - Sub-task: Clean up duplicate emoji-prefixed files (`🟢*.tsx`)
  - Sub-task: Consolidate similar SVG files
  - Sub-task: Remove dead code and commented sections

- **Task 1.4.4**: Accessibility Review
  - Sub-task: Add ARIA labels to interactive elements
  - Sub-task: Ensure keyboard navigation works
  - Sub-task: Test screen reader compatibility
  - Sub-task: Fix color contrast issues

---

# **WEEK 2 — Frontend Logic**

### **Phase 2.1: Authentication & Authorization**

**Feature**: User Authentication System

#### Tasks:

- **Task 2.1.1**: Review Auth Logic

  - Sub-task: Audit `AuthContext.tsx`
  - Sub-task: Review login/signup flows
  - Sub-task: Check session persistence
  - Sub-task: Verify role-based access (admin vs user)
  - Sub-task: Test logout and redirect logic

- **Task 2.1.2**: Implement Role-Based UI

  - Sub-task: Hide admin features from regular users
  - Sub-task: Show appropriate menu items based on role
  - Sub-task: Implement permission guards for routes
  - Sub-task: Add role-based component rendering

- **Task 2.1.3**: Fix Auth Issues
  - Sub-task: Fix duplicate email validation
  - Sub-task: Improve password strength validation
  - Sub-task: Add "Remember Me" functionality
  - Sub-task: Implement session timeout handling

---

### **Phase 2.2: State Management**

**Feature**: Data Flow & State Handling

#### Tasks:

- **Task 2.2.1**: Review App State Management

  - Sub-task: Audit `App.tsx` state structure (1270 lines)
  - Sub-task: Identify prop drilling issues
  - Sub-task: Check for unnecessary re-renders
  - Sub-task: Review useState vs useMemo usage

- **Task 2.2.2**: Optimize State Updates

  - Sub-task: Implement proper state batching
  - Sub-task: Use useCallback for event handlers
  - Sub-task: Add loading states for async operations
  - Sub-task: Implement optimistic UI updates

- **Task 2.2.3**: Local Storage Management
  - Sub-task: Centralize localStorage operations
  - Sub-task: Add error handling for storage quota
  - Sub-task: Implement data migration for version updates
  - Sub-task: Add storage cleanup on logout

---

### **Phase 2.3: Business Logic Implementation**

**Feature**: Core Application Logic

#### Tasks:

- **Task 2.3.1**: Wallet & Transaction Logic

  - Sub-task: Implement top-up validation logic
  - Sub-task: Add balance deduction on API usage
  - Sub-task: Implement transaction history filtering
  - Sub-task: Add balance alert thresholds
  - Sub-task: Implement refund logic

- **Task 2.3.2**: API Key Management Logic

  - Sub-task: Implement key generation algorithm
  - Sub-task: Add key rotation functionality
  - Sub-task: Implement usage quota enforcement
  - Sub-task: Add key expiration logic
  - Sub-task: Implement rate limiting rules

- **Task 2.3.3**: Pricing & Billing Logic
  - Sub-task: Implement cost calculation per request
  - Sub-task: Add volume discount calculations
  - Sub-task: Implement monthly usage aggregation
  - Sub-task: Add billing cycle management
  - Sub-task: Implement invoice generation logic

---

### **Phase 2.4: Notification System**

**Feature**: User Notification Management

#### Tasks:

- **Task 2.4.1**: Review Notification Logic

  - Sub-task: Audit `NotificationService.ts`
  - Sub-task: Review notification triggers
  - Sub-task: Check notification persistence
  - Sub-task: Verify notification dismissal

- **Task 2.4.2**: Implement Notification Features

  - Sub-task: Add real-time notification updates
  - Sub-task: Implement notification categories
  - Sub-task: Add notification preferences
  - Sub-task: Implement notification sound/badge

- **Task 2.4.3**: Balance Alert System
  - Sub-task: Implement zero balance alerts
  - Sub-task: Add low balance warnings (threshold: $5)
  - Sub-task: Implement payment reminder notifications
  - Sub-task: Add successful transaction confirmations

---

### **Phase 2.5: Data Validation & Error Handling**

**Feature**: Input Validation & Error Management

#### Tasks:

- **Task 2.5.1**: Form Validation

  - Sub-task: Add email format validation
  - Sub-task: Implement phone number validation
  - Sub-task: Add amount range validation (top-up: $5-$10,000)
  - Sub-task: Implement API key name validation
  - Sub-task: Add date range validation

- **Task 2.5.2**: Error Handling
  - Sub-task: Implement global error boundary
  - Sub-task: Add network error handling
  - Sub-task: Implement retry logic for failed requests
  - Sub-task: Add user-friendly error messages
  - Sub-task: Implement error logging

---

# **WEEK 3 — API Integration**

### **Phase 3.1: Backend API Setup**

**Feature**: API Service Configuration

#### Tasks:

- **Task 3.1.1**: Setup API Service Layer

  - Sub-task: Create API client configuration
  - Sub-task: Setup base URL and endpoints
  - Sub-task: Configure request/response interceptors
  - Sub-task: Add authentication headers
  - Sub-task: Setup timeout and retry policies

- **Task 3.1.2**: Replace Mock Data Service
  - Sub-task: Identify all mock data in `apiService.ts` (1296 lines)
  - Sub-task: Map mock endpoints to real API endpoints
  - Sub-task: Create API interface types
  - Sub-task: Document API contracts
  - Sub-task: Setup environment variables for API URLs

---

### **Phase 3.2: Authentication API Integration**

**Feature**: Auth Endpoints Integration

#### Tasks:

- **Task 3.2.1**: Implement Login API

  - Sub-task: Connect POST `/api/auth/login` endpoint
  - Sub-task: Handle JWT token storage
  - Sub-task: Implement token refresh logic
  - Sub-task: Add login error handling
  - Sub-task: Test successful/failed login flows

- **Task 3.2.2**: Implement Signup API

  - Sub-task: Connect POST `/api/auth/register` endpoint
  - Sub-task: Handle email verification flow
  - Sub-task: Add signup validation errors
  - Sub-task: Test user creation flow

- **Task 3.2.3**: Implement Logout API
  - Sub-task: Connect POST `/api/auth/logout` endpoint
  - Sub-task: Clear authentication tokens
  - Sub-task: Clear user session data
  - Sub-task: Redirect to landing page

---

### **Phase 3.3: User Portal API Integration**

**Feature**: User Dashboard Endpoints

#### Tasks:

- **Task 3.3.1**: Dashboard Statistics API

  - Sub-task: Connect GET `/api/dashboard/stats` endpoint
  - Sub-task: Implement usage analytics fetching
  - Sub-task: Add real-time stat updates
  - Sub-task: Handle loading and error states

- **Task 3.3.2**: API Key Management APIs

  - Sub-task: Connect GET `/api/keys` (list all keys)
  - Sub-task: Connect POST `/api/keys` (create key)
  - Sub-task: Connect DELETE `/api/keys/:id` (delete key)
  - Sub-task: Connect PATCH `/api/keys/:id/status` (suspend/activate)
  - Sub-task: Test CRUD operations

- **Task 3.3.3**: Request Logs API

  - Sub-task: Connect GET `/api/requests` with pagination
  - Sub-task: Implement filtering by status/endpoint/method
  - Sub-task: Add search query parameter
  - Sub-task: Implement date range filtering
  - Sub-task: Test log fetching and filtering

- **Task 3.3.4**: Wallet & Transaction APIs
  - Sub-task: Connect GET `/api/wallet/balance` (current balance)
  - Sub-task: Connect GET `/api/wallet/transactions` (transaction history)
  - Sub-task: Connect POST `/api/wallet/topup` (initiate top-up)
  - Sub-task: Connect POST `/api/wallet/topup/confirm` (confirm payment)
  - Sub-task: Connect GET `/api/wallet/invoice/:id` (download invoice)
  - Sub-task: Test top-up flow end-to-end

---

### **Phase 3.4: SuperAdmin API Integration**

**Feature**: Admin Management Endpoints

#### Tasks:

- **Task 3.4.1**: User Management APIs

  - Sub-task: Connect GET `/api/admin/users` (list all users)
  - Sub-task: Connect GET `/api/admin/users/:id` (user details)
  - Sub-task: Connect PATCH `/api/admin/users/:id/balance` (adjust balance)
  - Sub-task: Connect PATCH `/api/admin/users/:id/status` (suspend/activate)
  - Sub-task: Connect GET `/api/admin/users/export` (CSV export)
  - Sub-task: Test all admin user operations

- **Task 3.4.2**: Pricing Management APIs

  - Sub-task: Connect GET `/api/admin/pricing/tiers` (all pricing tiers)
  - Sub-task: Connect POST `/api/admin/pricing/tiers` (create tier)
  - Sub-task: Connect PUT `/api/admin/pricing/tiers/:id` (update tier)
  - Sub-task: Connect DELETE `/api/admin/pricing/tiers/:id` (delete tier)
  - Sub-task: Connect GET `/api/admin/pricing/costs` (plan API costs)
  - Sub-task: Connect POST `/api/admin/pricing/costs` (create cost)
  - Sub-task: Connect PUT `/api/admin/pricing/costs/:id` (update cost)
  - Sub-task: Test pricing CRUD operations

- **Task 3.4.3**: Service Endpoints Management
  - Sub-task: Connect GET `/api/admin/endpoints` (all service endpoints)
  - Sub-task: Connect PATCH `/api/admin/endpoints/:id/price` (update pricing)
  - Sub-task: Test endpoint management

---

### **Phase 3.5: Map Service API Integration**

**Feature**: Core Map Services (if applicable)

#### Tasks:

- **Task 3.5.1**: Geocoding API

  - Sub-task: Connect POST `/api/v1/geocoding/search`
  - Sub-task: Connect POST `/api/v1/geocoding/reverse`
  - Sub-task: Implement geocoding request handling
  - Sub-task: Add response data parsing

- **Task 3.5.2**: Routing API

  - Sub-task: Connect POST `/api/v1/routing/directions`
  - Sub-task: Implement route calculation
  - Sub-task: Add distance matrix support
  - Sub-task: Test routing functionality

- **Task 3.5.3**: Places API

  - Sub-task: Connect GET `/api/v1/places/search`
  - Sub-task: Connect GET `/api/v1/places/:id/details`
  - Sub-task: Implement autocomplete
  - Sub-task: Test place search

- **Task 3.5.4**: Maps API
  - Sub-task: Connect GET `/api/v1/maps/tiles/{z}/{x}/{y}`
  - Sub-task: Implement map tile loading
  - Sub-task: Add static map generation
  - Sub-task: Test map rendering

---

### **Phase 3.6: Payment Gateway Integration**

**Feature**: Payment Processing

#### Tasks:

- **Task 3.6.1**: KHQR Payment Integration

  - Sub-task: Generate KHQR code for top-up
  - Sub-task: Implement payment callback handling
  - Sub-task: Add payment status polling
  - Sub-task: Handle payment success/failure
  - Sub-task: Test payment flow

- **Task 3.6.2**: Invoice System
  - Sub-task: Connect invoice generation API
  - Sub-task: Implement PDF invoice download
  - Sub-task: Add invoice email sending
  - Sub-task: Test invoice generation

---

# **WEEK 4 — Testing, Bug Fixing & Final Review**

### **Phase 4.1: Functional Testing**

**Feature**: End-to-End Testing

#### Tasks:

- **Task 4.1.1**: Landing Page Testing

  - Sub-task: Test hero section on all devices
  - Sub-task: Verify pricing calculator accuracy
  - Sub-task: Test all CTA buttons and links
  - Sub-task: Check language switcher (EN/KM)
  - Sub-task: Verify SEO meta tags

- **Task 4.1.2**: Authentication Flow Testing

  - Sub-task: Test login with valid credentials
  - Sub-task: Test login with invalid credentials
  - Sub-task: Test signup new user flow
  - Sub-task: Test duplicate email prevention
  - Sub-task: Test logout functionality
  - Sub-task: Test session persistence

- **Task 4.1.3**: Portal Feature Testing

  - Sub-task: Test dashboard statistics display
  - Sub-task: Test API key creation and deletion
  - Sub-task: Test wallet top-up flow
  - Sub-task: Test transaction history filtering
  - Sub-task: Test request logs and CSV export
  - Sub-task: Test settings and profile update

- **Task 4.1.4**: SuperAdmin Testing
  - Sub-task: Test user management CRUD
  - Sub-task: Test balance adjustment
  - Sub-task: Test user suspension/activation
  - Sub-task: Test pricing management
  - Sub-task: Test data export features

---

### **Phase 4.2: Integration Testing**

**Feature**: API Integration Verification

#### Tasks:

- **Task 4.2.1**: API Connection Testing

  - Sub-task: Verify all API endpoints are reachable
  - Sub-task: Test authentication token flow
  - Sub-task: Test token refresh mechanism
  - Sub-task: Verify error handling for API failures
  - Sub-task: Test rate limiting behavior

- **Task 4.2.2**: Data Consistency Testing

  - Sub-task: Verify data synchronization across components
  - Sub-task: Test real-time updates
  - Sub-task: Check data persistence after refresh
  - Sub-task: Test concurrent user scenarios

- **Task 4.2.3**: Payment Integration Testing
  - Sub-task: Test KHQR code generation
  - Sub-task: Verify payment callback handling
  - Sub-task: Test payment success scenarios
  - Sub-task: Test payment failure scenarios
  - Sub-task: Verify balance updates after payment

---

### **Phase 4.3: Performance Testing**

**Feature**: Application Performance

#### Tasks:

- **Task 4.3.1**: Load Time Optimization

  - Sub-task: Measure First Contentful Paint (target: <1.5s)
  - Sub-task: Measure Time to Interactive (target: <3.5s)
  - Sub-task: Optimize bundle size (target: <500KB gzipped)
  - Sub-task: Implement code splitting where needed
  - Sub-task: Add lazy loading for images

- **Task 4.3.2**: Runtime Performance

  - Sub-task: Profile React component renders
  - Sub-task: Optimize re-render triggers
  - Sub-task: Test with large datasets (1000+ items)
  - Sub-task: Verify virtual scrolling performance
  - Sub-task: Test animation frame rates

- **Task 4.3.3**: Network Performance
  - Sub-task: Implement request caching
  - Sub-task: Add request debouncing for search
  - Sub-task: Optimize API payload sizes
  - Sub-task: Test on slow network (3G simulation)

---

### **Phase 4.4: Cross-Browser & Device Testing**

**Feature**: Compatibility Testing

#### Tasks:

- **Task 4.4.1**: Browser Testing

  - Sub-task: Test on Chrome (latest)
  - Sub-task: Test on Firefox (latest)
  - Sub-task: Test on Safari (latest)
  - Sub-task: Test on Edge (latest)
  - Sub-task: Fix browser-specific issues

- **Task 4.4.2**: Device Testing

  - Sub-task: Test on desktop (1920x1080, 1366x768)
  - Sub-task: Test on tablet (iPad, Android tablet)
  - Sub-task: Test on mobile (iPhone, Android phone)
  - Sub-task: Fix responsive breakpoint issues

- **Task 4.4.3**: Accessibility Testing
  - Sub-task: Run Lighthouse accessibility audit
  - Sub-task: Test keyboard navigation
  - Sub-task: Test with screen reader (NVDA/JAWS)
  - Sub-task: Fix color contrast issues (WCAG AA)
  - Sub-task: Add missing ARIA labels

---

### **Phase 4.5: Bug Fixing**

**Feature**: Issue Resolution

#### Tasks:

- **Task 4.5.1**: Critical Bugs (P0)

  - Sub-task: Fix authentication failures
  - Sub-task: Fix payment processing errors
  - Sub-task: Fix data loss issues
  - Sub-task: Fix security vulnerabilities

- **Task 4.5.2**: High Priority Bugs (P1)

  - Sub-task: Fix UI rendering issues
  - Sub-task: Fix API integration errors
  - Sub-task: Fix form validation failures
  - Sub-task: Fix navigation issues

- **Task 4.5.3**: Medium Priority Bugs (P2)

  - Sub-task: Fix minor UI glitches
  - Sub-task: Fix inconsistent styling
  - Sub-task: Fix tooltip positioning
  - Sub-task: Fix animation delays

- **Task 4.5.4**: Low Priority Bugs (P3)
  - Sub-task: Fix typos and text issues
  - Sub-task: Fix minor accessibility issues
  - Sub-task: Fix console warnings
  - Sub-task: Fix code formatting issues

---

### **Phase 4.6: Final Review & Documentation**

**Feature**: Project Finalization

#### Tasks:

- **Task 4.6.1**: Code Review

  - Sub-task: Review all changed files
  - Sub-task: Check code quality and standards
  - Sub-task: Remove debug code and console.logs
  - Sub-task: Add missing code comments
  - Sub-task: Update TypeScript types

- **Task 4.6.2**: Documentation

  - Sub-task: Update README.md with API integration notes
  - Sub-task: Document environment variables
  - Sub-task: Create API integration guide
  - Sub-task: Document deployment process
  - Sub-task: Create user manual

- **Task 4.6.3**: Security Review

  - Sub-task: Review authentication implementation
  - Sub-task: Check for XSS vulnerabilities
  - Sub-task: Verify CSRF protection
  - Sub-task: Review API key security
  - Sub-task: Check sensitive data handling

- **Task 4.6.4**: Performance Audit

  - Sub-task: Run Lighthouse audit (target: >90)
  - Sub-task: Check bundle analyzer
  - Sub-task: Verify image optimization
  - Sub-task: Check caching strategies
  - Sub-task: Review network waterfall

- **Task 4.6.5**: Pre-Production Checklist
  - Sub-task: Set up production environment variables
  - Sub-task: Configure error tracking (Sentry/LogRocket)
  - Sub-task: Set up analytics (Google Analytics/Mixpanel)
  - Sub-task: Configure CDN for static assets
  - Sub-task: Set up monitoring and alerts

---

## 📋 Summary Checklist

### Week 1 Deliverables

- [ ] All UI issues identified and documented
- [ ] Landing page fully responsive
- [ ] Portal dashboard refined
- [ ] SuperAdmin interface polished
- [ ] Tailwind CSS errors fixed
- [ ] Component cleanup completed

### Week 2 Deliverables

- [ ] Authentication logic implemented
- [ ] Role-based access working
- [ ] State management optimized
- [ ] Business logic validated
- [ ] Notification system functional
- [ ] Error handling comprehensive

### Week 3 Deliverables

- [ ] All API endpoints integrated
- [ ] Mock data replaced with real APIs
- [ ] Authentication flow connected
- [ ] Payment gateway integrated
- [ ] Map services functional
- [ ] Error handling for API failures

### Week 4 Deliverables

- [ ] All features tested end-to-end
- [ ] Cross-browser compatibility verified
- [ ] Performance targets met
- [ ] All bugs fixed
- [ ] Documentation complete
- [ ] Production ready

---

## 🛠️ Technical Debt & Known Issues

### Immediate Fixes Required:

1. **package.json** - Fix package name format
2. **Tailwind CSS** - 172 instances of `border-[transparent]` to fix
3. **Imports cleanup** - Remove unused emoji-prefixed files
4. **API Service** - Replace all mock data (1296 lines in apiService.ts)

### Code Quality Issues:

1. Large file sizes (App.tsx: 1270 lines, LandingPage.tsx: 1668 lines, UserManagement.tsx: 1011 lines)
2. Consider component splitting for better maintainability
3. Add unit tests for business logic
4. Implement E2E tests with Playwright/Cypress

### Performance Optimizations:

1. Implement virtual scrolling for large lists
2. Add request caching layer
3. Optimize bundle size with tree-shaking
4. Implement service worker for offline support

---

## 🔧 Environment Setup Needed

```env
# API Configuration
VITE_API_BASE_URL=https://api.roktenh.io
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000

# Authentication
VITE_AUTH_TOKEN_KEY=roktenh_auth_token
VITE_REFRESH_TOKEN_KEY=roktenh_refresh_token

# Payment Gateway
VITE_KHQR_MERCHANT_ID=your_merchant_id
VITE_KHQR_API_KEY=your_khqr_key

# Map Service
VITE_MAP_API_KEY=your_map_api_key

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=true

# Environment
VITE_ENVIRONMENT=development
```

---

## 📞 Backend API Requirements

### Required Endpoints from Backend Team:

#### Authentication

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`

#### User Portal

- `GET /api/dashboard/stats`
- `GET /api/keys`
- `POST /api/keys`
- `DELETE /api/keys/:id`
- `PATCH /api/keys/:id/status`
- `GET /api/requests`
- `GET /api/wallet/balance`
- `GET /api/wallet/transactions`
- `POST /api/wallet/topup`
- `POST /api/wallet/topup/confirm`

#### SuperAdmin

- `GET /api/admin/users`
- `GET /api/admin/users/:id`
- `PATCH /api/admin/users/:id/balance`
- `PATCH /api/admin/users/:id/status`
- `GET /api/admin/pricing/tiers`
- `POST /api/admin/pricing/tiers`
- `PUT /api/admin/pricing/tiers/:id`
- `DELETE /api/admin/pricing/tiers/:id`

#### Map Services

- `POST /api/v1/geocoding/search`
- `POST /api/v1/geocoding/reverse`
- `POST /api/v1/routing/directions`
- `GET /api/v1/places/search`
- `GET /api/v1/maps/tiles/{z}/{x}/{y}`

---

**Ready to start development! 🚀**
