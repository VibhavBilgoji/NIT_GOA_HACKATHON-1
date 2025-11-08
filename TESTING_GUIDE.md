# Quick Testing Guide - API Integration

## 🚀 Quick Start

### 1. Start the Development Server
```bash
npm run dev
```
The app should start at `http://localhost:3000`

### 2. Check Database Connection
Look for this message in the terminal:
- ✅ `Using Supabase database` - Great! Connected to Supabase
- ⚠️ `Using in-memory database` - OK for testing, but data won't persist

---

## 🧪 Test Report Page API Integration

### Test Case 1: Submit Issue WITHOUT Photo
1. Navigate to `http://localhost:3000/report`
2. Fill in the form:
   - **Title**: "Test Pothole on Main Street"
   - **Category**: Select "🛣️ Road & Infrastructure"
   - **Description**: Type at least 20 characters
3. Click "Capture Current Location" button
4. Allow location permission when prompted
5. Wait for green success message
6. Click "Submit Report"
7. **Expected**: 
   - Toast: "Submitting report..."
   - Toast: "Issue reported successfully!"
   - Redirect to `/map` page
   - Your issue appears on the map

### Test Case 2: Submit Issue WITH Photo
1. Navigate to `http://localhost:3000/report`
2. Fill in the form as above
3. Click on the photo upload area
4. Select an image (JPG/PNG, max 5MB)
5. **Expected**: Photo preview appears
6. Capture location
7. Click "Submit Report"
8. **Expected**:
   - Toast: "Uploading photo..."
   - Toast: "Photo uploaded successfully!"
   - Toast: "Submitting report..."
   - Toast: "Issue reported successfully!"
   - Redirect to map with your issue

### Test Case 3: Guest User Submission
1. Make sure you're NOT logged in (check navigation bar)
2. Follow Test Case 1 steps
3. **Expected**:
   - Toast: "Reporting as guest - Login for full features"
   - Issue still submits successfully
   - Issue is tagged with guest user ID

### Test Case 4: Form Validation
1. Try submitting with empty title → Error
2. Try description with <20 characters → Error
3. Try submitting without location → Error
4. Try uploading file >5MB → Error
5. **Expected**: Appropriate error messages for each

---

## 🗺️ Test Map Page API Integration

### Test Case 5: View Issues on Map
1. Navigate to `http://localhost:3000/map`
2. **Expected**:
   - Loading indicator appears briefly
   - Map loads with markers
   - Issue list appears on the right
   - Statistics cards show real numbers

### Test Case 6: Interact with Map
1. Click on any marker on the map
2. **Expected**:
   - Popup shows issue title and status
   - Corresponding issue in list gets highlighted
3. Click on an issue in the list
4. **Expected**:
   - Issue card gets highlighted border
   - Map centers on that marker (if implemented)

### Test Case 7: Statistics Accuracy
1. Count the markers on the map
2. Check the "Total Issues" card
3. **Expected**: Numbers match
4. Count red markers (open issues)
5. Check "Open Issues" card
6. **Expected**: Numbers match
7. Repeat for "In Progress" and "Resolved"

### Test Case 8: Empty State
1. If using in-memory DB, restart the server
2. Navigate to `/map` before creating any issues
3. **Expected**:
   - Message: "No issues reported yet. Be the first to report!"
   - Empty statistics (all zeros)
   - No markers on map

---

## 🔄 Test End-to-End Flow

### Complete User Journey
1. Open browser in incognito mode
2. Go to `http://localhost:3000`
3. Click "Report Issue" in navigation
4. Fill form completely with photo
5. Capture location
6. Submit report
7. **Checkpoint 1**: Redirected to map
8. **Checkpoint 2**: Your issue appears on map
9. **Checkpoint 3**: Statistics updated (+1 to total and open)
10. Click your issue marker
11. **Checkpoint 4**: Popup shows your title
12. Click issue in list
13. **Checkpoint 5**: Card highlights

---

## 📱 Mobile Testing

### Test on Mobile Device or Chrome DevTools
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or similar
4. Test report submission:
   - Form should be responsive
   - Location capture works
   - Photo upload from camera works
5. Test map view:
   - Touch gestures work
   - Markers are tappable
   - List scrolls properly

---

## 🐛 Error Scenarios to Test

### Test Case 9: Network Error Simulation
1. Open DevTools → Network tab
2. Set throttling to "Offline"
3. Try submitting an issue
4. **Expected**: Error toast with message
5. Set back to "No throttling"
6. Try again
7. **Expected**: Works normally

### Test Case 10: Invalid Photo Upload
1. Try uploading a .txt or .pdf file
2. **Expected**: Error: "Invalid file type"
3. Try uploading 10MB+ image
4. **Expected**: Error: "File size should not exceed 5MB"

### Test Case 11: Location Denied
1. In browser settings, block location access
2. Try to submit issue
3. Click location capture
4. **Expected**: Error toast about location permission

---

## 🔍 Verify Database Persistence

### If Using Supabase
1. Open your Supabase dashboard
2. Go to Table Editor → `issues` table
3. Submit an issue from the app
4. Refresh the Supabase table
5. **Expected**: New row appears with your data
6. Check fields:
   - `title` matches what you entered
   - `coordinates` has lat/lng
   - `photoUrl` has valid URL (if photo uploaded)
   - `userId` matches your user or starts with "guest-"

### If Using In-Memory DB
1. Check terminal logs
2. After submission, look for: `Database seeded with sample data`
3. Your issue is stored temporarily
4. **Note**: Restarting server clears data

---

## ✅ Success Checklist

After completing all tests, verify:

- [ ] Can submit issue without logging in
- [ ] Can submit issue with photo
- [ ] Photo uploads to cloud storage
- [ ] Issue appears on map immediately
- [ ] Statistics update correctly
- [ ] Map markers are interactive
- [ ] Issue list syncs with map
- [ ] Form validation works
- [ ] Error handling works
- [ ] Mobile responsive
- [ ] Loading states appear
- [ ] Toast notifications show
- [ ] GPS location capture works
- [ ] Data persists in database

---

## 🚨 Common Issues & Solutions

### Issue: "Unauthorized" Error
**Solution**: The API is configured to allow guest users. If you see this, check:
- Network tab for actual error
- Console for detailed logs
- Backend logs for issues

### Issue: Photo Upload Fails
**Solution**: Check environment variables:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxx
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=xxx
```
OR
```
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

### Issue: Map Not Loading
**Solution**:
- Check browser console for errors
- Verify MapTiler SDK is loading
- Check network connection
- Try hard refresh (Ctrl+Shift+R)

### Issue: Location Capture Fails
**Solution**:
- Check browser permissions
- Must use HTTPS in production
- Localhost works without HTTPS

### Issue: No Issues Appear on Map
**Solution**:
- Open browser console
- Check Network tab for `/api/issues` request
- Verify response has data
- Check database has issues

---

## 📊 Expected API Responses

### POST /api/issues (Success)
```json
{
  "success": true,
  "message": "Issue reported successfully",
  "data": {
    "id": "issue-abc123",
    "title": "Test Pothole",
    "status": "open",
    "coordinates": {
      "lat": 15.4909,
      "lng": 73.8278
    }
    // ... other fields
  }
}
```

### GET /api/issues (Success)
```json
{
  "success": true,
  "data": {
    "issues": [
      { /* issue object */ },
      { /* issue object */ }
    ],
    "total": 2,
    "limit": 100,
    "offset": 0
  }
}
```

### POST /api/upload (Success)
```json
{
  "success": true,
  "url": "https://cloudinary.com/xyz.jpg",
  "message": "Successfully uploaded 1 file(s)"
}
```

---

## 🎯 Performance Benchmarks

### Expected Load Times
- Report page load: < 1s
- Photo upload: 2-5s (depends on file size)
- Issue submission: 1-3s
- Map page load: 2-4s (includes map SDK)
- Issues fetch: < 500ms

### Resource Usage
- Bundle size: Should be optimized
- Network requests: Minimal
- Re-renders: Only when necessary

---

## 📝 Report Test Results

After testing, document:
1. ✅ All features working
2. 🐛 Bugs found (if any)
3. 💡 Suggestions for improvement
4. 📸 Screenshots of issues on map
5. 🚀 Performance observations

---

## 🆘 Need Help?

If tests fail:
1. Check browser console for errors
2. Check terminal for backend errors
3. Verify environment variables
4. Review API_INTEGRATION_COMPLETE.md
5. Check network tab for failed requests

---

**Testing Status**: Ready for Testing ✅  
**Last Updated**: 2024  
**Version**: 1.0