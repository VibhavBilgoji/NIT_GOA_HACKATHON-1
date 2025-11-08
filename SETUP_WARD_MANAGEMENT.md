# Ward Management System - Setup Guide

## Overview

This document provides comprehensive setup instructions for the AI-powered Ward Management System integrated with the OurStreet civic issue tracking platform.

## Features Implemented

### 1. Ward Management & Analytics
- **Ward-wise Performance Tracking**: Monitor issues, resolution rates, and performance metrics per ward
- **AI-Powered Insights**: Google Gemini AI integration for intelligent analysis and recommendations
- **Interactive Dashboards**: Beautiful charts and graphs using Recharts
- **Performance Scoring**: Automated scoring based on multiple KPIs
- **Comparative Analysis**: Compare performance across multiple wards

### 2. Impact Reporting
- **Automated Report Generation**: AI-generated impact reports with key achievements
- **Metrics Tracking**: Citizens impacted, cost savings, efficiency improvements
- **Historical Analysis**: Track performance trends over time
- **Export Functionality**: Download reports in JSON format

### 3. Comprehensive Settings
- **Profile Management**: Update personal information and avatar
- **Notification Preferences**: Granular control over all notification types
- **Appearance Settings**: Theme customization (Light/Dark/System)
- **Privacy Controls**: Manage data visibility and sharing preferences
- **Security Features**: Password management and account security
- **System Preferences**: Language, timezone, date format, and more

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Supabase account and project
- Google Gemini API key (for AI features)
- MapTiler API key (for maps)

## Installation Steps

### 1. Install Required Dependencies

```bash
# Install core dependencies
npm install @google/generative-ai
npm install @radix-ui/react-switch
npm install recharts
npm install next-themes

# Or using yarn
yarn add @google/generative-ai @radix-ui/react-switch recharts next-themes
```

### 2. Database Setup

Run the following SQL scripts in your Supabase SQL Editor in order:

1. First, ensure the base schema is set up:
   ```sql
   -- Run: supabase/schema.sql
   ```

2. Then, add ward management extensions:
   ```sql
   -- Run: supabase/ward_management_schema.sql
   ```

### 3. Environment Variables

Create or update your `.env.local` file with the following:

```env
# Existing variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Map Provider
NEXT_PUBLIC_MAPTILER_API_KEY=your_maptiler_key

# AI Integration - NEW
GEMINI_API_KEY=your_google_gemini_api_key
```

### 4. Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key and add it to your `.env.local` file

**Note**: The Gemini API has a generous free tier. The system gracefully falls back to rule-based analysis if the API key is not set.

### 5. Update package.json

Ensure your `package.json` includes these dependencies:

```json
{
  "dependencies": {
    "@google/generative-ai": "^0.2.1",
    "@radix-ui/react-switch": "^1.0.3",
    "recharts": "^2.10.3",
    "next-themes": "^0.2.1",
    // ... other dependencies
  }
}
```

### 6. Run Database Migrations

The ward management schema includes:
- `wards` table - Ward information
- `ward_analytics` table - AI-generated analytics
- `ward_performance_metrics` table - Performance tracking
- `ward_resources` table - Resource management
- `ward_budget` table - Budget tracking
- `impact_reports` table - Impact report storage
- `audit_logs` table - Activity logging
- `settings` table - User preferences

Sample data is automatically inserted for:
- 5 wards (Panjim Central, Fontainhas Heritage, Miramar Coastal, Altinho Hills, Santa Cruz)
- Performance metrics
- Budget allocations

### 7. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application should now be running at http://localhost:3000

## Key Endpoints

### Ward Management
- `GET /api/wards/analytics` - Get ward analytics
- `GET /api/wards/analytics?wardId=<id>` - Get specific ward analytics
- `GET /api/wards/analytics?analyze=true` - Get analytics with AI insights
- `POST /api/wards/analytics` - Generate AI analysis for a ward

### Impact Reports
- `GET /api/impact-report` - Get all impact reports
- `GET /api/impact-report?wardId=<id>` - Get reports for a ward
- `POST /api/impact-report` - Generate new impact report
- `DELETE /api/impact-report?id=<id>` - Delete a report

## Admin Access

To access ward management features:

1. Login as an admin user (default: admin@ourstreet.com / password)
2. Navigate to `/admin/wards` from the admin panel
3. Select a ward to view detailed analytics
4. Click "Generate AI Analysis" for Gemini-powered insights

## Features Usage

### Ward Analytics Dashboard

1. **View Ward Overview**
   - Total issues, resolution rate, avg resolution time
   - Critical issues requiring attention
   - Performance metrics (SLA compliance, citizen satisfaction, etc.)

2. **Generate AI Insights**
   - Click "Generate AI Analysis" button
   - Wait for Gemini AI to analyze ward data
   - Review insights, recommendations, and priority actions
   - View performance score and trend analysis

3. **Explore Analytics Tabs**
   - **Overview**: Category and priority breakdowns (pie & bar charts)
   - **Performance**: Multi-dimensional radar chart
   - **Comparison**: Compare all wards side-by-side
   - **Trends**: Historical trend analysis

4. **Export Reports**
   - Click "Export Report" to download ward analytics as JSON
   - Share with stakeholders or import into other systems

### Impact Reports

1. Navigate to impact reports section
2. Select ward and date range
3. Generate report with AI-powered summary
4. View key achievements, challenges, and recommendations
5. Export for documentation

### Settings Management

Users can customize:
- **Profile**: Personal info, contact details, bio
- **Notifications**: Email, push, issue updates, critical alerts, etc.
- **Appearance**: Light/Dark theme
- **Privacy**: Profile visibility, data sharing preferences
- **Security**: Password changes, account deletion
- **System**: Language, timezone, date format, auto-refresh

## AI Analysis Features

The Gemini AI integration provides:

1. **Performance Analysis**
   - Comprehensive ward performance insights
   - Actionable recommendations based on data
   - Trend direction (improving/declining/stable)
   - Performance scoring (0-100)

2. **Ward Comparison**
   - Rankings across all wards
   - Best practices from top performers
   - Improvement suggestions for underperformers

3. **Impact Reports**
   - Executive summaries
   - Key achievements and challenges
   - Future recommendations
   - Impact scoring

4. **Predictive Analytics**
   - Future issue predictions
   - Resource allocation recommendations
   - Trend forecasting

## Fallback Mechanism

If Gemini API is unavailable or not configured:
- System uses rule-based analysis
- Provides basic insights and recommendations
- Calculates performance scores using formulas
- Ensures system remains functional

## Troubleshooting

### Gemini API Issues
```
Error: "Gemini API error"
Solution: Check GEMINI_API_KEY in .env.local, verify API key is valid
```

### Database Connection Issues
```
Error: "Failed to fetch ward data"
Solution: Verify Supabase credentials, ensure migrations are run
```

### Missing Dependencies
```
Error: "Cannot find module '@google/generative-ai'"
Solution: Run npm install to ensure all dependencies are installed
```

### Chart Display Issues
```
Error: Charts not rendering
Solution: Ensure recharts is installed, check console for errors
```

## Performance Considerations

1. **API Rate Limits**
   - Gemini API has rate limits on free tier
   - System caches analytics for 5 minutes
   - Use analyze=true sparingly

2. **Database Queries**
   - Ward analytics queries are optimized with indexes
   - Use pagination for large datasets
   - Consider caching frequently accessed data

3. **Frontend Performance**
   - Charts are rendered client-side
   - Large datasets may slow rendering
   - Consider data aggregation for better performance

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use different keys for development/production
   - Rotate API keys regularly

2. **Admin Access**
   - Implement proper role-based access control
   - Audit admin actions via audit_logs table
   - Require strong passwords

3. **Data Privacy**
   - Respect user privacy settings
   - Anonymize data where appropriate
   - Comply with data protection regulations

## Next Steps

1. **Customize Ward Data**
   - Update ward boundaries in `ward_management_schema.sql`
   - Add your city's ward information
   - Configure appropriate metrics

2. **Enhance AI Prompts**
   - Edit prompts in `lib/gemini-client.ts`
   - Fine-tune for your specific needs
   - Add domain-specific knowledge

3. **Integration**
   - Connect to external GIS systems
   - Integrate with existing municipal systems
   - Add real-time data feeds

4. **Monitoring**
   - Set up error tracking (Sentry, LogRocket)
   - Monitor API usage and costs
   - Track system performance metrics

## Support

For issues or questions:
1. Check this documentation
2. Review error logs in browser console
3. Check Supabase logs for backend issues
4. Verify all environment variables are set

## License

This system is part of the OurStreet civic engagement platform.

---

**Version**: 1.0.0  
**Last Updated**: 2024-01-15  
**Author**: OurStreet Development Team