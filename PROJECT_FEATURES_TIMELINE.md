# RokTenh Map Service - Project Features & Timeline Guide

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Component Architecture](#component-architecture)
- [User Roles & Permissions](#user-roles--permissions)
- [Feature Testing Timeline](#feature-testing-timeline)
- [Known Issues & Improvements](#known-issues--improvements)

---

## 🎯 Project Overview

**RokTenh Map Service** is a comprehensive Map API Service Platform that provides geocoding, routing, places, and map services with a complete management dashboard.

### Tech Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **UI Framework**: Radix UI + Tailwind CSS
- **Styling**: Custom dark theme with Tailwind
- **Charts**: Recharts
- **PDF Generation**: jsPDF + html2canvas
- **Maps**: Leaflet
- **Animations**: Motion (Framer Motion)

### Supported Languages

- English (EN)
- Khmer (KM) - Full localization support

---

## 🚀 Core Features

### 1. Authentication System

**Location**: `src/components/Login.tsx`, `src/components/SignUp.tsx`, `src/components/AuthContext.tsx`

#### Features:

- ✅ Email/Password authentication
- ✅ New user registration
- ✅ Welcome screen for new users
- ✅ Session management with localStorage
- ✅ User roles (Admin/User)
- ✅ Auto-redirect after login/logout

#### Test Checklist:

- [ ] Login with valid credentials
- [ ] Login with invalid credentials (error handling)
- [ ] Sign up new user
- [ ] Duplicate email validation
- [ ] Welcome screen display for new users
- [ ] Session persistence after page refresh
- [ ] Logout functionality

---

### 2. Dashboard (Admin & User)

**Location**: `src/components/AdminDashboard.tsx`

#### Features:

- ✅ Real-time statistics display
- ✅ Usage analytics with charts
- ✅ Date-based filtering (Today, 7 days, 30 days, This month, This year, Custom range)
- ✅ Animated counters for key metrics
- ✅ Revenue tracking
- ✅ Request monitoring
- ✅ Success rate visualization
- ✅ Bar charts for daily usage trends

#### Key Metrics:

1. **Spent Today** - Current day API usage costs
2. **Active API Keys** - Number of active keys
3. **Your Balance** - Current wallet balance
4. **Total Spent** - Lifetime spending

#### Test Checklist:

- [ ] Dashboard loads with correct stats
- [ ] Date filter changes update data
- [ ] Charts render correctly
- [ ] Animated counters work smoothly
- [ ] Mobile responsive layout
- [ ] Custom date range picker functionality

---

### 3. Wallet Management

**Location**: `src/components/WalletManagement.tsx`, `src/components/TopUpDialog.tsx`

#### Features:

- ✅ Real-time balance display
- ✅ Top-up functionality with KHQR integration
- ✅ Transaction history with pagination
- ✅ Transaction filtering (All, Top-up, Usage)
- ✅ Date range filtering for transactions
- ✅ Invoice generation (PDF download)
- ✅ Invoice preview
- ✅ Quick top-up amounts ($5, $10, $50, $100, $500)
- ✅ Custom amount input ($5 - $10,000 range)
- ✅ QR code scanning simulation
- ✅ Payment confirmation flow
- ✅ Low balance alerts
- ✅ Zero balance warnings

#### Transaction Types:

1. **Top-up** - Add funds to wallet
2. **Usage** - API request costs deducted
3. **Refund** - Balance refunds
4. **Adjustment** - Admin balance adjustments

#### Test Checklist:

- [ ] View wallet balance
- [ ] Initiate top-up process
- [ ] Test quick amount buttons
- [ ] Test custom amount input (min/max validation)
- [ ] Complete top-up flow with QR code
- [ ] View transaction history
- [ ] Filter transactions by type
- [ ] Filter transactions by date range
- [ ] Generate invoice PDF
- [ ] Preview invoice
- [ ] Download invoice
- [ ] Pagination works correctly
- [ ] Low balance alert displays
- [ ] Zero balance warning displays

---

### 4. API Key Management

**Location**: `src/components/APIKeyManager.tsx`

#### Features:

- ✅ Create new API keys
- ✅ View all API keys with details
- ✅ Copy API key to clipboard
- ✅ Delete API keys with confirmation
- ✅ Toggle API key status (Active/Suspended)
- ✅ View usage statistics per key
- ✅ Monthly cost tracking
- ✅ Request count monitoring
- ✅ Pagination for large key lists

#### Key Information Displayed:

- Key name and value
- Creation date
- Last used timestamp
- Status (Active/Suspended/Expired)
- Request count
- Monthly limit
- Current month cost
- Total cost

#### Test Checklist:

- [ ] Create new API key
- [ ] View API key details
- [ ] Copy API key to clipboard (success toast)
- [ ] Delete API key (confirmation dialog)
- [ ] Suspend API key
- [ ] Activate suspended key
- [ ] View usage statistics
- [ ] Pagination navigation
- [ ] Mobile responsive layout

---

### 5. Request Logs

**Location**: `src/components/RequestLogs.tsx`

#### Features:

- ✅ Real-time request monitoring
- ✅ Request filtering by status, endpoint, method
- ✅ Search functionality
- ✅ Date range filtering
- ✅ Export logs to CSV
- ✅ Detailed request information
- ✅ Response time tracking
- ✅ Cost per request display
- ✅ Pagination
- ✅ Virtual scrolling for performance

#### Request Details:

- Timestamp
- API Key used
- Endpoint
- HTTP Method
- Status Code
- Response Time (ms)
- IP Address
- User Agent
- Cost

#### Test Checklist:

- [ ] View request logs
- [ ] Filter by status (All/Success/Error)
- [ ] Filter by endpoint
- [ ] Filter by HTTP method
- [ ] Search requests
- [ ] Date range filtering
- [ ] Export to CSV
- [ ] Pagination works
- [ ] Response time color coding
- [ ] Mobile responsive layout

---

### 6. User Management (Admin Only)

**Location**: `src/components/UserManagement.tsx`

#### Features:

- ✅ View all users with detailed info
- ✅ User search functionality
- ✅ Status filtering (All/Active/Suspended)
- ✅ User profile viewing
- ✅ Balance adjustment (Admin only)
- ✅ User suspension/activation
- ✅ User statistics overview
- ✅ API key count per user
- ✅ Export user data to CSV
- ✅ Pagination
- ✅ Mobile-responsive table/card layout

#### User Information:

- Name, Email, Company
- Status (Active/Suspended)
- Balance
- Total spent
- Total requests
- Number of API keys
- Country
- Phone number
- Registration date
- Last login

#### Admin Actions:

1. **View Details** - See complete user profile
2. **Adjust Balance** - Add/deduct funds
3. **Suspend User** - Disable user account
4. **Activate User** - Re-enable suspended account

#### Test Checklist:

- [ ] View all users
- [ ] Search for specific user
- [ ] Filter by status
- [ ] View user details
- [ ] Adjust user balance (add funds)
- [ ] Adjust user balance (deduct funds)
- [ ] Balance validation (sufficient admin wallet)
- [ ] Suspend active user
- [ ] Activate suspended user
- [ ] Export user data to CSV
- [ ] Pagination
- [ ] Mobile card layout
- [ ] Desktop table layout

---

### 7. Pricing Plans

**Location**: `src/components/PricingPlans.tsx`

#### Features:

- ✅ Three pricing tiers (Basic, Pro, Enterprise)
- ✅ Feature comparison
- ✅ Pricing details per service
- ✅ Navigate to wallet for top-up
- ✅ Service categories (Geocoding, Routing, Places, Maps, Elevation)
- ✅ Price per request display
- ✅ Volume discount information

#### Pricing Tiers:

1. **Basic** - Starter features
2. **Pro** - Advanced features
3. **Enterprise** - Full features + priority support

#### Test Checklist:

- [ ] View all pricing plans
- [ ] Compare plan features
- [ ] Navigate to wallet from plan
- [ ] View service pricing details
- [ ] Mobile responsive layout
- [ ] Service category breakdown

---

### 8. Pricing Management (Admin Only)

**Location**: `src/components/PricingManagement.tsx`

#### Features:

- ✅ Create new service pricing
- ✅ Edit existing services
- ✅ Delete services
- ✅ Toggle service visibility
- ✅ Reorder services (up/down)
- ✅ Set custom pricing
- ✅ Category management
- ✅ Icon selection
- ✅ Color customization
- ✅ Description editing

#### Service Fields:

- Name
- Category
- Price per request
- Description
- Icon
- Color
- Visibility (Active/Hidden)
- Display order

#### Test Checklist:

- [ ] Create new service
- [ ] Edit existing service
- [ ] Delete service (confirmation)
- [ ] Toggle visibility
- [ ] Reorder services
- [ ] Icon picker works
- [ ] Color picker works
- [ ] Save changes
- [ ] Cancel editing
- [ ] Input validation

---

### 9. API Documentation

**Location**: `src/components/APIDocumentation.tsx`

#### Features:

- ✅ Comprehensive API endpoint documentation
- ✅ Code examples in multiple languages
- ✅ Interactive code blocks
- ✅ Copy code to clipboard
- ✅ Request/Response examples
- ✅ Authentication guide
- ✅ Error handling documentation
- ✅ Rate limiting information

#### Documented Endpoints:

1. Geocoding (Forward/Reverse)
2. Routing (Directions)
3. Places (Search)
4. Maps (Static/Dynamic)
5. Elevation

#### Test Checklist:

- [ ] View all endpoints
- [ ] Code examples display correctly
- [ ] Copy code to clipboard
- [ ] Request examples are accurate
- [ ] Response examples are clear
- [ ] Navigation between sections
- [ ] Mobile responsive layout

---

### 10. Settings & Profile

**Location**: `src/components/Settings.tsx`, `src/components/SettingsDialog.tsx`

#### Features:

- ✅ Profile photo upload
- ✅ Personal information editing
- ✅ Theme selection (Dark mode)
- ✅ Language selection (EN/KH)
- ✅ Notification preferences
- ✅ Security settings
- ✅ Account settings

#### Settings Categories:

1. **Account Settings** - Name, email, company, phone
2. **Appearance** - Theme, language
3. **Notifications** - Email, push preferences
4. **Security** - Password, 2FA

#### Test Checklist:

- [ ] Upload profile photo
- [ ] Update personal information
- [ ] Change language (EN/KH)
- [ ] Theme toggle
- [ ] Save settings
- [ ] Cancel changes
- [ ] Photo preview
- [ ] Form validation

---

### 11. Notification System

**Location**: `src/services/notificationService.ts`, `src/components/NotificationPanel.tsx`

#### Features:

- ✅ Real-time notifications
- ✅ Notification categories (Success, Error, Warning, Info)
- ✅ Mark as read functionality
- ✅ Clear all notifications
- ✅ Auto-generated notifications for:
  - Welcome (new users)
  - Low balance alerts
  - Zero balance warnings
  - API key created
  - API key deleted
  - API key status changed
  - Balance adjustments
  - Top-up success

#### Test Checklist:

- [ ] Notifications display correctly
- [ ] Mark single notification as read
- [ ] Mark all as read
- [ ] Clear all notifications
- [ ] Low balance notification triggers
- [ ] Zero balance notification triggers
- [ ] Welcome notification for new users
- [ ] Top-up success notification
- [ ] API key notifications
- [ ] Notification persistence

---

### 12. Multi-language Support

**Location**: `src/components/LanguageContext.tsx`, `src/translations/`

#### Features:

- ✅ English (EN) full translation
- ✅ Khmer (KM) full translation
- ✅ Dynamic font switching
- ✅ RTL support consideration
- ✅ Translation for all UI elements
- ✅ Persistent language preference

#### Translated Sections:

- Navigation
- Dashboard
- Wallet
- API Keys
- Settings
- Notifications
- Alerts
- Forms
- Buttons
- Messages

#### Test Checklist:

- [ ] Switch to Khmer language
- [ ] Switch to English language
- [ ] All UI elements translate
- [ ] Font changes correctly
- [ ] Language persists on reload
- [ ] No missing translations
- [ ] Numbers format correctly
- [ ] Dates format correctly

---

## 🏗️ Component Architecture

### Main Components Hierarchy

```
App.tsx
├── ThemeProvider
├── AuthProvider
│   └── LanguageProvider
│       ├── LandingPage (unauthenticated)
│       ├── Login/SignUp (unauthenticated)
│       ├── WelcomeScreen (new users)
│       └── AppContent (authenticated)
│           ├── Header
│           │   ├── Logo
│           │   ├── Language Selector
│           │   ├── Notification Panel
│           │   └── User Menu
│           ├── Sidebar Navigation
│           │   ├── Nav Items
│           │   └── Wallet Widget
│           ├── Main Content
│           │   ├── Dashboard
│           │   ├── User Management (admin)
│           │   ├── Wallet Management
│           │   ├── API Key Manager
│           │   ├── Request Logs
│           │   ├── API Documentation
│           │   ├── Pricing Plans
│           │   ├── Pricing Management (admin)
│           │   └── Settings
│           └── Footer
```

### Reusable UI Components

Located in `src/components/ui/`:

- Accordion, Alert, Avatar, Badge
- Button, Calendar, Card, Checkbox
- Dialog, Dropdown Menu, Input, Label
- Pagination, Popover, Progress, Radio Group
- Select, Separator, Slider, Switch
- Tabs, Textarea, Toast (Sonner), Tooltip

---

## 👥 User Roles & Permissions

### Admin User

**Email**: `admin@roktenh.io`

**Permissions**:

- ✅ Access Dashboard
- ✅ Manage all users
- ✅ Adjust user balances
- ✅ View all API keys
- ✅ Manage pricing
- ✅ View all request logs
- ✅ Access admin wallet
- ✅ Transfer funds to users

**Exclusive Features**:

- User Management page
- Pricing Management page
- Credit Wallet (admin wallet)
- Balance adjustment controls

### Regular User

**Example**: `lowbalance@roktenh.io`, `zerobalance@roktenh.io`

**Permissions**:

- ✅ Access Dashboard
- ✅ Manage own API keys
- ✅ View own wallet
- ✅ Top-up balance
- ✅ View own request logs
- ✅ View pricing plans
- ✅ View API documentation
- ✅ Manage settings

**Restrictions**:

- ❌ Cannot view other users
- ❌ Cannot adjust balances
- ❌ Cannot access pricing management

---

## 📅 Feature Testing Timeline

### Week 1: Core Authentication & Navigation

**Priority**: Critical
**Days**: 1-2

- [ ] Test login functionality
- [ ] Test signup functionality
- [ ] Test session management
- [ ] Test navigation menu
- [ ] Test sidebar collapse/expand
- [ ] Test mobile menu
- [ ] Test language switching
- [ ] Test logout

**Issues to Check**:

- Session persistence
- Redirect logic
- Mobile responsiveness
- Language font switching

---

### Week 2: Wallet & Transactions

**Priority**: Critical
**Days**: 3-5

- [ ] Test wallet balance display
- [ ] Test top-up flow (full cycle)
- [ ] Test transaction history
- [ ] Test transaction filtering
- [ ] Test invoice generation
- [ ] Test invoice download
- [ ] Test pagination
- [ ] Test low/zero balance alerts

**Issues to Check**:

- Balance calculation accuracy
- Transaction status updates
- QR code generation
- PDF rendering quality
- Date filter accuracy

---

### Week 3: API Key Management

**Priority**: High
**Days**: 6-8

- [ ] Test API key creation
- [ ] Test API key deletion
- [ ] Test API key suspension
- [ ] Test copy to clipboard
- [ ] Test usage statistics
- [ ] Test pagination
- [ ] Test search/filter

**Issues to Check**:

- Key generation uniqueness
- Status toggle functionality
- Statistics accuracy
- Mobile layout

---

### Week 4: Dashboard & Analytics

**Priority**: High
**Days**: 9-11

- [ ] Test dashboard metrics
- [ ] Test chart rendering
- [ ] Test date filters
- [ ] Test animated counters
- [ ] Test custom date range
- [ ] Test data refresh

**Issues to Check**:

- Chart responsiveness
- Data accuracy
- Animation performance
- Filter functionality

---

### Week 5: User Management (Admin)

**Priority**: Medium
**Days**: 12-14

- [ ] Test user list display
- [ ] Test user search
- [ ] Test user filtering
- [ ] Test balance adjustment
- [ ] Test user suspension
- [ ] Test user activation
- [ ] Test CSV export
- [ ] Test admin wallet deduction

**Issues to Check**:

- Balance validation
- Admin wallet balance
- User status changes
- Export data accuracy

---

### Week 6: Request Logs & Documentation

**Priority**: Medium
**Days**: 15-17

- [ ] Test request log display
- [ ] Test log filtering
- [ ] Test log search
- [ ] Test CSV export
- [ ] Test API documentation
- [ ] Test code examples
- [ ] Test copy code functionality

**Issues to Check**:

- Log pagination
- Filter combinations
- Export functionality
- Code syntax highlighting

---

### Week 7: Pricing & Settings

**Priority**: Low
**Days**: 18-20

- [ ] Test pricing plans display
- [ ] Test pricing management (admin)
- [ ] Test service creation
- [ ] Test service editing
- [ ] Test service deletion
- [ ] Test settings update
- [ ] Test profile photo upload

**Issues to Check**:

- Form validation
- Image upload limits
- Save functionality
- Cancel behavior

---

### Week 8: Notifications & Alerts

**Priority**: Low
**Days**: 21-22

- [ ] Test notification display
- [ ] Test mark as read
- [ ] Test clear all
- [ ] Test notification triggers
- [ ] Test alert dismissal

**Issues to Check**:

- Notification persistence
- Alert re-appearance logic
- Notification icons
- Timestamp accuracy

---

### Week 9: Cross-browser & Mobile Testing

**Priority**: High
**Days**: 23-25

**Browsers to Test**:

- [ ] Chrome (Desktop)
- [ ] Firefox (Desktop)
- [ ] Safari (Desktop)
- [ ] Edge (Desktop)
- [ ] Chrome (Mobile)
- [ ] Safari (iOS)
- [ ] Samsung Internet

**Screen Sizes**:

- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Mobile Large (414x896)

---

### Week 10: Performance & Optimization

**Priority**: Medium
**Days**: 26-28

- [ ] Test lazy loading
- [ ] Test code splitting
- [ ] Test bundle size
- [ ] Test load times
- [ ] Test memory usage
- [ ] Test animation performance

**Tools**:

- Chrome DevTools Performance
- Lighthouse
- Bundle Analyzer

---

### Week 11: Security & Validation

**Priority**: Critical
**Days**: 29-30

- [ ] Input validation (all forms)
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] API key security
- [ ] Session security

---

## 🐛 Known Issues & Improvements

### Critical Issues

1. **CSS Security Errors** (Suppressed)

   - Browser extension CSS access errors are currently suppressed
   - Monitor for any actual CSS issues

2. **Authentication State**
   - Ensure session persistence works across tabs
   - Test auto-logout on token expiry

### High Priority Improvements

1. **Wallet Integration**

   - Integrate real payment gateway (currently mock)
   - Add support for multiple payment methods
   - Implement webhook for payment confirmation

2. **API Key Security**

   - Implement key rotation
   - Add IP whitelisting
   - Implement rate limiting per key

3. **Performance**
   - Optimize virtual scrolling in logs
   - Add service worker for offline support
   - Implement data caching

### Medium Priority Improvements

1. **User Experience**

   - Add keyboard shortcuts
   - Implement dark/light theme toggle (currently forced dark)
   - Add export to Excel (currently CSV only)

2. **Notifications**

   - Add email notifications
   - Add push notifications
   - Add notification preferences

3. **Analytics**
   - Add more detailed analytics
   - Add export analytics reports
   - Add comparison charts

### Low Priority Improvements

1. **Localization**

   - Add more languages (French, Spanish, Chinese)
   - Add currency support (KHR, EUR, etc.)
   - Add timezone support

2. **Documentation**
   - Add video tutorials
   - Add interactive API playground
   - Add changelog

---

## 🔧 Development Setup

### Prerequisites

- Node.js (v20+)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Runs on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📊 Testing Metrics

### Success Criteria

- [ ] All critical features working
- [ ] No console errors
- [ ] Mobile responsive (all pages)
- [ ] Cross-browser compatible
- [ ] Load time < 3 seconds
- [ ] Lighthouse score > 90
- [ ] All forms validated
- [ ] All user flows complete

### Performance Targets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Speed Index**: < 4.0s
- **Total Bundle Size**: < 500KB (gzipped)

---

## 📝 Additional Notes

### Mock Data

Current implementation uses mock data for:

- Users
- API Keys
- Transactions
- Request Logs
- Usage Statistics

### Real Implementation TODO

- Connect to actual backend API
- Implement real authentication
- Connect payment gateway
- Implement real-time WebSocket updates
- Add database persistence

### Version

**Current Version**: 1.1.9
**Last Updated**: November 30, 2025

---

## 📞 Support & Contact

For issues or questions:

- Create an issue in the repository
- Check the documentation
- Contact the development team

---

**Happy Testing! 🚀**
